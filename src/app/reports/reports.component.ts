import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  reportList: any[] = [];
  constructor() { }

  ngOnInit(): void {

    this.reportList.push({ id: 1, reportName: "Profiles received" });
    this.reportList.push({ id: 2, reportName: "Profiles confirmed" });
    this.reportList.push({ id: 3, reportName: "Profiles evaluated by week" });
    this.reportList.push({ id: 4, reportName: "Profiles evaluated by month" });

    this.reportList.push({ id: 5, reportName: "Report 5" });
    this.reportList.push({ id: 6, reportName: "Report 6" });
    this.reportList.push({ id: 7, reportName: "Report 7" });
    this.reportList.push({ id: 8, reportName: "Report 8" });
    this.reportList.push({ id: 9, reportName: "Report 9" });
    this.reportList.push({ id: 10, reportName: "Report 10" });
    this.reportList.push({ id: 11, reportName: "Report 11" });
    this.reportList.push({ id: 12, reportName: "Report 12" });
  }
}