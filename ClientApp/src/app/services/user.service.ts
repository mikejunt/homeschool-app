import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { RootState } from '../store';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { Auth0UserProfile } from '../interfaces/auth0user.interface';
import { User } from '../interfaces/user.interface';
import * as Actions from '../store/actions';
import { FamilyService } from './family.service';
import { MinorService } from './minor.service';
import { TasksService } from './tasks.service';
import { UserMembership } from '../interfaces/user-membership.interface';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  user$: Observable<Object>

  constructor(private store: Store<RootState>, private http: HttpClient, private auth: AuthService,
    private family: FamilyService, private minors: MinorService, private tasks: TasksService) { }

  handleAuthenticatedUser() {
    this.user$ = this.auth.getUser$()
    this.user$.subscribe((auth: Auth0UserProfile) => {
      let userquery = `https://hsappapi.azurewebsites.net/api/users/email/${auth.email}`
      this.http.get(userquery).subscribe((data: User[]) => {
        if (data.length === 0) {
          console.log("No user profile found: Creating new user profile.")
          let newuser: User = {
            email: auth.email,
            firstName: auth.given_name,
            lastName: auth.family_name,
            photo: auth.picture,
            minor: false,
            parentEmail: ""
          }
          this.http.post('https://hsappapi.azurewebsites.net/api/users/new', newuser).subscribe((response: User) => {
            this.getUserData(response)
          })
        }
        else {
          let user: User = { ...data[0] }
          this.getUserData(user)
          if (user.firstName != auth.given_name || user.lastName != auth.family_name || user.photo != auth.picture) {
            console.log("Updating user profile due to information mismatch.")
            let fixedprofile = {
              id: user.id,
              email: user.email,
              minor: user.minor,
              parentEmail: user.parentEmail,
              firstName: auth.given_name,
              lastName: auth.family_name,
              photo: auth.picture
            }
            this.http.put(`https://hsappapi.azurewebsites.net/api/users/update/${user.id}`, fixedprofile).subscribe((result: User) => {
              if (result.firstName != fixedprofile.firstName || result.lastName != fixedprofile.lastName || result.photo != fixedprofile.photo) {
                console.log("Profile update failed.")
              }
              else console.log("Updated profile with current Google data.")
            })
          }
        }
      })

    })
  }
  getUserData(user: User) {
    this.store.dispatch(Actions.setUserInfo({ user: user }))
    this.getUserMemberships(user.id)
    this.minors.getUsersMinors(user.email)
    // Tasks retrieval will go here.
  }

  getUserMemberships(id: number) {
    this.http.get(`https://hsappapi.azurewebsites.net/api/family/user/${id}`).subscribe((memberships: UserMembership[]) => {
      let fids: number[] = []
      if (memberships.length > 0) {
        memberships.forEach(obj => fids.push(obj.familyId))
        console.log("FIDs are:", fids)
        console.log("Memberships are:", memberships)
        this.store.dispatch(Actions.setUserMemberships({ membership: memberships }))
        this.store.dispatch(Actions.setFamilyIds({ fids: fids }))
      }
      else console.log("User has no memberships.")
    })
  }
}
