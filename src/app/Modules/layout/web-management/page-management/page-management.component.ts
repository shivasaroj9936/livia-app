import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
export interface PeriodicElement {
  contact_email: string,
  action:any
}

@Component({
  selector: 'app-page-management',
  templateUrl: './page-management.component.html',
  styleUrls: ['./page-management.component.scss']
})

export class PageManagementComponent implements OnInit {
  updateData = false;
  ELEMENT_DATA!: PeriodicElement[];
  dataSource = new MatTableDataSource<PeriodicElement>();
  displayedColumns: string[] = ['contact_email', 'action',];

  constructor() { }

  ngOnInit(): void {  }
}
