import { Injectable } from '@angular/core';
import createAuth0Client from '@auth0/auth0-spa-js';
import Auth0Client from '@auth0/auth0-spa-js/dist/typings/Auth0Client';
import { from, of, Observable, BehaviorSubject, throwError, iif } from 'rxjs';
import { tap, catchError, concatMap, shareReplay, map, take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { RootState } from '../store';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  auth0Client$: Observable<Auth0Client> = (from(createAuth0Client({
    domain: "msjhsapp.us.auth0.com",
    client_id: "YR09Y6OJRJAnsICDgSiYwXwXybQysfr6",
    redirect_uri: `${window.location.origin}`
  })).pipe(
    shareReplay(1), catchError(err => throwError(err))
  )
  );

  isAuthenticated$: Observable<boolean> = this.auth0Client$.pipe(
    concatMap((client: Auth0Client) => from(client.isAuthenticated())));


  handleRedirectCallback$ = this.auth0Client$.pipe(
    concatMap((client: Auth0Client) => from(client.handleRedirectCallback()))
  );

  private userProfileSubject$ = new BehaviorSubject<any>(null);
  userProfile$ = this.userProfileSubject$.asObservable();

  loggedIn: boolean = null;

  constructor(private router: Router) {
    this.localAuthSetup();
    this.handleAuthCallback();
   }

   getUser$(options?): Observable<any> {
    return this.auth0Client$.pipe(
      concatMap((client: Auth0Client) => from(client.getUser(options))),
      tap(user => { this.userProfileSubject$.next(user) })
    );
  }
  private localAuthSetup() {
    const checkAuth$ = this.isAuthenticated$.pipe(
      concatMap((loggedIn: boolean) => {
        if (loggedIn) {
          return this.getUser$();
        }
        return of(loggedIn);
      })
    );
    checkAuth$.subscribe();
  }
  login(redirectPath: string = '/'): Observable<void> {
    return this.auth0Client$.pipe(
      concatMap((client: Auth0Client) =>
        client.loginWithRedirect({
          redirect_uri: `${window.location.origin}/admin`,
          appState: { target: redirectPath }
        })));
  }
  handleAuthCallback(): Observable<{ loggedIn: boolean, targetUrl: string }> {
    return of(window.location.search).pipe(
      concatMap(params => {
        if (params.includes('error=')) {this.router.navigate(['/unauthorized'])}
        return iif(() => params.includes('code=') && params.includes('state='),
          this.handleRedirectCallback$.pipe(concatMap(cbRes =>
            this.isAuthenticated$.pipe(take(1),

              map(loggedIn => ({
                loggedIn,
                targetUrl: cbRes.appState && cbRes.appState.target ? cbRes.appState.target : '/'
              }))))),
          this.isAuthenticated$.pipe(take(1), map(loggedIn => ({ loggedIn, targetUrl: null }))))
      }));
  }
  logout() {
    this.auth0Client$.subscribe((client: Auth0Client) => {
      client.logout({
        client_id: "YR09Y6OJRJAnsICDgSiYwXwXybQysfr6",
        returnTo: `${window.location.origin}`
      });
    });
  }
}
