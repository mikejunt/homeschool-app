import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, iif, of } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { concatMap, tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate { 
  initial: boolean = true;

  constructor(private auth: AuthService, private user: UserService) { }

    canActivate(
      next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<boolean | any | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.auth.isAuthenticated$.pipe(
          tap(loggedIn=>{
            if (this.initial && loggedIn) {
              this.user.handleAuthenticatedUser()
              this.initial = false
            }
            if (!loggedIn) {
              this.auth.login(state.url)
            }
          }),
        )}
  }

  
