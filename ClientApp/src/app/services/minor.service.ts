import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { RootState } from '../store';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/user.interface';
import * as Actions from '../store/actions';
import * as Selectors from '../store/selectors';
import { UserMembership } from '../interfaces/user-membership.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MinorService {
  userprofile$: Observable<User>
  userprofile: User

  constructor(private store: Store<RootState>, private http: HttpClient) {
    this.userprofile$ = this.store.select(Selectors.getUserInfo)
    this.userprofile$.subscribe((state: User) => {
      this.userprofile = state
    })
  }

  getUsersMinors(email: string) {
    this.http.get(`https://hsappapi.azurewebsites.net/api/users/minors/${email}`).subscribe((minors: User[]) => {
      this.store.dispatch(Actions.setMinorInfo({ minors: minors }))
      let mids: number[] = []
      minors.forEach(obj => mids.push(obj.id))
      let querystring = "https://hsappapi.azurewebsites.net/api/family/minors?"
      mids.forEach(val => {
        let uidstring = `uids=${val}&`
        querystring = querystring.concat(uidstring)
      })
      this.http.get(querystring).subscribe((memberships: UserMembership[]) => {
        this.store.dispatch(Actions.setMinorMemberships({ membership: memberships }))
      })
    })
  }

  makeUserMinor(email: string) {
    let newMinor: User = {
      id: this.userprofile.id,
      email: this.userprofile.email,
      firstName: this.userprofile.firstName,
      lastName: this.userprofile.lastName,
      photo: this.userprofile.photo,
      minor: true,
      parentEmail: email,
    }
    // this could use a failsafe preventing a minor from entering the email of another minor
    this.http.post(`https://hsappapi.azurewebsites.net/api/users/update/${newMinor.id}`, newMinor).subscribe((result: User) => {
      if (result.minor) {
        this.store.dispatch(Actions.setUserInfo({ user: result }))
      }
      else console.log("The changes could not be saved.")
    })
  }

  makeUserAdult(user: User) {
    if (user.parentEmail === this.userprofile.email) {
      let newAdult: User = {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        photo: user.photo,
        minor: false,
        parentEmail: "",
      }
      this.http.post(`https://hsappapi.azurewebsites.net/api/users/update/${newAdult.id}`, newAdult).subscribe((result: User) => {
        if (!result.minor) {
          this.getUsersMinors(this.userprofile.email)
        }
        else console.log("The changes could not be saved.")
      })
    }
  else console.log("User is not the minor's primary adult.")}
}
