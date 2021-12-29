import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ExcelExportService } from '@slickgrid-universal/excel-export';
import { SlickCompositeEditorComponent } from '@slickgrid-universal/composite-editor-component';

import {
  AngularGridInstance,
  AutocompleteOption,
  Column,
  CompositeEditorModalType,
  EditCommand,
  Editors,
  FieldType,
  Filters,
  formatNumber,
  Formatter,
  Formatters,
  GridOption,
  GridStateChange,
  LongTextEditorOption,
  OnCompositeEditorChangeEventArgs,
  SlickGrid,
  SlickNamespace,
  SortComparers,
} from '../modules/angular-slickgrid';
import { ApiService } from '../services/api.service';
import Engagement from '../models/engagement.model';


// using external SlickGrid JS libraries
declare const Slick: SlickNamespace;

/**
 * Check if the current item (cell) is editable or not
 * @param {*} dataContext - item data context object
 * @param {*} columnDef - column definition
 * @param {*} grid - slickgrid grid object
 * @returns {boolean} isEditable
 */
function checkItemIsEditable(dataContext: any, columnDef: Column, grid: SlickGrid) {
  const gridOptions = grid && grid.getOptions && grid.getOptions();
  const hasEditor = columnDef.editor;
  const isGridEditable = gridOptions.editable;
  let isEditable = !!(isGridEditable && hasEditor);

  if (dataContext && columnDef && gridOptions && gridOptions.editable) {
    switch (columnDef.id) {
      case 'finish':
        // case 'percentComplete':
        isEditable = !!dataContext?.completed;
        break;
      // case 'completed':
      // case 'duration':
      // case 'title':
      // case 'product':
      // case 'origin':
      // isEditable = dataContext.percentComplete < 50;
      // break;
    }
  }
  return isEditable;
}


const customEditableInputFormatter: Formatter = (_row, _cell, value, columnDef, _dataContext, grid) => {
  const gridOptions = grid && grid.getOptions && grid.getOptions();
  const isEditableLine = gridOptions.editable && columnDef.editor;
  value = (value === null || value === undefined) ? '' : value;
  return isEditableLine ? { text: value, addClasses: 'editable-field', toolTip: 'Click to Edit' } : value;
};

// you can create custom validator to pass to an inline editor
const myCustomTitleValidator = (value: any, args: any) => {
  if ((value === null || value === undefined || !value.length) && (args.compositeEditorOptions && args.compositeEditorOptions.modalType === 'create' || args.compositeEditorOptions.modalType === 'edit')) {
    // we will only check if the field is supplied when it's an inline editing OR a composite editor of type create/edit
    return { valid: false, msg: 'This is a required field.' };
  }
  // else if (!/^(task\s\d+)*$/i.test(value)) {
  //   return { valid: false, msg: 'Your title is invalid, it must start with "Task" followed by a number.' };
  // }
  return { valid: true, msg: '' };
};

@Component({
  selector: 'app-engagement',
  templateUrl: './engagement.component.html',
  styleUrls: ['./engagement.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class EngagementComponent implements OnInit {

  angularGrid!: AngularGridInstance;
  compositeEditorInstance!: SlickCompositeEditorComponent;
  gridOptions!: GridOption;
  columnDefinitions: Column[] = [];
  dataset: any[] = [];
  editQueue: any[] = [];
  editedItems: any = {};
  isGridEditable = true;
  isCompositeDisabled = false;
  isMassSelectionDisabled = true;

  constructor(private http: HttpClient, public apiService: ApiService) {
    this.compositeEditorInstance = new SlickCompositeEditorComponent();
  }

  angularGridReady(angularGrid: AngularGridInstance) {
    this.angularGrid = angularGrid;
  }

  ngOnInit(): void {
    this.prepareGrid();
    this.loadData();
  }

  prepareGrid() {
    this.columnDefinitions = [
      {
        id: 'name', name: 'Engagement Name', field: 'name', sortable: true, type: FieldType.string, minWidth: 75,
        filterable: true,
        filter: { model: Filters.compoundInputText },
        // formatter: Formatters.multiple, params: { formatters: [Formatters.uppercase] },
        editor: {
          model: Editors.text
        },
        validator: myCustomTitleValidator
      },
      {
        id: 'skillSet', name: 'Skill Set', field: 'skillSet', sortable: true, type: FieldType.string, minWidth: 75,
        filterable: true,
        filter: { model: Filters.compoundInputText },
        //  formatter: Formatters.multiple,
        editor: {
          model: Editors.longText, massUpdate: false, required: true, alwaysSaveOnEnterKey: true,
          maxLength: 200,
          editorOptions: {
            cols: 45,
            rows: 6,
            buttonTexts: {
              cancel: 'Close',
              save: 'Done'
            }
          } as LongTextEditorOption,
          validator: myCustomTitleValidator
        },
      },
      {
        id: 'experience', name: 'Experience', field: 'experience', minWidth: 100,
        type: FieldType.number,
        sortable: true, filterable: true,
        filter: { model: Filters.compoundSlider, operator: '>=' },
        editor: {
          model: Editors.slider,
          massUpdate: true, minValue: 1, maxValue: 20,
        }
      },
      {
        id: 'numberOfPositions', name: 'No of positions', field: 'numberOfPositions', minWidth: 100,
        type: FieldType.number,
        sortable: true, filterable: true,
        filter: { model: Filters.compoundSlider, operator: '>=' },
        editor: {
          model: Editors.slider,
          massUpdate: true, minValue: 1, maxValue: 20,
        }
      },
      {
        id: 'location', name: 'Location', field: 'location', minWidth: 100,
        type: FieldType.string,
        sortable: true, filterable: true,
        filter: { model: Filters.inputText },
        editor: {
          massUpdate: true,
          placeholder: 'choose option',
          collection: [{ value: 'Offshore', label: 'Offshore' },
          { value: 'Onshore', label: 'Onshore' }
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
        },
      },
      {
        id: 'closeBy', name: 'To be closed by', field: 'closeBy', sortable: true, minWidth: 100,
        formatter: Formatters.dateUs,
        exportCustomFormatter: Formatters.dateUs,
        type: FieldType.date, outputType: FieldType.dateUs, saveOutputType: FieldType.dateUtc,
        filterable: true, filter: { model: Filters.compoundDate },
        editor: { model: Editors.date, massUpdate: true, params: { hideClearButton: false } },
      }
    ];

    this.gridOptions = {
      enableAddRow: true, // <-- this flag is required to work with the (create & clone) modal types
      enableCellNavigation: true,
      asyncEditorLoading: false,
      autoEdit: true,
      autoCommitEdit: true,
      editable: true,
      autoHeight: true,
      autoAddCustomEditorFormatter: customEditableInputFormatter,
      autoResize: {
        container: '#demo-container',
        rightPadding: 10
      },
      gridWidth: '100%',
      enableAutoSizeColumns: true,
      enableAutoResize: true,
      showCustomFooter: true,
      enablePagination: true,
      pagination: {
        pageSize: 10,
        pageSizes: [10, 50, 100]
      },
      enableExcelExport: true,
      excelExportOptions: {
        exportWithFormatter: false
      },
      registerExternalResources: [new ExcelExportService(), this.compositeEditorInstance],
      enableFiltering: true,
      rowSelectionOptions: {
        // True (Single Selection), False (Multiple Selections)
        selectActiveRow: false
      },
      // createPreHeaderPanel: true,
      // showPreHeaderPanel: true,
      // preHeaderPanelHeight: 28,
      enableCheckboxSelector: true,
      enableRowSelection: true,
      multiSelect: false,
      checkboxSelector: {
        hideInFilterHeaderRow: false,
        hideInColumnTitleRow: true,
      },
      enableCompositeEditor: true,
      editCommandHandler: (item, column, editCommand) => {
        // composite editors values are saved as array, so let's convert to array in any case and we'll loop through these values
        const prevSerializedValues = Array.isArray(editCommand.prevSerializedValue) ? editCommand.prevSerializedValue : [editCommand.prevSerializedValue];
        const serializedValues = Array.isArray(editCommand.serializedValue) ? editCommand.serializedValue : [editCommand.serializedValue];
        const editorColumns = this.columnDefinitions.filter((col) => col.editor !== undefined);

        const modifiedColumns: Column[] = [];
        prevSerializedValues.forEach((_val, index) => {
          const prevSerializedValue = prevSerializedValues[index];
          const serializedValue = serializedValues[index];

          if (prevSerializedValue !== serializedValue) {
            const finalColumn = Array.isArray(editCommand.prevSerializedValue) ? editorColumns[index] : column;
            this.editedItems[this.gridOptions.datasetIdPropertyName || 'id'] = item; // keep items by their row indexes, if the row got edited twice then we'll keep only the last change
            this.angularGrid.slickGrid.invalidate();
            editCommand.execute();

            this.renderUnsavedCellStyling(item, finalColumn, editCommand);
            modifiedColumns.push(finalColumn);
          }
        });

        // queued editor only keeps 1 item object even when it's a composite editor,
        // so we'll push only 1 change at the end but with all columns modified
        // this way we can undo the entire row change (for example if user changes 3 field in the editor modal, then doing a undo last change will undo all 3 in 1 shot)
        this.editQueue.push({ item, columns: modifiedColumns, editCommand });
      },
      // when using the cellMenu, you can change some of the default options and all use some of the callback methods
      enableCellMenu: true,
    };
  }

  loadData() {

    // Todo API call
    // this.apiService.getEngagements().subscribe(data => {
    //   this.dataset = data;
    // });

    this.dataset = this.apiService.getEngagementsTestData();
  }

  // --
  // event handlers
  // ---------------

  handleValidationError(_e: Event, args: any) {
    if (args.validationResults) {
      let errorMsg = args.validationResults.msg || '';
      if (args.editor && (args.editor instanceof Slick.CompositeEditor)) {
        if (args.validationResults.errors) {
          errorMsg += '\n';
          for (const error of args.validationResults.errors) {
            const columnName = error.editor.args.column.name;
            errorMsg += `${columnName.toUpperCase()}: ${error.msg}`;
          }
        }
        console.log(errorMsg);
      }
    } else {
      alert(args.validationResults.msg);
    }
    return false;
  }

  handleItemDeleted(_e: any, args: any) {
    console.log('item deleted with id:', args.itemId);
  }

  handleOnBeforeEditCell(e: any, args: any) {
    const { column, item, grid } = args;

    if (column && item) {
      if (!checkItemIsEditable(item, column, grid)) {
        e.stopImmediatePropagation();
        return false;
      }
    }
    return true;
  }

  handleOnCellChange(_e: any, args: any) {
    const dataContext = args?.item;

    // when the field "completed" changes to false, we also need to blank out the "finish" date
    if (dataContext && !dataContext.completed) {
      dataContext.finish = null;
      this.angularGrid.gridService.updateItem(dataContext);
    }
  }

  handleOnCellClicked(e: any, args: any) {
    // console.log(e, args);
    // if (eventData.target.classList.contains('fa-question-circle-o')) {
    //   alert('please HELP!!!');
    // } else if (eventData.target.classList.contains('fa-chevron-down')) {
    //   alert('do something else...');
    // }
  }

  handleOnCompositeEditorChange(_e: any, args: OnCompositeEditorChangeEventArgs) {
    const columnDef = args.column;
    const formValues = args.formValues;

    // you can dynamically change a select dropdown collection,
    // if you need to re-render the editor for the list to be reflected
    // if (columnDef.id === 'duration') {
    //   const editor = this.compositeEditorInstance.editors['percentComplete2'] as SelectEditor;
    //   const newCollection = editor.finalCollection;
    //   editor.renderDomElement(newCollection);
    // }

    // you can change any other form input values when certain conditions are met
    if (columnDef.id === 'percentComplete' && formValues.percentComplete === 100) {
      this.compositeEditorInstance.changeFormInputValue('completed', true);
      this.compositeEditorInstance.changeFormInputValue('finish', new Date());
      // this.compositeEditorInstance.changeFormInputValue('product', { id: 0, itemName: 'Sleek Metal Computer' });

      // you can even change a value that is not part of the form (but is part of the grid)
      // but you will have to bypass the error thrown by providing `true` as the 3rd argument
      // this.compositeEditorInstance.changeFormInputValue('cost', 9999.99, true);
    }

    // you can also change some editor options (not all Editors supports this functionality, so far only these Editors AutoComplete, Date MultipleSelect & SingleSelect)
    /*
    if (columnDef.id === 'completed') {
      this.compositeEditorInstance.changeFormEditorOption('percentComplete', 'filter', formValues.completed);
      this.compositeEditorInstance.changeFormEditorOption('product', 'minLength', 3);
    }
    */
  }

  handlePaginationChanged() {
    this.removeAllUnsavedStylingFromCell();
    this.renderUnsavedStylingOnAllVisibleCells();
  }

  handleOnGridStateChanged(gridStateChanges: GridStateChange) {
    if (Array.isArray(gridStateChanges.gridState?.rowSelection?.dataContextIds)) {
      this.isMassSelectionDisabled = gridStateChanges.gridState?.rowSelection?.dataContextIds.length === 0;
    }
  }

  openCompositeModal(modalType: CompositeEditorModalType) {
    // open the editor modal and we can also provide a header title with optional parsing pulled from the dataContext, via template {{ }}
    // for example {{title}} => display the item title, or even complex object works {{product.itemName}} => display item product name

    let modalTitle = '';
    switch (modalType) {
      case 'create':
        modalTitle = 'Creating New Engagement';
        break;
      case 'clone':
        modalTitle = 'Clone - {{skill}}';
        break;
      case 'edit':
        modalTitle = 'Editing Engagement - {{skill}}'; // 'Editing - {{title}} ({{product.itemName}})'
        break;
      case 'mass-update':
        modalTitle = 'Mass Update All Records';
        break;
      case 'mass-selection':
        modalTitle = 'Update Selected Records';
        break;
    }

    this.compositeEditorInstance?.openDetails({
      headerTitle: modalTitle,
      modalType,
      insertOptions: { highlightRow: false }, // disable highlight to avoid flaky tests in Cypress
      // showCloseButtonOutside: true,
      // backdrop: null,
      // viewColumnLayout: 2, // responsive layout, choose from 'auto', 1, 2, or 3 (defaults to 'auto')
      showFormResetButton: true,
      // showResetButtonOnEachEditor: true,
      onClose: () => Promise.resolve(confirm('You have unsaved changes, are you sure you want to close this window?')),
      onError: (error) => alert(error.message),
      onSave: (formValues, _selection, dataContext) => {
        const serverResponseDelay = 50;
        // simulate a backend server call which will reject if the "% Complete" is below 50%
        // when processing a mass update or mass selection
        if (modalType === 'mass-update' || modalType === 'mass-selection') {
          // Todo API call
          let engagements: Engagement[] = [];
          if (modalType === 'mass-update') {
            this.angularGrid.dataView.getItems().forEach(row => {
              engagements.push(Object.assign(row, formValues));
            });
          } else {
            this.angularGrid.dataView.getAllSelectedItems().forEach(row => {
              engagements.push(Object.assign(row, formValues));
            });
          }
          return this.apiService.updateEngagements(engagements).toPromise();
        } else {
          // also simulate a server cal for any other modal type (create/clone/edit)
          // we'll just apply the change without any rejection from the server and
          // note that we also have access to the "dataContext" which is only available for these modal
          // SK: Todo         
          // Todo API call
          if (modalType === 'create') {
            return this.apiService.addEngagement(dataContext).toPromise();
          } else if (modalType === 'edit') {
            return this.apiService.updateEngagement(dataContext).toPromise();
          } else {
            console.log(`${modalType} item data context`, dataContext);
            return new Promise(resolve => setTimeout(() => resolve(true), serverResponseDelay));
          }
        }
      }
    });
  }

  toggleGridEditReadonly() {
    // first need undo all edits
    this.undoAllEdits();

    // then change a single grid options to make the grid non-editable (readonly)
    this.isGridEditable = !this.isGridEditable;
    this.isCompositeDisabled = !this.isGridEditable;
    if (!this.isGridEditable) {
      this.isMassSelectionDisabled = true;
    }
    // dynamically change SlickGrid editable grid option
    this.angularGrid.slickGrid.setOptions({ editable: this.isGridEditable });
  }

  removeUnsavedStylingFromCell(_item: any, column: Column, row: number) {
    // remove unsaved css class from that cell
    this.angularGrid.slickGrid.removeCellCssStyles(`unsaved_highlight_${[column.id]}${row}`);
  }

  removeAllUnsavedStylingFromCell() {
    for (const lastEdit of this.editQueue) {
      const lastEditCommand = lastEdit?.editCommand;
      if (lastEditCommand) {
        // remove unsaved css class from that cell
        for (const lastEditColumn of lastEdit.columns) {
          this.removeUnsavedStylingFromCell(lastEdit.item, lastEditColumn, lastEditCommand.row);
        }
      }
    }
  }

  renderUnsavedStylingOnAllVisibleCells() {
    for (const lastEdit of this.editQueue) {
      if (lastEdit) {
        const { item, columns, editCommand } = lastEdit;
        if (Array.isArray(columns)) {
          columns.forEach((col) => {
            this.renderUnsavedCellStyling(item, col, editCommand);
          });
        }
      }
    }
  }

  renderUnsavedCellStyling(item: any, column: Column, editCommand: EditCommand) {
    if (editCommand && item && column) {
      const row = this.angularGrid.dataView.getRowByItem(item) as number;
      if (row >= 0) {
        const hash = { [row]: { [column.id]: 'unsaved-editable-field' } };
        this.angularGrid.slickGrid.setCellCssStyles(`unsaved_highlight_${[column.id]}${row}`, hash);
      }
    }
  }

  saveAll() {
    // Edit Queue (array increases every time a cell is changed, regardless of item object)
    console.log(this.editQueue);

    // Edit Items only keeps the merged data (an object with row index as the row properties)
    // if you change 2 different cells on 2 different cells then this editedItems will only contain 1 property
    // example: editedItems = { 0: { title: task 0, duration: 50, ... }}
    // ...means that row index 0 got changed and the final merged object is { title: task 0, duration: 50, ... }
    console.log(this.editedItems);
    // console.log(`We changed ${Object.keys(this.editedItems).length} rows`);

    // since we saved, we can now remove all the unsaved color styling and reset our array/object
    this.removeAllUnsavedStylingFromCell();
    this.editQueue = [];
    this.editedItems = {};
  }

  undoLastEdit(showLastEditor = false) {
    const lastEdit = this.editQueue.pop();
    const lastEditCommand = lastEdit?.editCommand;
    if (lastEdit && lastEditCommand && Slick.GlobalEditorLock.cancelCurrentEdit()) {
      lastEditCommand.undo();

      // remove unsaved css class from that cell
      for (const lastEditColumn of lastEdit.columns) {
        this.removeUnsavedStylingFromCell(lastEdit.item, lastEditColumn, lastEditCommand.row);
      }
      this.angularGrid.slickGrid.invalidate();


      // optionally open the last cell editor associated
      if (showLastEditor) {
        this.angularGrid.slickGrid.gotoCell(lastEditCommand.row, lastEditCommand.cell, false);
      }
    }
  }

  undoAllEdits() {
    for (const lastEdit of this.editQueue) {
      const lastEditCommand = lastEdit?.editCommand;
      if (lastEditCommand && Slick.GlobalEditorLock.cancelCurrentEdit()) {
        lastEditCommand.undo();

        // remove unsaved css class from that cell
        for (const lastEditColumn of lastEdit.columns) {
          this.removeUnsavedStylingFromCell(lastEdit.item, lastEditColumn, lastEditCommand.row);
        }
      }
    }
    this.angularGrid.slickGrid.invalidate(); // re-render the grid only after every cells got rolled back
    this.editQueue = [];
  }
}