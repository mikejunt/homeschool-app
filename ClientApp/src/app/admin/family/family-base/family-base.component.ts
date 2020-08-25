import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { UserMembership } from 'src/app/interfaces/user-membership.interface';
import { FamilyMember } from 'src/app/interfaces/family-member.interface';
import { Store } from '@ngrx/store';
import { RootState } from 'src/app/store';
import * as Selectors from '../../../store/selectors'
import { FamilyEditComponent } from '../family-edit/family-edit.component';
import { FamilyInviteComponent } from '../family-invite/family-invite.component';
import { MatDialog } from '@angular/material/dialog';
import { Family } from 'src/app/interfaces/family.interface';
import { User } from 'src/app/interfaces/user.interface';
import { Relation } from 'src/app/interfaces/relation.interface';

@Component({
  selector: 'app-family-base',
  templateUrl: './family-base.component.html',
  styleUrls: ['./family-base.component.scss']
})
export class FamilyBaseComponent implements OnInit {
  @Input() displayfid: number
  memberships$: Observable<UserMembership[]>
  membership: UserMembership
  familymembers$: Observable<FamilyMember[]>
  familymembers: FamilyMember[]
  user$: Observable<User>
  user: User

  constructor(private store: Store<RootState>, public dialog: MatDialog) {
    this.memberships$ = this.store.select(Selectors.getUserMemberships)
    this.familymembers$ = this.store.select(Selectors.getFamilyMembers)
    this.user$ = this.store.select(Selectors.getUserInfo)
  }

  ngOnInit(): void {
    this.memberships$.subscribe((state: UserMembership[]) => {
      let filtered = [...state.filter((family: UserMembership) => family.familyId === this.displayfid)]
      this.membership = filtered[0]
    })
    this.familymembers$.subscribe((state: FamilyMember[]) => {
      let filtered = [...state.filter((member: FamilyMember) => member.familyId === this.displayfid)]
      this.familymembers = filtered
    })
    this.user$.subscribe((state: User) => [
      this.user = state
    ])
  }

  editFamily(family: UserMembership) {
    if (this.user.id === family.adminId) {
      let targetfamily: Family = {
        adminId: family.adminId,
        id: family.familyId,
        name: family.name,
      }
      this.dialog.open(FamilyEditComponent, { data: targetfamily })
    }
  }

  inviteMember() {
    if (this.membership.role === 1 || this.membership.role === 2) {
      this.dialog.open(FamilyInviteComponent, { data: this.membership })
    }
    else console.log("User does not have permission to send invites.")
  }

}
