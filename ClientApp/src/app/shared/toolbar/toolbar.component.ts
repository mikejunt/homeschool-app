import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { RootState } from '../../store';
import * as Selectors from '../../store/selectors';
import * as Actions from '../../store/actions';
import { Observable } from 'rxjs';
import { User } from 'src/app/interfaces/user.interface';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  user$: Observable<User>
  user: User

  constructor(private store: Store<RootState>) {
    this.user$ = this.store.select(Selectors.getUserInfo) }

  ngOnInit(): void {
    this.user$.subscribe(userstate => {
      console.log("Toolbar Component gets user from state:", userstate)
      this.user = userstate})
  }

  logOutUser() {
    this.store.dispatch(Actions.clearUser())
  }

}
