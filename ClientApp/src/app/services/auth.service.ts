import { Injectable } from '@angular/core';
import createAuth0Client from '@auth0/auth0-spa-js';
import Auth0Client from '@auth0/auth0-spa-js/dist/typings/Auth0Client';
import { from, of, Observable, BehaviorSubject, throwError, iif, combineLatest } from 'rxjs';
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

  handleAuthCallback() {
    const params = window.location.search;
    if (params.includes('code=') && params.includes('state=')) {
      let targetRoute: string;
      const authComplete$ = this.handleRedirectCallback$.pipe(
        tap(cbRes => {
          targetRoute = cbRes.appState && cbRes.appState.target ? cbRes.appState.target : '/';
        }),
        concatMap(() => {
          return combineLatest([
            this.getUser$(),
            this.isAuthenticated$
          ]);
        })
      );
      authComplete$.subscribe(([user, loggedIn]) => {
        this.router.navigate([targetRoute]);
      });
      return authComplete$
    }
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
