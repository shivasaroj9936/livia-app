import { Component, OnInit, ViewChild } from "@angular/core";
import { FormControl } from "@angular/forms";
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from "@angular/material/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { map, filter, switchMap } from "rxjs/operators";
import { debounceTime, distinctUntilChanged, min } from "rxjs/operators";
import { CommonServiceService } from "src/app/services/commonService/common-service.service";
import { LayoutServiceService } from "src/app/services/layoutService/layout-service.service";
import { Router } from "@angular/router";
import { Constant, MY_FORMATS } from "src/app/constant/constant";
import { UtcDateFormatService } from "src/app/services/UTCdateFormator/utc-date-format.service";
import { CommonHTTPService } from "src/app/services/commonHTTP/common-http.service";

export interface PeriodicElement {
  claim_id: number;
  test_name: string;
  patient_name: string;
  insurance_company_name: string;
  status: number;
  claim_date: string;
}
@Component({
  selector: "app-image-reports",
  templateUrl: "./image-reports.component.html",
  styleUrls: ["./image-reports.component.scss"],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    {
      provide: DateAdapter,
      useClass: UtcDateFormatService,
      deps: [MAT_DATE_LOCALE],
    },
  ],
})
export class ImageReportsComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  
  spinner = true;
  ELEMENT_DATA!: PeriodicElement[];
  limitValue = 2;
  currPageIdx = 0;
  searchFilter = new FormControl();
  queryObj: any = {
    offset: 0,
    limit: 10,
  };
  minDate = new Date();
  insuranceList: any;
  date1: any;
  date2: any;
  dataSource = new MatTableDataSource<PeriodicElement>();
  displayedColumns: string[] = [
    "claim_id",
    "test_name",
    "patient_name",
    "insurance_company_name",
    "status",
    "claim_date",
  ];

  constructor(
    private httpService: CommonHTTPService,
    private commonService: CommonServiceService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.getLabReportData();
    this.applyFilter();
    this.getInsuranceList();
  }

  getInsuranceList() {
    this.httpService.get(Constant.insuranceListUrl).subscribe(
      (res: any) => {
        this.insuranceList = res.list_of_countries[1].list_of_insurance_company;
      },
      (err) => {
        console.log(err, "Error in insurance list");
      }
    );
  }

  getLabReportData() {
    this.spinner = true;
    if (!this.date1) {
      delete this.queryObj["claim_start_date"];
      delete this.queryObj["claim_end_date"];
    }
    if (!this.searchFilter.value) {
      delete this.queryObj["search"];
    }
    this.httpService.getParam(Constant.labReportUrl, this.queryObj).subscribe(
      (res: any) => {
        console.log(res, "Lab Request Response");
        this.spinner = false;
        this.ELEMENT_DATA = res.body;
        this.ELEMENT_DATA.length = res.count;
        this.dataSource = new MatTableDataSource<any>(this.ELEMENT_DATA);
        this.dataSource.paginator = this.paginator;
      },
      (err) => {
        this.spinner = false;
        localStorage.removeItem("isAuth");
        this.route.navigate(["/log-in"]);
        console.log(err, "err from Lab Request");
      }
    );
  }

  getNextData(currentSize: any, pageIdx: any, pageSize: any) {
    this.spinner = true;
    this.queryObj.offset = pageIdx;
    this.queryObj.limit = pageSize;
    this.httpService.getParam(Constant.labReportUrl, this.queryObj).subscribe(
      (res: any) => {
        this.ELEMENT_DATA.length = currentSize;
        this.ELEMENT_DATA.push(...res.body);
        this.ELEMENT_DATA.length = res.count;
        this.dataSource = new MatTableDataSource<any>(this.ELEMENT_DATA);
        this.dataSource.paginator = this.paginator;
        this.spinner = false;
      },
      (err) => {
        localStorage.removeItem("isAuth");
        this.route.navigate(["/log-in"]);
        this.spinner = false;
        console.log(err, "err from Lab Report");
      }
    );
  }

  statusFilter(event: any) {
    if (event) {
      this.queryObj["status"] = event;
    } else {
      delete this.queryObj["status"];
    }
    this.paginator.pageIndex = 0;
    this.getNextData(0, 0, 10);
  }

  applyFilter() {
    this.searchFilter.valueChanges
      .pipe(
        // debounceTime(1000),
        // distinctUntilChanged(),
        switchMap((value: any) => {
          this.queryObj.offset = 0;
          if (value.length != 0 && this.searchFilter.value) {
            if (isNaN(parseInt(this.searchFilter.value))) {
              this.queryObj["search"] = value;
            } else {
              this.queryObj["search"] = parseInt(value);
            }
          } else {
            delete this.queryObj["search"];
          }
          this.paginator.pageIndex = 0;

          return this.httpService
            .getParam(Constant.labReportUrl, this.queryObj)
            .pipe((res) => {
              return res;
            });
        })
      )
      .subscribe((res:any) => {
        this.ELEMENT_DATA.length = 0;
        this.ELEMENT_DATA.push(...res.body);
        this.ELEMENT_DATA.length = res.count;
        this.dataSource = new MatTableDataSource<any>(this.ELEMENT_DATA);
        this.dataSource.paginator = this.paginator;
        this.spinner = false;
      });
  }
  // applyFilter() {
  //   this.searchFilter.valueChanges
  //     .pipe(
  //       map((value) => {
  //         value = value.trim();
  //         return value;
  //       }),
  //       filter((value) => this.searchFilter.valid),
  //       debounceTime(3000),
  //       distinctUntilChanged()
  //     )
  //     .subscribe((value: any) => {
  //       this.queryObj.offset = 0;
  //       if (value.length != 0 && this.searchFilter.value) {
  //         if (isNaN(parseInt(this.searchFilter.value))) {
  //           this.queryObj["search"] = value;
  //         } else {
  //           this.queryObj["search"] = parseInt(value);
  //         }
  //       } else {
  //         delete this.queryObj["search"];
  //       }
  //       this.paginator.pageIndex = 0;
  //       this.getNextData(0, 0, 10);
  //     });
  // }
  insuranceFilter(event: any) {
    if (event) {
      this.queryObj["insurance_company_id"] = event;
    } else {
      delete this.queryObj["insurance_company_id"];
    }
    this.paginator.pageIndex = 0;
    this.getNextData(0, 0, 10);
  }
  clearDate(event: any, id: number) {
    event.stopPropagation();
    if (id == 1) {
      this.date1 = null;
      delete this.queryObj["claim_start_date"];
    } else {
      this.date2 = null;
      delete this.queryObj["claim_end_date"];
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
    this.date2 = this.commonService.setDate(this.date2);
    this.dateFilter();
    // console.log(this.stDate, "date", this.enDate > this.stDate);
  }
  dateFilter() {
    this.spinner = true;
    if (this.date1) {
      this.queryObj["claim_start_date"] = this.date1;
    } else {
      delete this.queryObj["claim_start_date"];
    }
    if (this.date2) {
      this.queryObj["claim_end_date"] = this.date2;
    } else {
      delete this.queryObj["claim_end_date"];
    }
    if (this.date1 != undefined && this.date2 >= this.date1) {
      this.paginator.pageIndex = 0;
      this.getNextData(0, 0, 10);
    } else {
      this.commonService.registerSnackBar(
        "Invalid date input!",
        "Close",
        "red-snackbar"
      );
      this.spinner = false;
    }
  }

  reportDetail(data: any) {
    console.log(data, "dsaiho");
    this.commonService.setCliamId(data);
    this.route.navigate(["dashboard/image-reports/report-detail"]);
  }

  getPageDetails(event: any) {
    this.spinner = true;
    let pageIndex = event.pageIndex;
    let pageSize = event.pageSize;
    let previousSize = pageSize * pageIndex;
    this.getNextData(
      previousSize,
      (pageIndex * 10).toString(),
      pageSize.toString()
    );
  }
}
