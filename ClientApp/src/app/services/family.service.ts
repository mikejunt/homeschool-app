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
import { FamilyAddition } from '../interfaces/family-addition.interface';
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
          this.user.getUserMemberships(this.userprofile.id)
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

  addNewFamilyMember(uid: number, fid: number, role: number) {
    let addition: FamilyAddition = {
      userId: uid,
      familyId: fid,
      role: role,
      confirmed: false
    }
    this.http.post('https://hsappapi.azurewebsites.net/api/relations/new', addition).subscribe((result: FamilyAddition) => {
      if (result.id) {
        this.getFamilyMembers(this.fids)
      }
      else console.log("Didn't save new relationship.")
    })
  }

  editMemberRole(member: FamilyMember) {
    let modified: FamilyAddition = {
      id: member.relationId,
      familyId: member.familyId,
      userId: member.id,
      role: member.relationId,
      confirmed: member.confirmed
    }
    this.http.put(`https://hsappapi.azurewebsites.net/api/relations/edit/${modified.id}`, modified).subscribe((result: FamilyAddition) => {
      if (result.id) {
        this.getFamilyMembers(this.fids)
      }
      else console.log("The change could not be saved.")
    })
  }

  removeFamilyMember(member: FamilyMember, adminid: number) {
    if (adminid === this.userprofile.id) {
      this.http.delete(`https://hsappapi.azurewebsites.net/api/relations/delete/${member.relationId}`).subscribe((result: FamilyAddition) => {
        if (result.id) {
          this.getFamilyMembers(this.fids)
        }
        else console.log("Could not delete the membership.")
      })
    }
  }
}
