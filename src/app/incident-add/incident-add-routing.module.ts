import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IncidentAddPage } from './incident-add.page';

const routes: Routes = [
  {
    path: '',
    component: IncidentAddPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IncidentAddPageRoutingModule {}
