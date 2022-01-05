import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Report, ReportFilter } from 'src/app/models/report.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})

export class ChartComponent implements OnInit {

  reportFilter!: ReportFilter;
  showSpinner: boolean = false;
  constructor(public router: Router, public apiService: ApiService) {

  }
  chartType: string = 'bar';
  chartData: any[] = [];
  chartLabels: any[] = [];

  // chartData = [
  //   {
  //     data: [5, 10, 6, 7],
  //     label: 'Selected'
  //   },
  //   {
  //     data: [1, 5, 4, 2],
  //     label: 'Joined'
  //   },
  //   {
  //     data: [3, 6, 1, 1],
  //     label: 'Rejected'
  //   }
  // ];

  // chartLabels = [
  //   'January',
  //   'February',
  //   'March',
  //   'April'
  // ];


  chartOptions = {
    responsive: true
  };

  ngOnInit(): void {
    this.showSpinner = true;
    this.reportFilter = window.history.state.reportDetails;

    this.apiService.getReportData(this.reportFilter).subscribe((data :Report) => {
      this.chartData = data.reportData;
      this.chartLabels = data.reportLabels;
      this.showSpinner = false;
    });
  }
}
