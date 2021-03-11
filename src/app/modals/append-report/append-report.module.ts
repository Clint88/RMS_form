import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AppendReportPageRoutingModule } from './append-report-routing.module';

import { AppendReportPage } from './append-report.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AppendReportPageRoutingModule
  ],
  declarations: [AppendReportPage]
})
export class AppendReportPageModule {}
