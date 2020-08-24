import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { UserMembership } from 'src/app/interfaces/user-membership.interface';
import { FamilyMember } from 'src/app/interfaces/family-member.interface';
import { Store } from '@ngrx/store';
import { RootState } from 'src/app/store';
import * as Selectors from '../../../store/selectors'

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

  constructor(private store: Store<RootState>) {
    this.memberships$ = this.store.select(Selectors.getUserMemberships)
    this.familymembers$ = this.store.select(Selectors.getFamilyMembers)
   }

  ngOnInit(): void {
    this.memberships$.subscribe((state: UserMembership[]) => {
      let filtered = [...state.filter((family: UserMembership) => family.familyId === this.displayfid)]
      console.log("FID:", this.displayfid, "FamData:", filtered)
      this.membership = filtered[0]
    })
    this.familymembers$.subscribe((state: FamilyMember[]) => {
      let filtered = [...state.filter((member: FamilyMember) => member.familyId === this.displayfid)]
      console.log("FID:", this.displayfid, "Members:", filtered)
      this.familymembers = filtered
    })
  }

}
