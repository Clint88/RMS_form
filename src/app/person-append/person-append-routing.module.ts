import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PersonAppendPage } from './person-append.page';

const routes: Routes = [
  {
    path: '',
    component: PersonAppendPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PersonAppendPageRoutingModule {}
