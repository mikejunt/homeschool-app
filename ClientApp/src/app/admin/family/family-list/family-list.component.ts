import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { FamilyMember } from 'src/app/interfaces/family-member.interface';
import { Store } from '@ngrx/store';
import { RootState } from 'src/app/store';
import * as Selectors from '../../../store/selectors';
import * as Actions from '../../../store/actions';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/interfaces/user.interface';
import { UserMembership } from 'src/app/interfaces/user-membership.interface';

@Component({
  selector: 'app-family-list',
  templateUrl: './family-list.component.html',
  styleUrls: ['./family-list.component.scss']
})
export class FamilyListComponent implements OnInit {
  @Input() viewuid: number
  @Input() viewfam: UserMembership
  @Input() index: number
  familymembers$: Observable<FamilyMember[]>
  familymember: FamilyMember
  user$: Observable<User>
  user: User

  constructor(private store: Store<RootState>, private router: Router, private actr: ActivatedRoute) {
    this.familymembers$ = this.store.select(Selectors.getFamilyMembers)
    this.user$ = this.store.select(Selectors.getUserInfo)
  }
  ngOnInit(): void {
    this.familymembers$.subscribe((state: FamilyMember[]) => {
      let filtered = state.filter((member: FamilyMember) => {
        return member.id === this.viewuid && member.familyId === this.viewfam.familyId
      })
      this.familymember = filtered[0]
    })
    this.user$.subscribe((state: User) => {
      this.user = state
    })
  }
  navigate() {
    this.store.dispatch(Actions.setViewedUser({ uid: this.viewuid }))
    this.store.dispatch(Actions.setViewedFamily({ fid: this.viewfam.familyId }))
    this.router.navigate(['tasks'], { relativeTo: this.actr })
  }


}
