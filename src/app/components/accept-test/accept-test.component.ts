import { SelectionModel } from '@angular/cdk/collections';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Constant } from 'src/app/constant/constant';
import { CommonHTTPService } from 'src/app/services/commonHTTP/common-http.service';
import { LayoutServiceService } from 'src/app/services/layoutService/layout-service.service';
import { InsuranceDetailComponent } from '../insurance-detail/insurance-detail.component';

export interface PeriodicElement {
  test_name: string;
  doctor_notes: string;
  status: number;
}

@Component({
  selector: 'app-accept-test',
  templateUrl: './accept-test.component.html',
  styleUrls: ['./accept-test.component.scss']
})
export class AcceptTestComponent implements OnInit {
  showBalance = true;
  lowBalance = false;
  disabledBtn = true;
  ELEMENT_DATA!: PeriodicElement[];
  dataSource = new MatTableDataSource<PeriodicElement>();
  displayedColumns: string[] = ['select', 'test_name', 'doctor_notes', 'status'];
  claimId!: number;
  selection = new SelectionModel<PeriodicElement>(true, []);
  constructor(public dialog: MatDialog, private layoutService: LayoutServiceService,private httpService:CommonHTTPService, private dialogRef: MatDialogRef<AcceptTestComponent>, @Inject(MAT_DIALOG_DATA) data: any) {
    console.log(data.data.claim_id, "nalnclasjnl");
    this.claimId = data.data.claim_id;
    this.ELEMENT_DATA = data.data.lab_requests;
    this.dataSource = new MatTableDataSource<any>(this.ELEMENT_DATA);
  }

  ngOnInit(): void {
    // this.openDialog();
    this.getBalance();
    this.selection.changed.subscribe(item => {
      this.disabledBtn = this.selection.selected.length == 0;
    })
  }
  getBalance() {
    this.httpService.get(`${Constant.userCurrentBalance}/${this.claimId}`).subscribe(
      (res:any) => {
      if (!res.user_current_balance) {
        this.lowBalance = true;
      }
      this.showBalance = false;
    }, err => {
      console.log(err, "error in balance!");
      this.showBalance = false;
    })
  }
  close() {
    this.dialogRef.close();
  }
  openDialog() {
    this.close();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose= true;
    dialogConfig.autoFocus = true;
    dialogConfig.minWidth = ' 600px';
    dialogConfig.data = {
      data: this.selection.selected,
      id:this.claimId
    }
    const dialogRef = this.dialog.open(InsuranceDetailComponent, dialogConfig);
    dialogRef.afterClosed();
  }
}
