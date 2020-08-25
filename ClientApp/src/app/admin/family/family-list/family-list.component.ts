import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { FamilyMember } from 'src/app/interfaces/family-member.interface';
import { Store } from '@ngrx/store';
import { RootState } from 'src/app/store';
import * as Selectors from '../../../store/selectors'

@Component({
  selector: 'app-family-list',
  templateUrl: './family-list.component.html',
  styleUrls: ['./family-list.component.scss']
})
export class FamilyListComponent implements OnInit {
  @Input() viewuid: number
  @Input() viewfid: number
  familymembers$: Observable<FamilyMember[]>
  familymember: FamilyMember

  constructor(private store: Store<RootState>) {
    this.familymembers$ = this.store.select(Selectors.getFamilyMembers)
  }
  ngOnInit(): void {
    this.familymembers$.subscribe((state: FamilyMember[]) => {
      let filtered = state.filter((member: FamilyMember) => member.id === this.viewuid && member.familyId === this.viewfid)
      this.familymember = filtered[0]
    })
  }

}
