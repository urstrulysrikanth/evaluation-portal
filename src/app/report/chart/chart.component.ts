import { Component } from '@angular/core';
import { ChartType } from 'chart.js';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})

export class ChartComponent {

  barChartData = [
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

  barChartLabels = [
    'January',
    'February',
    'March',
    'April'
  ];

  barChartOptions = {
    responsive: true
  };
  public barChartType: ChartType = 'bar';

}
