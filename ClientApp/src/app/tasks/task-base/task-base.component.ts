import { Component, OnInit } from '@angular/core';
import * as Selectors from '../../store/selectors';
import { Store } from '@ngrx/store';
import { RootState } from 'src/app/store';
import { Observable, combineLatest } from 'rxjs';
import { FamilyMember } from 'src/app/interfaces/family-member.interface';
import { map } from 'rxjs/operators';
import { User } from 'src/app/interfaces/user.interface';
import { UserMembership } from 'src/app/interfaces/user-membership.interface';

@Component({
  selector: 'app-task-base',
  templateUrl: './task-base.component.html',
  styleUrls: ['./task-base.component.scss']
})
export class TaskBaseComponent implements OnInit {
  viewfid$: Observable<number>
  viewuid$: Observable<number>
  familymembers$: Observable<FamilyMember[]>
  memberships$: Observable<UserMembership[]>
  userprofile$: Observable<User>
  userprofile: User
  viewfid: number
  viewuid: number
  viewmember: FamilyMember
  viewfamily: UserMembership
  roletext: string[] = ['Parent Administrator', 'Parent', 'Secondary Adult', 'Child']

  constructor(private store: Store<RootState>) {
    this.viewfid$ = this.store.select(Selectors.getViewedFamily)
    this.viewuid$ = this.store.select(Selectors.getViewedUser)
    this.familymembers$ = this.store.select(Selectors.getFamilyMembers)
    this.userprofile$ = this.store.select(Selectors.getUserInfo)
    this.memberships$ = this.store.select(Selectors.getUserMemberships)
  }

  ngOnInit(): void {
    this.userprofile$.subscribe((state: User) => this.userprofile = state)
    combineLatest([this.viewfid$, this.viewuid$, this.familymembers$]).pipe(
      map(([fid, uid, members]) => ({ fid, uid, members }))
    )
      .subscribe(data => {
        this.viewfid = data.fid
        this.viewuid = data.uid;
        let target = data.members.find(obj => { return obj.id === data.uid && obj.familyId === data.fid })
        this.viewmember = { ...target }
      })
    combineLatest([this.viewfid$, this.viewuid$, this.memberships$]).pipe(
      map(([fid, uid, membership]) => ({ fid, uid, membership }))
    )
      .subscribe(data => {
        this.viewfid = data.fid;
        let target = data.membership.find(obj => { return obj.familyId === data.fid })
        this.viewfamily = { ...target }
        console.log(this.viewfamily.adminId, this.userprofile.id)
      })
  }

  acceptInvite() {

  }
  
  removeMember() {

  }
}
