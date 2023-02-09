import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatPaginator } from '@angular/material/paginator';
import { map, filter } from 'rxjs/operators';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Constant, MY_FORMATS } from 'src/app/constant/constant';
import { CommonServiceService } from 'src/app/services/commonService/common-service.service';
import { LayoutServiceService } from 'src/app/services/layoutService/layout-service.service';
import { UtcDateFormatService } from 'src/app/services/UTCdateFormator/utc-date-format.service';
import { SelectionModel } from '@angular/cdk/collections';
import { CommonHTTPService } from 'src/app/services/commonHTTP/common-http.service';

export interface PeriodicElement {
  select: false;
  claim_id: number;
  test_name: string;
  claim_amount: string;
  transaction_amount: string;
  transaction_status: string;
  claim_date: string;
}
@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss'],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    { provide: DateAdapter, useClass: UtcDateFormatService, deps: [MAT_DATE_LOCALE] },
  ]
})
export class PaymentsComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  checked = false;
  spinner = true;
  ELEMENT_DATA!: PeriodicElement[];
  limitValue = 2;
  currPageIdx = 0;
  searchFilter = new FormControl();
  queryObj: any = {
    offset: 0,
    limit: 10
  }
  minDate = new Date();
  insuranceList: any;
  date1: any;
  selection = new SelectionModel<PeriodicElement>(true, []);
  initiatePaymentData: any = [];
  date2: any;
  dataSource = new MatTableDataSource<PeriodicElement>();
  displayedColumns: string[] = [
    'select',
    'claim_id',
    'test_name',
    'claim_amount',
    'transaction_amount',
    'transaction_status',
    'claim_date',
  ];
  constructor(private layoutService: LayoutServiceService,private httpService:CommonHTTPService, private commonService: CommonServiceService, private route: Router) { }
  ngOnInit(): void {
    this.getPaymentData();
    this.applyFilter();
    this.checkboxChanged();
  }
  checkboxChanged() {
    this.selection.changed.subscribe(item => {
      if (item.added.length) {
        this.initiatePaymentData.push(item.added[0]);
      } else if (item.removed.length) {
        this.initiatePaymentData.map((payData: any, index: number) => {
          if (payData.claim_id == item.removed[0].claim_id) {
            this.initiatePaymentData.splice(index, 1);
          }
        })
      }
    })
  }
  getPaymentData() {
    this.spinner = true;
    if (!this.date1) {
      delete this.queryObj['claim_start_date']
      delete this.queryObj['claim_end_date']
    }
    if (!this.searchFilter.value) {
      delete this.queryObj['search'];
    }
    this.httpService.getParam(Constant.paymentUrl,this.queryObj).subscribe(
      (res: any) => {
        console.log(res, 'Lab Request Response');
        this.spinner = false;
        this.ELEMENT_DATA = res.body;
        this.ELEMENT_DATA.length = res.count;
        this.dataSource = new MatTableDataSource<any>(this.ELEMENT_DATA);
        this.dataSource.paginator = this.paginator;
      },
      (err) => {
        this.spinner = false;
        localStorage.removeItem('isAuth');
        this.route.navigate(['/log-in'])
        console.log(err, 'err from Lab Request');
      }
    );
  }

  getNextData(currentSize: any, pageIdx: any, pageSize: any) {
    this.spinner = true;
    this.queryObj.offset = pageIdx;
    this.queryObj.limit = pageSize;
    this.httpService.getParam(Constant.paymentUrl,this.queryObj).subscribe(
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
        console.log(err, 'err from Lab Report');
      }
    );
  }

  applyFilter() {
    this.searchFilter.valueChanges
      .pipe(map((value) => { value = value.trim(); return value; }), filter((value) => this.searchFilter.valid), debounceTime(3000), distinctUntilChanged())
      .subscribe((value: any) => {
        this.queryObj.offset = 0
        if (value.length != 0 && this.searchFilter.value) {
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

  statusFilter(event: any) {
    if (event) {
      this.queryObj['status'] = event;
    } else {
      delete this.queryObj['status']
    }
    this.paginator.pageIndex = 0;
    this.getNextData(0, 0, 10);
  }

  clearDate(event: any, id: number) {
    event.stopPropagation();
    if (id == 1) {
      this.date1 = null;
      delete this.queryObj['claim_start_date'];
    } else {
      this.date2 = null;
      delete this.queryObj['claim_end_date']
      this.paginator.pageIndex = 0;
      this.getNextData(0, 0, 10);
    }
  }
  startDate() {
    this.minDate = new Date(this.date1);
    this.date1 = this.commonService.setDate(this.date1);
    if (this.date2 != undefined) {
      this.dateFilter();
    }
  }
  endDate() {
    this.date2 = this.commonService.setDate(this.date2)
    this.dateFilter();
    // console.log(this.stDate, "date", this.enDate > this.stDate);
  }
  dateFilter() {
    this.spinner = true;
    if (this.date1) {
      this.queryObj['claim_start_date'] = this.date1
    } else {
      delete this.queryObj['claim_start_date']
    }
    if (this.date2) {
      this.queryObj['claim_end_date'] = this.date2
    } else {
      delete this.queryObj['claim_end_date']
    }
    if (this.date1 != undefined && this.date2 >= this.date1) {
      this.paginator.pageIndex = 0;
      this.getNextData(0, 0, 10);
    } else {
      this.commonService.registerSnackBar("Invalid date input!", "Close", "red-snackbar")
      this.spinner = false;
    }
  }
  makePayment() {
    console.log(this.initiatePaymentData, "Payment Data");
    this.commonService.setPaymentId(this.initiatePaymentData);
    this.route.navigate(['dashboard/payments/initiate-payment']);
  }

  getPageDetails(event: any) {
    console.log(event, "Shivammmm!");
    if (event.previousPageIndex < event.pageIndex) {
      this.spinner = true;
      let pageIndex = event.pageIndex;
      let pageSize = event.pageSize;
      let previousSize = pageSize * pageIndex;
      this.getNextData(previousSize, ((pageIndex) * 10).toString(), pageSize.toString());
    }
  }
}
