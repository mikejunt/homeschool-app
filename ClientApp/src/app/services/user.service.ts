import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { RootState } from '../store';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { Auth0UserProfile } from '../interfaces/auth0user.interface';
import { User } from '../interfaces/user.interface';
import * as Actions from '../store/actions';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user$: Observable<Object>

  constructor(private store: Store<RootState>, private http: HttpClient, private auth: AuthService) { }

  setUserData() {
    this.user$ = this.auth.getUser$()
    this.user$.subscribe((auth: Auth0UserProfile) => {
      console.log("Auth0 User Profile:", auth)
      let userquery = `https://hsappapi.azurewebsites.net/api/users/email/${auth.email}`
      console.log("userquery string is:", userquery)
      this.http.get(userquery).subscribe((data: User[]) => {
        console.log("user by email returns", data)
        if (data.length === 0) {
          console.log("No user profile found: Create new user profile.")
        }
        else {
          console.log("User profile found.  Get other user data, update profile if necessary.")
          let user: User = { ...data[0] }
          this.store.dispatch(Actions.setUserInfo({ user: user }))
        }
      })

    })
  }
}
