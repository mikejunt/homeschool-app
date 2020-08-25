import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { RootState } from '../store';
import { HttpClient } from '@angular/common/http';
import * as Actions from '../store/actions';
import * as Selectors from '../store/selectors';
import { Observable, from } from 'rxjs';
import { FamilyMember } from '../interfaces/family-member.interface';
import { Family } from '../interfaces/family.interface'
import { UserService } from './user.service';
import { User } from '../interfaces/user.interface';
import { Relation } from '../interfaces/relation.interface';
import { DBError } from '../interfaces/dberror.interface';

@Injectable({
  providedIn: 'root'
})
export class FamilyService {
  fids$: Observable<number[]>
  fids: number[]
  userprofile$: Observable<User>
  userprofile: User

  constructor(private store: Store<RootState>, private http: HttpClient, private user: UserService) {
    this.fids$ = this.store.select(Selectors.getFids)
    this.userprofile$ = this.store.select(Selectors.getUserInfo)
    this.fids$.subscribe((fids: number[]) => {
      if (fids.length > 0) {
        this.getFamilyMembers(fids)
        this.fids = fids
      }
    })
    this.userprofile$.subscribe((user: User) => {
      this.userprofile = user
    })
  }

  getFamilyMembers(fids: number[]) {
    if (fids.length > 0) {
      let querystring = "https://hsappapi.azurewebsites.net/api/users/family?"
      fids.forEach(val => { querystring = querystring.concat(`fids=${val}&`) })
      this.http.get(querystring).subscribe((members: FamilyMember[]) => {
        this.store.dispatch(Actions.setFamilyMembers({ familymembers: members }))
      })
    }
    else console.log("No family IDs to retrieve members.")
  }

  createNewFamily(family: Family) {
    if (family.adminId && family.name) {
      this.http.post('https://hsappapi.azurewebsites.net/api/family/new', family).subscribe((result: Family) => {
        if (result.id) {
          let invite: Relation = {
            userId: result.adminId,
            familyId: result.id,
            role: 1
          }
          this.addNewFamilyMember(invite)
        }
        else console.log("Error: Family couldn't save.")
      })
    }
    else console.log("Error: Incomplete data to create family.")
  }

  editFamilyData(family: Family) {
    if (family.id && family.adminId && family.name && family.adminId === this.userprofile.id) {
      this.http.put(`https://hsappapi.azurewebsites.net/api/family/edit/${family.id}`, family).subscribe((result: DBError | null) => {
        if (result && result.status === 404) {
          console.log("Family changes didn't save.")
        }
        else this.user.getUserMemberships(this.userprofile.id)
      })
    }
    else console.log("Incomplete data, could not edit family.")
  }
  // deleteFamily(family: Family) {
  //   this function will require a new and complicated endpoint.
  // }

  generateFamilyInvite(invitation: Relation, email: string) {
    console.log("input", invitation)
    let invite: Relation = {
      familyId: invitation.familyId,
      confirmed: invitation.confirmed,
      role: invitation.role
    }
    let userquery: string = `https://hsappapi.azurewebsites.net/api/users/email/${email}`
    this.http.get(userquery).subscribe((response: User[]) => {
      console.log("resposne to email query", response)
      if (response.length === 0) {
        console.log("Invited user not found.  Creating profile.")
        let newuser: User = {
          email: email,
          firstName: email,
          lastName: "",
          photo: "",
          minor: false,
          parentEmail: ""
        }
        this.http.post('https://hsappapi.azurewebsites.net/api/users/new', newuser).subscribe((result: User) => {
          invite.userId = result.id
          console.log("new user invite", invite, result.id)
          this.addNewFamilyMember(invite)
        })
      }
      else if (response.length === 1) {
        invite.userId = response[0].id
        console.log("existing user invite", invite, response[0].id)
        this.addNewFamilyMember(invite)
      }
    })
  }

  addNewFamilyMember(invite: Relation) {
    let addition: Relation = { ...invite }
    // modify this IF later to auto-confirm user adding own minors to family
    if (this.userprofile.id === addition.userId) {
      addition.confirmed = true
    }
    else addition.confirmed = false
    this.http.post('https://hsappapi.azurewebsites.net/api/relations/new', addition).subscribe((result: Relation) => {
      if (result.id) {
        this.getFamilyMembers(this.fids)
        if (this.userprofile.id === result.userId) {
          this.user.getUserMemberships(this.userprofile.id)
        }
      }
      else console.log("Didn't save new relationship.")
    })
  }

  editMemberRole(member: FamilyMember) {
    let modified: Relation = {
      id: member.relationId,
      familyId: member.familyId,
      userId: member.id,
      role: member.relationId,
      confirmed: member.confirmed
    }
    this.http.put(`https://hsappapi.azurewebsites.net/api/relations/edit/${modified.id}`, modified).subscribe((result: Relation) => {
      if (result.id) {
        this.getFamilyMembers(this.fids)
      }
      else console.log("The change could not be saved.")
    })
  }

  removeFamilyMember(member: FamilyMember, adminid: number) {
    if (adminid === this.userprofile.id) {
      this.http.delete(`https://hsappapi.azurewebsites.net/api/relations/delete/${member.relationId}`).subscribe((result: Relation) => {
        if (result.id) {
          this.getFamilyMembers(this.fids)
        }
        else console.log("Could not delete the membership.")
      })
    }
  }
}
