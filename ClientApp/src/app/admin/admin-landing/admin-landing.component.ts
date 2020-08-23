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
  usermemberships$: Observable<Array<UserMembership>>
  usermemberships: Array<UserMembership>
  familymembers$: Observable<Array<FamilyMember>>
  familymembers: Array<FamilyMember>
  minorids$: Observable<Array<User>>
  minorids: Array<User>
  minormemberships$: Observable<Array<UserMembership>>
  minormemberships: Array<UserMembership>
  fids$: Observable<number[]>
  fids: number[]


  constructor(private store: Store<RootState>) {
    this.user$ = this.store.select(Selectors.getUserInfo)
    this.usermemberships$ = this.store.select(Selectors.getUserMemberships)
    this.familymembers$ = this.store.select(Selectors.getFamilyMembers)
    this.minorids$ = this.store.select(Selectors.getMinorProfiles)
    this.minormemberships$ = this.store.select(Selectors.getMinorMemberships)
    this.fids$ = this.store.select(Selectors.getFids)
   }

  ngOnInit(): void {
    this.user$.subscribe(userstate => { 
      console.log("Admin Component receives User from state:", userstate);
      this.user = userstate})
    this.usermemberships$.subscribe(usermemberstate => { if (usermemberstate.length > 0) {
      console.log("Admin Component receives User Memberships from state:", usermemberstate);
      this.usermemberships = usermemberstate}})
    this.familymembers$.subscribe(familymemberstate => { if (familymemberstate.length > 0) {
      console.log("Admin Component receives Family Members from state:", familymemberstate);
      this.familymembers = familymemberstate}})
    this.minorids$.subscribe(minoridstate => { if (minoridstate.length > 0) {
      console.log("Admin Component receives Minor Profiles from state:", minoridstate);
      this.minorids = minoridstate}})
    this.minormemberships$.subscribe(minormemberstate => { if (minormemberstate.length > 0) {
      console.log("Admin Component receives Minor Family Memberships from state:", minormemberstate);
      this.minormemberships = minormemberstate}})
    this.fids$.subscribe(fidstate => { if (fidstate.length > 0) {
      console.log("admin component receives fids from state:", fidstate)
      this.fids = fidstate
    }})
  }

}
