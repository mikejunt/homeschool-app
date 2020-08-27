import { Component, OnInit } from '@angular/core';
import * as Selectors from '../../store/selectors';
import { Store } from '@ngrx/store';
import { RootState } from 'src/app/store';
import { Observable, combineLatest } from 'rxjs';
import { FamilyMember } from 'src/app/interfaces/family-member.interface';
import { map } from 'rxjs/operators';
import { User } from 'src/app/interfaces/user.interface';
import { UserMembership } from 'src/app/interfaces/user-membership.interface';
import { Relation } from 'src/app/interfaces/relation.interface';
import { FamilyService } from 'src/app/services/family.service';
import { UserService } from 'src/app/services/user.service';

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

  constructor(private store: Store<RootState>, private family: FamilyService, private user: UserService) {
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
      })
  }

  modifyMember(role?: number) {
    let accepted: Relation = {
      id: this.viewmember.relationId,
      userId: this.viewmember.id,
      familyId: this.viewmember.familyId,
      role: this.viewmember.role,
      confirmed: true
    }
    if (role) {
      accepted.role = role
    }
    this.family.editMembership(accepted, false)
  }
  
  removeMember() {
    let membership: UserMembership = {
      adminId: this.viewfamily.adminId,
      userId: this.viewmember.id,
      familyId: this.viewmember.familyId,
      relationId: this.viewmember.relationId,
      name: this.viewfamily.name,
      role: this.viewmember.role,
      confirmed: this.viewmember.confirmed
    }
    if (this.viewmember.role != 1) {
      this.family.removeFamilyMember(membership, false)
    }
    else console.log("Admins can't remove themselves.")
  }
}
