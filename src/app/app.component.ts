import { Component, OnInit, ViewChild } from '@angular/core';
import { Service, Order } from './app.service';
import { DxDataGridComponent } from 'devextreme-angular';
import { QueryParamBuilder, QueryParamGroup } from '@ngqp/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  @ViewChild(DxDataGridComponent) dataGrid!: DxDataGridComponent;
  orders!: Order[];
  storageKey: string = 'datagrid-state';

  paramGroup!: QueryParamGroup;

  constructor(
    private service: Service,
    private qpb: QueryParamBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.orders = this.service.getOrders();

    this.paramGroup = this.qpb.group({
      searchText: this.qpb.stringParam('searchText'),
      pageIndex: this.qpb.numberParam('pageIndex'),
      filterValue: this.qpb.stringParam('filterValue'),
      columns: this.qpb.stringParam('columns', {
        serialize: (value: any): string => JSON.stringify(value),
        deserialize: (value: string): any => JSON.parse(value),
      }),
    });
  }

  loadState = () => {
    if (this.router.routerState.snapshot.url.indexOf('&') !== -1) {
      return this.paramGroup.value;
    } else {
      return JSON.parse(localStorage.getItem(this.storageKey) as string);
    }
  };

  saveState = (state: any) => {
    this.paramGroup.patchValue(state);

    if (state) {
      for (let i = 0; i < state.columns.length; i++) {
        state.columns[i].filterValue = null;
      }
    }
    localStorage.setItem(this.storageKey, JSON.stringify(state));
  };
}
