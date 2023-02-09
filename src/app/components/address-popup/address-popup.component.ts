import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddProfileComponent, DialogData } from 'src/app/Modules/account/registration/add-profile/add-profile.component';

@Component({
  selector: 'app-address-popup',
  templateUrl: './address-popup.component.html',
  styleUrls: ['./address-popup.component.scss']
})
export class AddressPopupComponent implements OnInit {
  ngOnInit(): void {
    console.log(this.data, "adress");
  }
  constructor(public dialogRef: MatDialogRef<AddProfileComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
