import { Injectable, OnInit } from '@angular/core';
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
export class FamilyService implements OnInit {
  fids$: Observable<number[]>

  constructor(private store: Store<RootState>, private http: HttpClient) {
    this.fids$ = this.store.select(Selectors.getFids)
  }

  ngOnInit() {
    this.fids$.subscribe(fids => {
      console.log("service receives Fids:", fids)
      if (fids.length > 0 ) {
      this.getFamilyMembers(fids)
    }})
  }

  getFamilyMembers(fids: number[]) {
    if (fids.length > 0) {
      let querystring = "https://hsappapi.azurewebsites.net/api/users/family?"
      fids.forEach(val => querystring.concat(`fids=${val}&`))
      console.log("full familymember querystring is:", querystring)
      this.http.get(querystring).subscribe((members: FamilyMember[]) => {
        this.store.dispatch(Actions.setFamilyMembers({ familymembers: members }))
      })
    }
    else console.log("No family IDs to retrieve members.")
  }
}
