import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VehicleLookupPage } from './vehicle-lookup.page';

const routes: Routes = [
  {
    path: '',
    component: VehicleLookupPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VehicleLookupPageRoutingModule {}
