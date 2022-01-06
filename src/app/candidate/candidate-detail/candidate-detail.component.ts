import { Component, OnInit } from '@angular/core';
import Candidate from 'src/app/models/candidate.model';
import { ApiService } from 'src/app/services/api.service';
import {
  AngularGridInstance,
  Column,
  FieldType,
  GridOption,
  SlickRowDetailView
} from '../../modules/angular-slickgrid';
import { CandidatePreloadComponent } from '../candidate-preload/candidate-preload.component';
import { CandidateViewComponent } from '../candidate-view/candidate-view.component';

@Component({
  selector: 'app-candidate-detail',
  templateUrl: './candidate-detail.component.html',
  styleUrls: ['./candidate-detail.component.css']
})

export class CandidateDetailComponent implements OnInit {
  title = 'Candidate Details';

  angularGrid!: AngularGridInstance;
  columnDefinitions!: Column[];
  candidateDetailGridOptions!: GridOption;
  dataset!: any[];
  detailViewRowCount = 9;
  message = '';
  flashAlertType = 'info';
  showSpinner: boolean = false;

  constructor(public apiService: ApiService) { }

  angularGridReady(angularGrid: AngularGridInstance) {
    this.angularGrid = angularGrid;
  }

  get rowDetailInstance(): SlickRowDetailView {
    // you can get the SlickGrid RowDetail plugin (addon) instance via 2 ways

    // option 1
    return (this.angularGrid.extensions.rowDetailView.instance || {});

    // OR option 2
    // return this.angularGrid?.extensionService.getExtensionInstanceByName(ExtensionName.rowDetailView) || {};
  }

  ngOnInit(): void {
    this.showSpinner = true;
    this.defineGrid();
    this.loadData();
  }

  /* Define grid Options and Columns */
  defineGrid() {

    this.columnDefinitions = [
      { id: 'name', name: 'Candidate Name', field: 'name', toolTip: 'Click on + icon for more details', sortable: true, type: FieldType.string, filterable: true },
      { id: 'epNumber', name: 'EP Number', field: 'epNumber', toolTip: 'Click on + icon for more details', sortable: true, type: FieldType.string, filterable: true },
      { id: 'experience', name: 'Experience (yrs)', field: 'experience', toolTip: 'Click on + icon for more details', sortable: true, type: FieldType.string, filterable: true },
      { id: 'skillSet', name: 'Skill set', field: 'skillSet', toolTip: 'Click on + icon for more details', sortable: true, type: FieldType.string, filterable: true }
    ];

    this.candidateDetailGridOptions = {
      autoResize: {
        container: '#demo-container',
        rightPadding: 10
      },
      gridWidth: '100%',
      enablePagination: true,
      pagination: {
        pageSize: 15,
        pageSizes: [15, 30, 45, 60, 75, 90]
      },
      autoHeight: true,
      enableFiltering: true,
      enableRowDetailView: true,
      rowSelectionOptions: {
        selectActiveRow: true
      },
      datasetIdPropertyName: 'candidateId', // optionally use a different "id"
      rowDetailView: {
        // optionally change the column index position of the icon (defaults to 0)
        // columnIndexPosition: 1,

        // We can load the "process" asynchronously in 2 different ways (httpClient OR even Promise)
        process: (item) => this.simulateServerAsyncCall(item),
        // process: (item) => this.http.get(`api/item/${item.id}`),

        // load only once and reuse the same item detail without calling process method
        loadOnce: true,

        // limit expanded row to only 1 at a time
        singleRowExpand: true,

        // false by default, clicking anywhere on the row will open the detail view
        // when set to false, only the "+" icon would open the row detail
        // if you use editor or cell navigation you would want this flag set to false (default)
        useRowClick: true,

        // how many grid rows do we want to use for the row detail panel (this is only set once and will be used for all row detail)
        // also note that the detail view adds an extra 1 row for padding purposes
        // so if you choose 4 panelRows, the display will in fact use 5 rows
        panelRows: this.detailViewRowCount,

        // you can override the logic for showing (or not) the expand icon
        // for example, display the expand icon only on every 2nd row
        // expandableOverride: (row: number, dataContext: any) => (dataContext.rowId % 2 === 1),

        // Preload View Component
        preloadComponent: CandidatePreloadComponent,

        // View Component to load when row detail data is ready
        viewComponent: CandidateViewComponent,

        // Optionally pass your Parent Component reference to your Child Component (row detail component)
        parent: this,

        onAfterRowDetailToggle: (item) => this.collapseRowDetailPreload(item),
      }
    };

  }

  loadData() {
    this.dataset = [];
    this.apiService.getCandidates().subscribe(data => {
      this.dataset = data.map((candidate: Candidate) => ({
        name: candidate.details.name,
        epNumber: candidate.details.epNumber,
        skillSet: candidate.details.skillSet,
        candidateId: candidate.candidateId,
        experience: candidate.details.experience
      }));
      this.angularGrid.gridService.resetGrid();
      this.showSpinner = false;
    });

    // this.dataset = this.apiService.getCandidatesTestData1();
  }

  changeDetailViewRowCount() {
    if (this.angularGrid && this.angularGrid.extensionService) {
      const options = this.rowDetailInstance.getOptions();
      if (options && options.panelRows) {
        options.panelRows = this.detailViewRowCount; // change number of rows dynamically
        this.rowDetailInstance.setOptions(options);
      }
    }
  }

  closeAllRowDetail() {
    if (this.angularGrid && this.angularGrid.extensionService) {

      this.rowDetailInstance.collapseAll();
    }
  }

  showFlashMessage(message: string, alertType = 'info') {
    this.message = message;
    this.flashAlertType = alertType;
  }

  /** Just for demo purposes, we will simulate an async server call and return more details on the selected row item */
  simulateServerAsyncCall(item: any) {
    // random set of names to use for more item detail
    const randomNames = ['John Doe', 'Jane Doe', 'Chuck Norris', 'Bumblebee', 'Jackie Chan', 'Elvis Presley', 'Bob Marley', 'Mohammed Ali', 'Bruce Lee', 'Rocky Balboa'];

    // fill the template on async delay
    return new Promise((resolve) => {
      setTimeout(() => {
        const itemDetail = item;

        // let's add some extra properties to our item for a better async simulation
        itemDetail.assignee = randomNames[this.randomNumber(0, 10)];
        itemDetail.reporter = randomNames[this.randomNumber(0, 10)];

        // resolve the data after delay specified
        resolve(itemDetail);
      }, 1000);
    });
  }

  private randomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  collapseRowDetailPreload(item: any) {
    let rowsCollapsed = $(".slick-row").find(".collapse").length;
    if (rowsCollapsed == 0) {
      $("ng-component").remove();
    }
  }
}
