import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { RootState } from '../store';
import * as Selectors from '../store/selectors';

@Injectable({
  providedIn: 'root'
})
export class ViewGuard implements CanActivate {
  viewuid$: Observable<number>
  viewuid: number = 0

  constructor(private store: Store<RootState>, private router: Router, private actr: ActivatedRoute) {
    this.viewuid$ = this.store.select(Selectors.getViewedUser)
    this.viewuid$.subscribe((state: number) => this.viewuid = state)
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.viewuid > 0) {
      return true
    }
    else {
      this.router.navigate(['admin'])
      return false
    }
  }
  
}
