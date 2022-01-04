import { Component, OnInit } from '@angular/core';
import { ReportDetail } from 'src/app/models/report.model';
import { SlickDataView, SlickGrid } from '../../modules/angular-slickgrid';
import { ReportDetailComponent } from '../report-detail/report-detail.component';

import { NavigationExtras, Router } from '@angular/router';


@Component({
  selector: 'app-reportdetail-view',
  templateUrl: './reportdetail-view.component.html',
  styleUrls: ['./reportdetail-view.component.css']
})

export class ReportDetailViewComponent implements OnInit {
  model!: ReportDetail;

  // you also have access to the following objects (it must match the exact property names shown below)
  addon: any; // row detail addon instance
  grid!: SlickGrid;
  dataView!: SlickDataView;
  reportName!: string;
  // you can also optionally use the Parent Component reference
  // NOTE that you MUST provide it through the "parent" property in your "rowDetail" grid options
  parent!: ReportDetailComponent;

  reportTypes !: any[];

  constructor(public router : Router) { }

  ngOnInit(): void {
    this.reportName = this.parent.selectedReportName;
    this.reportTypes = [{ id: 1, name: 'Bar chart' }, { id: 2, name: 'Line chart' }, { id: 3, name: 'Pie chart' }];
  }

  alertAssignee(name: string) {
    if (typeof name === 'string') {
      alert(`Assignee on this task is: ${name.toUpperCase()}`);
    } else {
      alert('No one is assigned to this task.');
    }
  }

  deleteRow(model: any) {
    if (confirm(`Are you sure that you want to delete ${model.reportName}?`)) {
      // you first need to collapse all rows (via the 3rd party addon instance)
      this.addon.collapseAll();

      // then you can delete the item from the dataView
      this.dataView.deleteItem(model.rowId);

      this.parent.showFlashMessage(`Deleted row with ${model.reportName}`, 'danger');
    }
  }

  callParentMethod(model: any) {
    this.parent.showFlashMessage(`We just called Parent Method from the Row Detail Child Component on ${model.reportName}`);
  }

  onViewClick(){
    let reportDetails = { name: this.reportName, from: this.model.from, to: this.model.to }
    let navigationExtras: NavigationExtras = {
      state: {
        reportDetails: reportDetails
      }
    };
    this.router.navigate(['/ep/report-view'], navigationExtras);
  }
}