import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { RootState } from 'src/app/store';
import * as Selectors from '../../store/selectors'
import { Observable } from 'rxjs';
import { User } from 'src/app/interfaces/user.interface';
import { UserMembership } from 'src/app/interfaces/user-membership.interface';
import { FamilyMember } from 'src/app/interfaces/family-member.interface';

@Component({
  selector: 'app-admin-landing',
  templateUrl: './admin-landing.component.html',
  styleUrls: ['./admin-landing.component.scss']
})
export class AdminLandingComponent implements OnInit {
  user$: Observable<User>
  user: User
  minorids$: Observable<Array<User>>
  minorids: Array<User> = []
  fids$: Observable<number[]>
  fids: number[] = []


  constructor(private store: Store<RootState>) {
    this.user$ = this.store.select(Selectors.getUserInfo)
    this.minorids$ = this.store.select(Selectors.getMinorProfiles)
    this.fids$ = this.store.select(Selectors.getFids)
   }

  ngOnInit(): void {
    this.user$.subscribe(userstate => { 
      console.log("Admin Component receives User from state:", userstate);
      this.user = userstate})
    this.minorids$.subscribe(minoridstate => { if (minoridstate.length > 0) {
      console.log("Admin Component receives Minor Profiles from state:", minoridstate);
      this.minorids = minoridstate}})
    this.fids$.subscribe(fidstate => { if (fidstate.length > 0) {
      console.log("admin component receives fids from state:", fidstate)
      this.fids = fidstate
    }})
  }

}
