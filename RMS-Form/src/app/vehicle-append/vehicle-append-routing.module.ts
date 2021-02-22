import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VehicleAppendPage } from './vehicle-append.page';

const routes: Routes = [
  {
    path: '',
    component: VehicleAppendPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VehicleAppendPageRoutingModule {}
