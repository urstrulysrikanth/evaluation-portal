import { Component, OnInit } from '@angular/core';
import { Report, ReportFilter } from 'src/app/models/report.model';
import { SlickDataView, SlickGrid } from '../../modules/angular-slickgrid';
import { ReportDetailComponent } from '../report-detail/report-detail.component';

import { NavigationExtras, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
// import * as Excel from 'exceljs/dist/exceljs.min.js';
import * as Excel from "exceljs/dist/exceljs.min.js";
import * as ExcelProper from "exceljs";
// import * as FileSaver from 'file-saver';
import FileSaver, { saveAs } from "file-saver";

@Component({
  selector: 'app-reportdetail-view',
  templateUrl: './reportdetail-view.component.html',
  styleUrls: ['./reportdetail-view.component.css']
})

export class ReportDetailViewComponent implements OnInit {
  model!: ReportFilter;

  // you also have access to the following objects (it must match the exact property names shown below)
  addon: any; // row detail addon instance
  grid!: SlickGrid;
  dataView!: SlickDataView;
  reportName!: string;
  // you can also optionally use the Parent Component reference
  // NOTE that you MUST provide it through the "parent" property in your "rowDetail" grid options
  parent!: ReportDetailComponent;

  reportTypes !: any[];
  showSpinner: boolean = false;

  constructor(public router: Router, public apiService: ApiService) { }

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

  onViewClick() {
    let reportDetails = { name: this.reportName, from: this.model.from, to: this.model.to }
    let navigationExtras: NavigationExtras = {
      state: {
        reportDetails: reportDetails
      }
    };
    this.router.navigate(['/ep/report-view'], navigationExtras);
  }

  downloadExcel() {
    let reportDetails = { name: this.reportName, from: this.model.from, to: this.model.to }
    this.apiService.getReportData(reportDetails).subscribe((data: Report) => {
      debugger;
      const workbook = new Excel.Workbook();
      const worksheet = workbook.addWorksheet(reportDetails.name);

      // worksheet.columns = [
      //     { header: 'Id', key: 'id', width: 10 },
      //     { header: 'Name', key: 'name', width: 32 },
      //     { header: 'D.O.B.', key: 'dob', width: 15 },
      // ];
      worksheet.columns = [];
      worksheet.columns.push({ header: '#', key: 'S.No' });
      data.reportLabels.forEach(col => {
        worksheet.columns.push({ header: col, key: col.toLowerCase() });
      });

      // worksheet.addRow({ id: 1, name: 'John Doe', dob: new Date(1970, 1, 1) });
      // worksheet.addRow({ id: 2, name: 'Jane Doe', dob: new Date(1965, 1, 7) });

      data.reportData.forEach(row => {
        worksheet.addRow([row.label, row.data]);
      });

      workbook.xlsx.writeBuffer()
      .then((buffer:any) => FileSaver.saveAs(new Blob([buffer]), `${Date.now()}_feedback.xlsx`))
      .catch((err: any) => console.log('Error writing excel export', err));

      // const buffer = workbook.xlsx.writeBuffer();
      // const fileExtension = '.xls';
      // debugger;
      // // const blob = new Blob([buffer], { type: fileType });
      // const blob = new Blob([buffer], {
      //   type: "application/vnd.ms-excel;charset=utf-8"
      // });
      // saveAs(blob, reportDetails.name + ' report' + fileExtension);
      // this.showSpinner = false;
    });
  }
}