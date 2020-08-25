import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FamilyBaseComponent } from '../family-base/family-base.component';
import { FamilyService } from 'src/app/services/family.service';
import { Relation } from 'src/app/interfaces/relation.interface';
import { UserMembership } from 'src/app/interfaces/user-membership.interface';

@Component({
  selector: 'app-family-invite',
  templateUrl: './family-invite.component.html',
  styleUrls: ['./family-invite.component.scss']
})
export class FamilyInviteComponent implements OnInit {
  inviteForm: FormGroup
  invite: Relation

  constructor(public dialogRef: MatDialogRef<FamilyBaseComponent>, @Inject(MAT_DIALOG_DATA) public data: UserMembership,
  private forms: FormBuilder, private family: FamilyService ) {
    
   }

  ngOnInit(): void {
    this.invite = {
      familyId: this.data.familyId,
      confirmed: false
    }
    this.inviteForm = this.forms.group({
      email: ["", [Validators.required, Validators.email]],
      role: ["", [Validators.required]]
    })
  }

  generateInvite() {
    if (this.inviteForm.valid) {
      this.invite.role = this.inviteForm.value.role
      this.family.generateFamilyInvite(this.invite, this.inviteForm.value.email)
      this.dialogRef.close()
    }
  }

  cancelInvite() {
    this.dialogRef.close()
  }

}
