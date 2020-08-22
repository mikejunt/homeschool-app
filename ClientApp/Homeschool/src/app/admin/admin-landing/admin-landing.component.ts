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


  constructor(private store: Store<RootState>) {
    this.user$ = this.store.select(Selectors.getUserInfo)
    this.usermemberships$ = this.store.select(Selectors.getUserMemberships)
    this.familymembers$ = this.store.select(Selectors.getFamilyMembers)
    this.minorids$ = this.store.select(Selectors.getMinorProfiles)
    this.minormemberships$ = this.store.select(Selectors.getMinorMemberships)
   }

  ngOnInit(): void {
    this.user$.subscribe(userstate => {
      console.log("Admin Component receives User from state:", userstate);
      this.user = userstate})
    this.usermemberships$.subscribe(usermemberstate => {
      console.log("Admin Component receives User Memberships from state:", usermemberstate);
      this.usermemberships = usermemberstate})
    this.familymembers$.subscribe(familymemberstate => {
      console.log("Admin Component receives Family Members from state:", familymemberstate);
      this.familymembers = familymemberstate})
    this.minorids$.subscribe(minoridstate => {
      console.log("Admin Component receives Minor Profiles from state:", minoridstate);
      this.minorids = minoridstate})
    this.minormemberships$.subscribe(minormemberstate => {
      console.log("Admin Component receives Minor Family Memberships from state:", minormemberstate);
      this.minormemberships = minormemberstate})
  }

}
