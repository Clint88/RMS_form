import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IncidentAppendPage } from './incident-append.page';

const routes: Routes = [
  {
    path: '',
    component: IncidentAppendPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IncidentAppendPageRoutingModule {}
