import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Family } from 'src/app/interfaces/family.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FamilyService } from 'src/app/services/family.service';
import { FamilyBaseComponent } from '../family-base/family-base.component';

@Component({
  selector: 'app-family-edit',
  templateUrl: './family-edit.component.html',
  styleUrls: ['./family-edit.component.scss']
})
export class FamilyEditComponent implements OnInit {
  familyForm: FormGroup
  subFamily: Family

  constructor(public dialogRef: MatDialogRef<FamilyBaseComponent>, @Inject(MAT_DIALOG_DATA) public data: Family,
    private forms: FormBuilder, private family: FamilyService) { }

  ngOnInit(): void {
    this.subFamily = {
      adminId: this.data.adminId,
      id: this.data.id
    }
    this.familyForm = this.forms.group({
      name: ["", [Validators.required, Validators.minLength(4), Validators.maxLength(20)]]
    })
    if (this.data.name.length > 0) {
      this.familyForm.patchValue({
        name: this.data.name
      })
    }
  }

  saveFamily() {
    if (this.familyForm.valid) {
      this.subFamily.name = this.familyForm.value.name
      this.family.editFamilyData(this.subFamily)
      this.closeEdit()
    }
  }

  closeEdit() {
    this.dialogRef.close()
  }

}
