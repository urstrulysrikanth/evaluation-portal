import { HttpClient } from '@angular/common/http';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ExcelExportService } from '@slickgrid-universal/excel-export';
import * as Excel from 'exceljs/dist/exceljs.min.js';
import 'jquery/dist/jquery.js';
import 'zone.js/dist/zone';
import { EngagementComponent } from '../engagement/engagement.component';
import { Column, GridOption, Formatters, FileType, ItemMetadata, FieldType, Filters, Editors, Formatter, OnEventArgs }
  from './../modules/angular-slickgrid';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ModalComponent } from '../modal/modal.component';
import { ApiService } from '../services/api.service';
import * as _ from 'lodash';

interface DataItem {
  id: number;
  candidateemailid: string;
}

// create my custom Formatter with the Formatter type
const myCustomCheckmarkFormatter: Formatter<DataItem> = (_row, _cell, value) => {
  return `<i class="fa fa-envelope" aria-hidden="true"></i>`;
};

@Component({
  selector: 'app-import-excel',
  templateUrl: './import-excel.component.html',
  styleUrls: ['./import-excel.component.scss']
})

export class ImportExcelComponent implements OnInit {

  modalRef!: BsModalRef; // {1}
  editorForm!: FormGroup;
  dataRows: any[] = [];
  showGrid: boolean = false;
  columnDefinitions1: Column[] = [];
  gridOptions1!: GridOption;
  dataset1!: any[];
  newApplicantsCount = 0;
  selectedApplicantsCount = 0;
  onHoldApplicantsCount = 0;
  rejectedApplicantsCount = 0;
  engagementComponent!: EngagementComponent;
  modalComponent !: ModalComponent;
  errorMessage: string | undefined;
  //KSK : to refactor
  pre_header_columns: (string | undefined)[] = [undefined, 'Source', 'Source', 'Source', 'Source', 'Source', 'Candidate', 'Candidate', 'Candidate', 'Candidate', 'Candidate', 'Candidate', 'Candidate', 'Candidate', 'Candidate', 'Candidate', 'Candidate', 'Candidate'];
  source_header_columns: (string | undefined)[] = [undefined, 'Name', 'Details', 'Mail Id', 'Date of Receiving', 'Tagged'];
  candidate_header_columns: (string | undefined)[] = ['Name', 'Mail Id', 'Mobile', 'Skill Set', 'Location', 'Experience', 'Availability', 'Status', 'Pending since days', 'Resumes', 'Eligibility xls', 'Joining Date'];
  isValidTemplate: boolean = true;

  excelExportService: ExcelExportService;
  constructor(public http: HttpClient, public router: Router, public apiService: ApiService, private modalService: BsModalService) {
    this.excelExportService = new ExcelExportService();
  }

  ngOnInit(): void {
    // this.editorForm= new FormGroup({
    // 'editor' : new FormControl(null),
    // 'to': new FormControl(null),
    // 'subject' : new FormControl(null)
    // });    
    this.editorForm = new FormGroup({
      'editor': new FormControl({ value: "<b>test</b>" }),
      'to': new FormControl("to"),
      'subject': new FormControl({ value: "subject" })
    });


    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    $("#uploadBtn").trigger('click');
    $("#mailsent").hide();
    this.columnDefinitions1 = [];
    this.gridOptions1 = {
      //gridHeight: 300,
      enableFiltering: true,
      autoHeight: true,
      gridWidth: '100%',
      enableAutoSizeColumns: true,
      enableAutoResize: true,
      forceFitColumns: true,
      enableCellNavigation: true,
      enableSorting: true,
      enablePagination: true,
      createPreHeaderPanel: true,
      showPreHeaderPanel: true,
      preHeaderPanelHeight: 28,
      editable: false,
      enableAutoTooltip: true,
      autoTooltipOptions: {
          enableForCells: true,
          enableForHeaderCells: false,
          maxToolTipLength: 1000
      },
      // explicitInitialization: true,
      //  colspanCallback: this.renderDifferentColspan,
      enableExcelExport: true,
      excelExportOptions: {
        exportWithFormatter: false
      },
      registerExternalResources: [new ExcelExportService()]

    };

  }

  async readExcel(event: any) {

    if (confirm("Are you sure want to upload new data? If yes click 'OK' to proceed")) {

      this.apiService.candidateData = [];
      var excelData: any[] = [];
      const workbook = new Excel.Workbook();

      const target: DataTransfer = <DataTransfer>(event.target);
      if (target.files.length !== 1) {
        throw new Error('Cannot use multiple files');
      }

      const arryBuffer = new Response(target.files[0]).arrayBuffer();

      await workbook.xlsx.load(arryBuffer);
      const worksheet = workbook.getWorksheet(1);

      worksheet.eachRow(function (row: any, rowNumber: any) {
        excelData.push(row.values);
      });
      this.dataRows = excelData;
      this.setColumnDefinitions();
      //this.includeEngagementInRows();
      //this.includeEnvelopeInRows();

      if (this.isValidTemplate) {
        this.setGridData();
        this.apiService.candidateData = this.dataset1;
        this.showGrid = true;
      }
      //this.sendEmail();
    }
  }

  includeEngagementInRows() {
    this.columnDefinitions1.push(
      {
        id: 'engagement', name: 'Engagement', field: 'engagement',
        // formatter: myCustomCheckmarkFormatter, 
        type: FieldType.string, sortable: true, minWidth: 200,
        'editor': {
          placeholder: 'choose option',
          collection: this.apiService.getEngagementsTestData().filter(x => x.validtill >= new Date()).map(e => ({
            value: e.skillSet + '-' + e.experience + ' years experienced' + '-' + e.numberOfPositions + (e.numberOfPositions > 1 ? ' positions' : ' position'),
            label: e.skillSet + '-' + e.experience + ' years experienced' + '-' + e.numberOfPositions + (e.numberOfPositions > 1 ? ' positions' : ' position')
          })).sort(),
          collectionSortBy: {
            property: 'label',
            sortDesc: true
          },
          customStructure: {
            label: 'label',
            value: 'value'
          },
          collectionOptions: {
            separatorBetweenTextLabels: ' '
          },
          model: Editors.singleSelect,
          required: true
        }

      });
  }

  includeEnvelopeInRows() {

    this.columnDefinitions1.push(
      {
        id: 'email', name: 'Email', field: 'sendEmail',
        formatter: myCustomCheckmarkFormatter,
        type: FieldType.number, sortable: true, minWidth: 100,
        onCellClick: (e: Event, args: OnEventArgs) => {
          // let user ={
          //     email : args.dataContext.candidateemailid,
          //     name : args.dataContext.candidatename,

          // }
          let emailTo = [args.dataContext.candidateemailid, args.dataContext.evaluationemailid];
          // this.sendEmail(user);
          this.openModal(emailTo);
        }
      });
  }

  exportToExcel() {
    this.excelExportService.exportToExcel({ filename: 'export', format: FileType.xlsx });
  }

  setColumnDefinitions() {
    this.columnDefinitions1 = [];
    let headerColumns = this.dataRows.splice(0, 2);
    if (headerColumns && headerColumns.length == 2 && headerColumns[0].length == headerColumns[1].length) {

      if (!_.isEqual(headerColumns[0], this.pre_header_columns)) {
        this.showGrid = false;
        this.isValidTemplate = false;
        this.errorMessage = "Invalid template received. Pre-header should either contain Source or Candidate as column.";
        return;
      }
      if (!_.isEqual(headerColumns[1], this.source_header_columns.concat(this.candidate_header_columns))) {
        this.showGrid = false;
        this.isValidTemplate = false;
        this.errorMessage = "Invalid template received. Header should contain following columns in sequence.";
        this.errorMessage += "\n Under Source : " + this.source_header_columns.toString();
        this.errorMessage += "\n Under Candidate : " + this.candidate_header_columns.toString();
        return;
      }



      for (let i = 0; i < headerColumns[0].length; i++) {
        let headerMainColumn = headerColumns[1][i];
        if (headerMainColumn) {
          let headerMainColumnLowerCase = headerMainColumn.toLowerCase();
          let columnObj: any = {
            id: headerColumns[0][i].toLowerCase() + headerMainColumnLowerCase.replace('%', '').replace(/\s/g, ""),
            name: headerMainColumn,
            field: headerColumns[0][i].toLowerCase() + headerMainColumnLowerCase.replace('%', '').replace(/\s/g, ""),
            sortable: true,
            columnGroup: headerColumns[0][i],
            width: 80,
            minWidth: 80,
            cssClass: 'cell-title',
            filter: { model: Filters.compoundInputText },
            type: FieldType.string,
            filterable: true,
            editor: {
              model: Editors.text
            },
          };
          if (headerMainColumnLowerCase.includes('date')) {
            columnObj['type'] = FieldType.date;
            columnObj['formatter'] = Formatters.dateIso;
            columnObj['filter'] = { model: Filters.compoundDate };
            columnObj['editor'] = { model: Editors.date };
            columnObj['exportWithFormatter'] = true;
          }
          else if (headerMainColumnLowerCase.includes('%') || headerMainColumnLowerCase.includes('completion')) {
            columnObj['formatter'] = Formatters.progressBar;// Formatters.percentCompleteBar;
            columnObj['filter'] = { model: Filters.compoundSlider };
            columnObj['type'] = FieldType.number;
            columnObj['width'] = 100;
            columnObj['minWidth'] = 100;
            //columnObj['editor']= { model: Editors.slider};
          }
          else if (headerMainColumnLowerCase.includes('status')) {

            columnObj['editor'] = {
              placeholder: 'choose option',
              // collectionAsync: this.http.get<{ value: string; label: string; }[]>(URL_SAMPLE_COLLECTION_DATA),
              // OR a regular collection load
              //  collection: Array.from(Array(100).keys()).map(k => ({ value: k, prefix: 'Task', label: k })),
              collection: [{ value: 'Assigned', label: 'Assigned' },
              { value: '1st Round Evaluation', label: '1st Round Evaluation' },
              { value: '2nd Round Evaluation', label: '2nd Round Evaluation' },
              { value: 'Customer Evaluation', label: 'Customer Evaluation' },
              { value: 'Panel Setup', label: 'Panel Setup' },
              { value: 'HR Evaluation', label: 'HR Evaluation' },
              { value: 'TR and MR Ties', label: 'TR and MR Ties' },
              { value: 'Offer Rolled', label: 'Offer Rolled' },
              { value: 'Offer Accepted', label: 'Offer Accepted' },
              { value: 'Joined', label: 'Joined' },
              { value: 'Email Id and Employee Id generated', label: 'Email Id and Employee Id generated' },
              { value: 'Role Tagged', label: 'Role Tagged' },
              { value: 'Machine Allocated', label: 'Machine Allocated' },
              { value: 'VDI', label: 'VDI' },
              { value: 'RSA', label: 'RSA' },
              { value: 'CBA Id generated', label: 'CBA Id generated' },
              { value: 'Rejected', label: 'Rejected' }],
              collectionSortBy: {
                property: 'label',
                sortDesc: true
              },
              customStructure: {
                label: 'label',
                value: 'value'
                // labelPrefix: 'prefix',
              },
              collectionOptions: {
                separatorBetweenTextLabels: ' '
              },
              model: Editors.singleSelect,
              required: true
            }
          }
          else if (headerMainColumnLowerCase.includes('availability')) {

            columnObj['editor'] = {
              placeholder: 'choose option',
              collection: [{ value: 'Immediate', label: 'Immediate' },
              { value: '15 Days', label: '15 Days' },
              { value: '30 Days', label: '30 Days' },
              { value: '45 Days', label: '45 Days' },
              { value: '60 Days', label: '60 Days' },
              { value: '90 Days', label: '90 Days' },
              ],
              collectionSortBy: {
                property: 'label',
                sortDesc: true
              },
              customStructure: {
                label: 'label',
                value: 'value'
                // labelPrefix: 'prefix',
              },
              collectionOptions: {
                separatorBetweenTextLabels: ' '
              },
              model: Editors.singleSelect,
              required: true
            }
          }
          this.columnDefinitions1.push(columnObj);
        }
      }
    }
  }

  setGridData() {

    this.dataset1 = [];

    let rows = this.dataRows;
    let fields = this.columnDefinitions1.map(x => x.field);
    for (let i = 0; i < rows.length; i++) {
      let rowObject: any = {};
      let rowData = rows[i].splice(1, rows[i].length);
      rowObject['id'] = i;
      fields.map((field, fieldIndex) => {
        let cellData = rowData[fieldIndex];
        if (typeof cellData == 'object' && cellData.hasOwnProperty('text')) {
          cellData = cellData['text'];
        }
        rowObject[field] = cellData;
      });
      this.dataset1.push(rowObject);
    }
    this.newApplicantsCount = this.dataset1.filter(x => x.candidatestatus == 'Assigned').length;
    this.selectedApplicantsCount = this.dataset1.filter(x => x.candidatestatus == 'Offer Accepted').length;
    this.onHoldApplicantsCount = this.dataset1.filter(x => x.candidatestatus == 'Joined').length;
    this.rejectedApplicantsCount = this.dataset1.filter(x => x.candidatestatus == 'Rejected').length;
  }

  renderDifferentColspan(item: any): ItemMetadata {
    if (item.id % 2 === 1) {
      return {
        columns: {
          duration: {
            colspan: 3 // "duration" will span over 3 columns
          }
        }
      };
    }
    return {
      columns: {
        0: {
          colspan: '*' // starting at column index 0, we will span accross all column (*)
        }
      }
    };
  }

  sendEmail(user: any) {


  }

  openModal(emailTo: any) {
    let bodyText = " <h1><u>Heading Of Message</u></h1> <h4>Subheading</h4> <p>But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain                        was born and I will give you a complete account of the system, and expound the actual teachings                        of the great explorer of the truth, the master-builder of human happiness. No one rejects,                        dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know                        how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again                        is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain,                        but because occasionally circumstances occur in which toil and pain can procure him some great                        pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise,                        except to obtain some advantage from it? But who has any right to find fault with a man who                        chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that                        produces no resultant pleasure? On the other hand, we denounce with righteous indignation and                        dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so                        blinded by desire, that they cannot foresee</p>                      <ul>                        <li>List item one</li>                        <li>List item two</li>                        <li>List item three</li>                        <li>List item four</li>                      </ul>                      <p>Thank you,</p>                      <p>John Doe</p> ";

    const initialState = { subject: "subject", to: emailTo, body: bodyText };
    let modalRef = this.modalService.show(ModalComponent, { initialState: initialState });
    if (modalRef && modalRef.content) {
      modalRef.content.modalRef = modalRef;
    }
  }

  public openModal1(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
    this.editorForm.controls["editor"].setValue("<b>abcd</b>");

    this.editorForm.controls["to"].setValue("EMail");

    this.editorForm.controls["subject"].setValue("Subject");
  }

  sendEmail1(user: any) {
    this.http.post("http://localhost:3000/sendmail", user).subscribe(
      data => {
        let res: any = data;
        $("#mailsent").text('Mail has been sent successfully to ' + user.name);
        $("#mailsent").show();
        $("#mailsent").fadeOut(6000);
      },
      err => {
        console.log(err);
      }, () => {
      }
    );
  }
  onSend() {

  }

}

