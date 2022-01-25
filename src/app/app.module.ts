import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DevExtremeModule } from 'devextreme-angular';
import { QueryParamModule } from '@ngqp/core';
import { AppComponent } from './app.component';
import { Service } from './app.service';
import { RouterModule } from '@angular/router';
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([]),
    DevExtremeModule,
    QueryParamModule,
  ],
  providers: [Service],
  bootstrap: [AppComponent],
})
export class AppModule {}
