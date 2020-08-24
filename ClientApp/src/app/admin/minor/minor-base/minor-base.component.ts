import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { RootState } from 'src/app/store';
import { Observable } from 'rxjs';
import { User } from 'src/app/interfaces/user.interface';
import * as Selectors from '../../../store/selectors'

@Component({
  selector: 'app-minor-base',
  templateUrl: './minor-base.component.html',
  styleUrls: ['./minor-base.component.scss']
})
export class MinorBaseComponent implements OnInit {
  @Input() viewmid: number
  minorprofiles$: Observable<User[]>
  minor: User

  constructor(private store: Store<RootState>) {
    this.minorprofiles$ = this.store.select(Selectors.getMinorProfiles)
   }

  ngOnInit(): void {
    this.minorprofiles$.subscribe((state: User[]) => {
      let filtered = state.filter((minor: User) => minor.id === this.viewmid)
      console.log("Minor ID:", this.viewmid, "Profile:", filtered[0])
      this.minor = filtered[0]
    })
  }

}
