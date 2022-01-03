import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChartType } from 'chart.js';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})

export class ChartComponent implements OnInit {

  constructor(public router: Router) {

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

  chartOptions = {
    responsive: true
  };


  // changeChartType() {
  //   this.barChartType = this.chartType;
  // }

  ngOnInit(): void {


    // if (this.router && this.router.getCurrentNavigation() && this.router.getCurrentNavigation()) {
    //   let user = this.router.getCurrentNavigation().extras.state.user;
    //   console.log(user);

    // }
  }
}
