import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { RootState } from 'src/app/store';
import { Observable } from 'rxjs';
import { User } from 'src/app/interfaces/user.interface';
import * as Selectors from '../../store/selectors';
import { MatDialog } from '@angular/material/dialog';
import { ProfileDialogComponent } from './profile-dialog/profile-dialog.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  userprofile$: Observable<User>
  userprofile: User

  constructor(private store: Store<RootState>, public dialog: MatDialog) {
  this.userprofile$ = this.store.select(Selectors.getUserInfo)
   }

  ngOnInit(): void {
    this.userprofile$.subscribe((state:User) => {
      this.userprofile = state
    })
  }

  openMinorWindow() {
    this.dialog.open(ProfileDialogComponent, {data: this.userprofile})
  }

}
