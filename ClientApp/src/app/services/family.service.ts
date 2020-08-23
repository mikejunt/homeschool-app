import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { RootState } from '../store';
import { HttpClient } from '@angular/common/http';
import * as Actions from '../store/actions';
import * as Selectors from '../store/selectors';
import { Observable } from 'rxjs';
import { FamilyMember } from '../interfaces/family-member.interface';

@Injectable({
  providedIn: 'root'
})
export class FamilyService {
  fids$: Observable<number[]>

  constructor(private store: Store<RootState>, private http: HttpClient) {
    this.fids$ = this.store.select(Selectors.getFids)
    this.fids$.subscribe(fids => {
      if (fids.length > 0 ) {
      this.getFamilyMembers(fids)
    }})
  }

  getFamilyMembers(fids: number[]) {
    if (fids.length > 0) {
      let querystring = "https://hsappapi.azurewebsites.net/api/users/family?"
      fids.forEach(val => {querystring = querystring.concat(`fids=${val}&`)})
      this.http.get(querystring).subscribe((members: FamilyMember[]) => {
        this.store.dispatch(Actions.setFamilyMembers({ familymembers: members }))
      })
    }
    else console.log("No family IDs to retrieve members.")
  }
}
