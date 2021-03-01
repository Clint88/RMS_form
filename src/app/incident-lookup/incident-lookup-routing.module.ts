import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IncidentLookupPage } from './incident-lookup.page';

const routes: Routes = [
  {
    path: '',
    component: IncidentLookupPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IncidentLookupPageRoutingModule {}
