import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Family } from 'src/app/interfaces/family.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FamilyService } from 'src/app/services/family.service';
import { AdminLandingComponent } from '../../admin-landing/admin-landing.component';

@Component({
  selector: 'app-family-create',
  templateUrl: './family-create.component.html',
  styleUrls: ['./family-create.component.scss']
})
export class FamilyCreateComponent implements OnInit {
  familyForm: FormGroup
  subFamily: Family

  constructor(public dialogRef: MatDialogRef<AdminLandingComponent>, @Inject(MAT_DIALOG_DATA) public data: Family,
  private forms: FormBuilder, private family: FamilyService) { }

  ngOnInit(): void {
    this.subFamily = {
      adminId: this.data.adminId,
    }
    this.familyForm = this.forms.group({
      name: ["", [Validators.required, Validators.minLength(4), Validators.maxLength(20)]]
    })
  }

  saveFamily() {
    if (this.familyForm.valid) {
      this.subFamily.name = this.familyForm.value.name
      this.family.createNewFamily(this.subFamily)
    }
    this.closeEdit()
  }

  closeEdit() {
    this.dialogRef.close()
  }

}
