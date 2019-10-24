import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-checkbox-all',
  templateUrl: './checkbox-all.component.html',
  styleUrls: ['./checkbox-all.component.scss']
})
export class CheckboxAllComponent implements OnInit {
  // @ts-ignore
  @ViewChild('checkboxAll', {read: ElementRef}) public checkboxAll;
  private params: any;
  private gridApi;
  private collId;
  private displayName;

  constructor() {
  }

  ngOnInit() {
  }

  onSelectAllChanged(e) {
    (e.target.checked) ? this.gridApi.selectAll() : this.gridApi.deselectAll();
  }

  agInit(params): void {
    this.gridApi = params.api;
    this.params = params;
    this.collId = params.column.colId;
    this.displayName = params.displayName;
  }

}
