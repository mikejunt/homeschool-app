import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MinorControlComponent } from '../minor-control/minor-control.component';
import { User } from 'src/app/interfaces/user.interface';
import { MinorService } from 'src/app/services/minor.service';

@Component({
  selector: 'app-minor-dialog',
  templateUrl: './minor-dialog.component.html',
  styleUrls: ['./minor-dialog.component.scss']
})
export class MinorDialogComponent implements OnInit {

  constructor(public matDialogRef: MatDialogRef<MinorControlComponent>, @Inject(MAT_DIALOG_DATA) public data: User,
  public minors: MinorService ) { }

  ngOnInit(): void {
  }

  confirmAdult() {
    this.minors.makeUserAdult(this.data)
    this.matDialogRef.close()
  }

  cancelAdult() {
    this.matDialogRef.close()
  }

}
