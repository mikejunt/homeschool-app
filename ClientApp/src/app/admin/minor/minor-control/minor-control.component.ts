import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { RootState } from 'src/app/store';
import { MinorService } from 'src/app/services/minor.service';
import * as Selectors from '../../../store/selectors';
import { Observable, combineLatest } from 'rxjs';
import { User } from 'src/app/interfaces/user.interface';
import { UserMembership } from 'src/app/interfaces/user-membership.interface';
import { map } from 'rxjs/operators';
import * as qclone from 'qclone';
import { Relation } from 'src/app/interfaces/relation.interface';
import { FamilyService } from 'src/app/services/family.service';
import { MatDialog } from '@angular/material/dialog';
import { MinorDialogComponent } from '../minor-dialog/minor-dialog.component';

@Component({
  selector: 'app-minor-control',
  templateUrl: './minor-control.component.html',
  styleUrls: ['./minor-control.component.scss']
})
export class MinorControlComponent implements OnInit {
  viewuid$: Observable<number>
  viewuid: number
  minorprofiles$: Observable<User[]>
  minormemberships$: Observable<UserMembership[]>
  viewminor: User
  viewinvites: UserMembership[]
  viewmemberships: UserMembership[]

  constructor(private store: Store<RootState>, private family: FamilyService, public dialog: MatDialog, ) {
    this.viewuid$ = this.store.select(Selectors.getViewedUser)
    this.minorprofiles$ = this.store.select(Selectors.getMinorProfiles)
    this.minormemberships$ = this.store.select(Selectors.getMinorMemberships)
   }

  ngOnInit(): void {
    combineLatest([this.viewuid$, this.minormemberships$, this.minorprofiles$]).pipe(
      map(([uid, membership, profile]) => ({uid, membership, profile}))
    )
    .subscribe((state) => {
      this.viewuid = state.uid
      if (state.uid > 0) {
        let filteredprofile = state.profile.filter((minor: User) => minor.id === state.uid)[0]
        let filteredmemberships = state.membership.filter((membership: UserMembership) => {
          return membership.userId === state.uid && membership.confirmed
        })
        let filteredinvites = state.membership.filter((membership: UserMembership) => {
          return membership.userId === state.uid && !membership.confirmed
        })
        this.viewminor = qclone.qclone(filteredprofile)
        this.viewinvites = qclone.qclone(filteredinvites)
        this.viewmemberships = qclone.qclone(filteredmemberships)
      }
    })
  }

  revokeMinor() {
    this.dialog.open(MinorDialogComponent, {data: this.viewminor})
  }

  endMembership(membership: UserMembership) {
    this.family.removeFamilyMember(membership, true)
  }

  acceptInvite(invite: UserMembership) {
    let accepted: Relation = {
      id: invite.relationId,
      userId: invite.userId,
      familyId: invite.familyId,
      role: invite.role,
      confirmed: true
    }
    this.family.editMembership(accepted, true)
  }

}
