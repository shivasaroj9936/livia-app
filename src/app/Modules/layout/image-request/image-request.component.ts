import { Component, ViewChild, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CommonServiceService } from 'src/app/services/commonService/common-service.service';
import { LayoutServiceService } from 'src/app/services/layoutService/layout-service.service';
import { debounceTime, distinctUntilChanged } from "rxjs/operators";
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { map, filter } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Constant, MY_FORMATS } from 'src/app/constant/constant';
import { UtcDateFormatService } from 'src/app/services/UTCdateFormator/utc-date-format.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AcceptTestComponent } from 'src/app/components/accept-test/accept-test.component';
import { CommonHTTPService } from 'src/app/services/commonHTTP/common-http.service';

export interface PeriodicElement {
  claim_id: number;
  drName: string;
  beneficiary: string;
  insurance: string;
  imagingTest: number;
  claim_date: string;
  action: string;
}
@Component({
  selector: 'app-image-request',
  templateUrl: './image-request.component.html',
  styleUrls: ['./image-request.component.scss'],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    { provide: DateAdapter, useClass: UtcDateFormatService, deps: [MAT_DATE_LOCALE] },
  ]
})
export class ImageRequestComponent implements OnInit {
  spinner = true;
  searchFilter = new FormControl();
  minDate = new Date();
  maxDate = new Date();
  date1: any;
  date2: any;
  ELEMENT_DATA!: PeriodicElement[];
  dataSource = new MatTableDataSource<PeriodicElement>();
  displayedColumns: string[] = ['claim_id', 'doctor_name', 'beneficiary', 'insurance_company_name', 'total_lab_request', 'claim_date', 'action',];
  queryObj: any = {
    offset: 0,
    limit: 10
  }
  insuranceList: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private layoutService: LayoutServiceService,private httpService:CommonHTTPService, private commonService: CommonServiceService, private route: Router,public dialog: MatDialog) {

  }

  ngOnInit(): void {
    this.getLabRequestData();
    this.applyFilter()
    this.getInsuranceList();
  }
  getInsuranceList() {
    this.httpService.get(Constant.insuranceListUrl).subscribe((res:any) => {
      this.insuranceList = res.list_of_countries[1].list_of_insurance_company;
    }, err => {
      console.log(err, "Error in insurance list");
    })
  }
  getLabRequestData() {
    this.spinner = true;
    if (!this.date1) {
      delete this.queryObj['claim_start_date']
      delete this.queryObj['claim_end_date']
    }
    if (!this.searchFilter.value) {
      delete this.queryObj['search'];
    }
    this.httpService.getParam(Constant.labRequestUrl,this.queryObj).subscribe(
      (res: any) => {
        // console.log(res, 'Lab Request Response');
        this.ELEMENT_DATA = res.body;
        this.ELEMENT_DATA.length = res.count;
        this.dataSource = new MatTableDataSource<any>(this.ELEMENT_DATA);
        this.dataSource.paginator = this.paginator;
        this.spinner = false;
      },
      (err) => {
        localStorage.removeItem('isAuth');
        this.route.navigate(['/log-in'])
        this.spinner = false;
        console.log(err, 'err from Lab Request');
      }
    );
  }

  getNextData(currentSize: any, pageIdx: any, pageSize: any) {
    this.spinner = true;
    this.queryObj.offset = pageIdx;
    this.queryObj.limit = pageSize;
    this.httpService.getParam(Constant.labRequestUrl,this.queryObj).subscribe(
      (res: any) => {
        this.ELEMENT_DATA.length = currentSize;
        this.ELEMENT_DATA.push(...res.body);
        this.ELEMENT_DATA.length = res.count;
        this.dataSource = new MatTableDataSource<any>(this.ELEMENT_DATA);
        this.dataSource.paginator = this.paginator;
        this.spinner = false;
      },
      (err) => {
        localStorage.removeItem('isAuth');
        this.route.navigate(['/log-in'])
        this.spinner = false;
        console.log(err, 'err from Lab Request');
      }
    );
  }

  applyFilter() {
    this.searchFilter.valueChanges
      .pipe(map((value) => { value = value.trim(); return value; }), filter((value) => this.searchFilter.valid), debounceTime(3000), distinctUntilChanged())
      .subscribe((value: any) => {
        this.queryObj.offset = 0
        if (value.length != 0 && this.searchFilter.value) {
          console.log(value.length, "String search");
          if (isNaN(parseInt(this.searchFilter.value))) {
            // console.log(this.searchFilter.value,"String search");
            this.queryObj['search'] = value;
          } else {
            this.queryObj['search'] = parseInt(value);
          }
        } else {
          delete this.queryObj['search'];
        }
        this.paginator.pageIndex = 0;
        this.getNextData(0, 0, 10);
      }
      )
  }
  insuranceFilter(event: any) {
    console.log(event, "mmmmmmmmmmm");
    if (event) {
      this.queryObj['insurance_company_id'] = event;
    } else {
      delete this.queryObj['insurance_company_id']
    }
    this.paginator.pageIndex = 0;
    this.getNextData(0, 0, 10)
  }
  removeData(idx: any) {
    // console.log(idx, 'removeeeeeeeeeeee', this.dataSource.data[idx].claim_id);
    let id = this.dataSource.data[idx].claim_id;
    this.layoutService.deleteLabReq(1).subscribe((res: any) => {
      // console.log(res, 'Delete Lab Request');
      if (res.code == 200) {
        this.commonService.authSnackBar(res.messages, "Close", "success-snackbar")
        this.getNextData(0, 0, 10)
      }
    }, err => {
      console.log(err, "Error in lab Request!", err.error.messages[0]);
      this.commonService.authSnackBar(err.error.messages[0], "Close", "success-snackbar")
    })
  }
  clearDate(event: any, id: number) {
    event.stopPropagation();
    if (id == 1) {
      delete this.queryObj['claim_start_date'];
      this.date1 = null;
      this.dateFilter();
    } else {
      delete this.queryObj['claim_end_date']
      this.date2 = null;
      this.dateFilter();
      // this.getNextData(0, 0, 10)
    }
  }
  startDate() {
    this.minDate = new Date(this.date1);
    this.date1 = this.commonService.setDate(this.date1);
    if (this.date2) {
      this.dateFilter();
    }
  }
  endDate() {
    this.maxDate = new Date(this.date2)
    this.date2 = this.commonService.setDate(this.date2)
    // this.dateFilter();
    if (this.date2 && this.date1) {
      this.dateFilter();
    }
    // console.log(this.stDate, "date", this.enDate > this.stDate);
  }
  dateFilter() {
    // this.spinner = true;
    console.log("hiiiii",this.date1,this.date2);
    if (this.date1) {
      this.queryObj['claim_start_date'] = this.date1
    } else {
      delete this.queryObj['claim_start_date']
    }
    if (this.date2) {
      this.queryObj['claim_end_date'] = this.date2
    } else {
      // delete this.queryObj['claim_start_date']
      delete this.queryObj['claim_end_date']
    }
    // if (this.date1 && this.date2 >= this.date1) {
      this.paginator.pageIndex = 0;
      this.getNextData(0, 0, 10)
    // } else {
      // this.commonService.registerSnackBar("Invalid date input!", "Close", "red-snackbar")
      // this.spinner = false;
    // }
  }
  openDialog(reqData: any) {
    console.log(reqData, "mlmlm");
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose= true;
    dialogConfig.minWidth = ' 600px';
    dialogConfig.data = {
      data:reqData
    }
    const dialogRef = this.dialog.open(AcceptTestComponent,dialogConfig);
    dialogRef.afterClosed();
  }

  getPageDetails(event: any) {
    this.spinner = true;
    let pageIndex = event.pageIndex;
    let pageSize = event.pageSize;
    let previousSize = pageSize * pageIndex;
    this.getNextData(previousSize, ((pageIndex) * 10).toString(), pageSize.toString());
  }
}
