import { Component, OnInit } from '@angular/core';
import * as Selectors from '../../store/selectors';
import { Store } from '@ngrx/store';
import { RootState } from 'src/app/store';
import { Observable, combineLatest } from 'rxjs';
import { FamilyMember } from 'src/app/interfaces/family-member.interface';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-task-base',
  templateUrl: './task-base.component.html',
  styleUrls: ['./task-base.component.scss']
})
export class TaskBaseComponent implements OnInit {
  viewfid$: Observable<number>
  viewuid$: Observable<number>
  familymembers$: Observable<FamilyMember[]>
  viewfid: number
  viewuid: number
  viewmember: FamilyMember

  constructor(private store: Store<RootState>) {
    this.viewfid$ = this.store.select(Selectors.getViewedFamily)
    this.viewuid$ = this.store.select(Selectors.getViewedUser)
    this.familymembers$ = this.store.select(Selectors.getFamilyMembers)
   }

  ngOnInit(): void {
    combineLatest([this.viewfid$, this.viewuid$, this.familymembers$]).pipe(
      map(([fid, uid, members]) => ({fid, uid, members}))
  )
  .subscribe(data => {
      this.viewfid = data.fid
      this.viewuid = data.uid;
      let target = data.members.find(obj => { return obj.id === data.uid && obj.familyId === data.fid })
      this.viewmember = {...target}
  })
  }

}
