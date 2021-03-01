import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PersonLookupPage } from './person-lookup.page';

const routes: Routes = [
  {
    path: '',
    component: PersonLookupPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PersonLookupPageRoutingModule {}
