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
          concatMap(_ => this.auth.handleAuthCallback()),
          tap(res=>{
            if (this.initial && res.loggedIn) {
              this.user.setUserData()
              this.initial = false
            }}),
          concatMap(result => iif(() => result.loggedIn, of(true),
           this.auth.login(state.url).pipe(map(_ => false)))));
    }
  }

  
