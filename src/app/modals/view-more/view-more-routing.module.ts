import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewMorePage } from './view-more.page';

const routes: Routes = [
  {
    path: '',
    component: ViewMorePage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewMorePageRoutingModule {}
