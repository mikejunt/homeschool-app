import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { RootState } from 'src/app/store';
import { Observable } from 'rxjs';
import { User } from 'src/app/interfaces/user.interface';
import * as Selectors from '../../../store/selectors';
import * as Actions from '../../../store/actions';
import { Router, ActivatedRoute } from '@angular/router';
import { UserMembership } from 'src/app/interfaces/user-membership.interface';

@Component({
  selector: 'app-minor-base',
  templateUrl: './minor-base.component.html',
  styleUrls: ['./minor-base.component.scss']
})
export class MinorBaseComponent implements OnInit {
  @Input() viewmid: number
  minorprofiles$: Observable<User[]>
  minor: User
  minorfamilies$: Observable<UserMembership[]>
  minorinvites: number


  constructor(private store: Store<RootState>, private router: Router, private actr: ActivatedRoute) {
    this.minorprofiles$ = this.store.select(Selectors.getMinorProfiles)
    this.minorfamilies$ = this.store.select(Selectors.getMinorMemberships)
  }

  ngOnInit(): void {
    this.minorprofiles$.subscribe((state: User[]) => {
      let filtered = state.filter((minor: User) => minor.id === this.viewmid)
      this.minor = filtered[0]
    })
    this.minorfamilies$.subscribe((state: UserMembership[]) => {
      let filtered = state.filter((membership: UserMembership) => !membership.confirmed)
      this.minorinvites = filtered.length
    })
  }

  navigate() {
    this.store.dispatch(Actions.setViewedUser({ uid: this.viewmid }))
    this.router.navigate(['minors'], { relativeTo: this.actr })
  }

}
