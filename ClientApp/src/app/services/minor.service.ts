import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { RootState } from '../store';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/user.interface';
import * as Actions from '../store/actions';
import * as Selectors from '../store/selectors';
import { UserMembership } from '../interfaces/user-membership.interface';

@Injectable({
  providedIn: 'root'
})
export class MinorService {

  constructor(private store: Store<RootState>, private http: HttpClient) { }

  getUsersMinors(email: string) {
    this.http.get(`https://hsappapi.azurewebsites.net/api/users/minors/${email}`).subscribe((minors: User[]) => {
    this.store.dispatch(Actions.setMinorInfo({minors: minors}))
    let mids: number[] = []
    minors.forEach(obj => mids.push(obj.id))
    let querystring = "https://hsappapi.azurewebsites.net/api/family/minors?"
    mids.forEach(val => {
      let uidstring = `uids=${val}&`
      querystring = querystring.concat(uidstring)
  })
    this.http.get(querystring).subscribe((memberships: UserMembership[]) => {
      this.store.dispatch(Actions.setMinorMemberships({membership: memberships}))
    })
    })
  }
}
