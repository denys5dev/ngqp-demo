import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Service, Order } from './app.service';
import { DxDataGridComponent } from 'devextreme-angular';
import { QueryParamBuilder, QueryParamGroup } from '@ngqp/core';
import { Subject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  @ViewChild(DxDataGridComponent) dataGrid!: DxDataGridComponent;
  orders!: Order[];
  paramGroup!: QueryParamGroup;
  storageKey: string = 'datagrid-state';
  private destroy$: Subject<boolean> = new Subject<boolean>();

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
      pageSize: this.qpb.numberParam('pageSize'),
      filterValue: this.qpb.stringParam('filterValue'),
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
    if (state) {
      for (let i = 0; i < state.columns.length; i++) {
        state.columns[i].filterValue = null;
      }
    }
    localStorage.setItem(this.storageKey, JSON.stringify(state));

    this.paramGroup.patchValue(state);
  };

  onStateResetClick() {
    this.dataGrid.instance.state(null);
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
