import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProfileComponent } from '../profile.component';
import { User } from 'src/app/interfaces/user.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MinorService } from 'src/app/services/minor.service';
import { CrossFieldMatcher } from 'src/app/shared/validators/crossfield.matcher';
import { MatchValidator } from 'src/app/shared/validators/email-pass-match.validator';


@Component({
  selector: 'app-profile-dialog',
  templateUrl: './profile-dialog.component.html',
  styleUrls: ['./profile-dialog.component.scss']
})
export class ProfileDialogComponent implements OnInit {
  emailForm: FormGroup
  matcher: CrossFieldMatcher

  constructor(public dialogRef: MatDialogRef<ProfileComponent>, @Inject(MAT_DIALOG_DATA) public data: User,
    private forms: FormBuilder, private minors: MinorService) { }

  ngOnInit(): void {
    this.emailForm = this.forms.group({
      email: ["", [Validators.required, Validators.minLength(10), Validators.maxLength(50), Validators.email]],
      confirm: [""]
    }, { valdiators: MatchValidator })
  }

  toggleMinor() {
    if (this.emailForm.valid) {
      this.minors.makeUserMinor(this.emailForm.value.email)
    }
    else console.log("Form invalid, can't submit.  Button shouldn't work.")
    this.cancelMinor()
  }

  cancelMinor() {
    this.dialogRef.close()
  }

}
