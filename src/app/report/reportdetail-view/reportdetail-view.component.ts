import { Component } from '@angular/core';
import { SlickDataView, SlickGrid } from '../../modules/angular-slickgrid'; 
import { ReportDetailComponent } from '../report-detail/report-detail.component';

@Component({
  selector: 'app-reportdetail-view',
  templateUrl: './reportdetail-view.component.html',
  styleUrls: ['./reportdetail-view.component.css']
})

export class ReportDetailViewComponent {
  model!: {
    reportName: string;
  };

  // you also have access to the following objects (it must match the exact property names shown below)
  addon: any; // row detail addon instance
  grid!: SlickGrid;
  dataView!: SlickDataView;

  // you can also optionally use the Parent Component reference
  // NOTE that you MUST provide it through the "parent" property in your "rowDetail" grid options
  parent!: ReportDetailComponent;

  constructor() { }

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
}