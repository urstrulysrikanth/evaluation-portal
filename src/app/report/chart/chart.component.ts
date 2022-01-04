import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { ChartType } from 'chart.js';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})

export class ChartComponent implements OnInit {

  reportDetails :any;

  constructor(public router: Router, public route : ActivatedRoute) {

  }
  chartType: string = 'bar';

  chartData = [
    {
      data: [330, 600, 260, 700],
      label: 'Selected'
    },
    {
      data: [120, 455, 100, 340],
      label: 'Joined'
    },
    {
      data: [45, 67, 100, 200],
      label: 'Rejected'
    }
  ];

  chartLabels = [
    'January',
    'February',
    'March',
    'April'
  ];

  // chartLabels= [
  //   "January",
  //   "November",
  //   "December",
  //   "October"
  // ];

  // chartData = [
  //   {
  //     "data": [2, 1],
  //     "label": "Vendor"
  //   },
  //   {
  //     "data": [2, 1],
  //     "label": "TCS"
  //   },
  //   {
  //     "data": [1, 2, 2],
  //     "label": "EP"
  //   }
  // ];

  chartOptions = {
    responsive: true
  };
 
  ngOnInit(): void {
    this.reportDetails = window.history.state.reportDetails;
    }
}
