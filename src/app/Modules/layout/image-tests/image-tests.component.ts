import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { map,filter } from 'rxjs/operators';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { CommonServiceService } from 'src/app/services/commonService/common-service.service';
import { LayoutServiceService } from 'src/app/services/layoutService/layout-service.service';
import { CommonHTTPService } from 'src/app/services/commonHTTP/common-http.service';
import { Constant } from 'src/app/constant/constant';

export interface PeriodicElement {
  testName: string;
  testFee: number;
  insuranceComp: string;
}

@Component({
  selector: 'app-image-tests',
  templateUrl: './image-tests.component.html',
  styleUrls: ['./image-tests.component.scss']
})
export class ImageTestsComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  spinner = true;
  ELEMENT_DATA!: PeriodicElement[];
  limitValue = 2;
  currPageIdx = 0;
  searchFilter = new FormControl();
  minDate = new Date();
  date1: any;
  date2: any;
  dataSource = new MatTableDataSource<PeriodicElement>();
  queryObj:any = {
    offset:0,
    limit:10
  }
  insuranceList: any;
  displayedColumns: string[] = [
    'name',
    'test_fee',
    'insurance_company_name',
  ];

  constructor(private layoutService: LayoutServiceService,private httpService:CommonHTTPService, private commonService:CommonServiceService,private route:Router) {}
  ngOnInit(): void {
    this.getLabTestData();
    this.applyFilter();
  }

  getLabTestData() {
    this.spinner = true;
    if (!this.date1) {
      delete  this.queryObj['claim_start_date']
      delete  this.queryObj['claim_end_date']
    }
    if (!this.searchFilter.value) {
      delete this.queryObj['search'];
    }
    this.httpService.getParam(Constant.labTestUrl,this.queryObj).subscribe(
      (res:any) => {
        this.spinner = false;
        this.ELEMENT_DATA = res.body;
        this.ELEMENT_DATA.length = res.count;
        this.dataSource =new MatTableDataSource<any>(this.ELEMENT_DATA) ;
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
  
  getNextData(currentSize: any, pageIdx: any,pageSize:any) {
    this.spinner = true;
    this.queryObj.offset = pageIdx;
    this.queryObj.limit = pageSize;
    this.httpService.getParam(Constant.labTestUrl,this.queryObj).subscribe(
      (res:any) => {
        this.ELEMENT_DATA.length = currentSize;
        this.ELEMENT_DATA.push(...res.body);
        this.ELEMENT_DATA.length = res.count;
        this.dataSource =new MatTableDataSource<any>(this.ELEMENT_DATA) ;
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
    .pipe(map((value) => {value = value.trim();return value;}),filter((value) => this.searchFilter.valid),debounceTime(3000), distinctUntilChanged())
    .subscribe((value:any) => {
      this.queryObj.offset=0
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

  getPageDetails(event: any) {
    this.spinner = true;
    let pageIndex = event.pageIndex;
    let pageSize = event.pageSize;
    let previousSize = pageSize * pageIndex;
    this.getNextData(previousSize,((pageIndex)*10).toString(),pageSize.toString());
  }
}
