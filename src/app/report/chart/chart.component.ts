import { Component } from '@angular/core';
import { ChartType } from 'chart.js';
import { S } from 'node_modules_full/memfs/lib/constants';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})

export class ChartComponent {

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
}
