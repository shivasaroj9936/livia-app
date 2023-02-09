import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from 'src/app/Modules/account/registration/add-profile/add-profile.component';
import { HeaderComponent } from 'src/app/Modules/layout/header/header.component';

@Component({
  selector: 'app-logout-popup',
  templateUrl: './logout-popup.component.html',
  styleUrls: ['./logout-popup.component.scss']
})
export class LogoutPopupComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<HeaderComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData) {}
  ngOnInit(): void {  }
  onNoClick(): void {
    this.dialogRef.close(2);
  }
  onOkClick() {
    this.dialogRef.close(1);
  }
}
