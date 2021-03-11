import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppendReportPage } from './append-report.page';

const routes: Routes = [
  {
    path: '',
    component: AppendReportPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppendReportPageRoutingModule {}
