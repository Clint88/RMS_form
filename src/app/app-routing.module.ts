import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'incident-add',
    loadChildren: () =>
      import('./incident-add/incident-add.module').then(
        (m) => m.IncidentAddPageModule
      ),
  },
  {
    path: 'incident-append',
    loadChildren: () =>
      import('./incident-append/incident-append.module').then(
        (m) => m.IncidentAppendPageModule
      ),
  },
  {
    path: 'incident-lookup',
    loadChildren: () =>
      import('./incident-lookup/incident-lookup.module').then(
        (m) => m.IncidentLookupPageModule
      ),
  },
  {
    path: 'person-add',
    loadChildren: () =>
      import('./person-add/person-add.module').then(
        (m) => m.PersonAddPageModule
      ),
  },
  {
    path: 'person-append',
    loadChildren: () =>
      import('./person-append/person-append.module').then(
        (m) => m.PersonAppendPageModule
      ),
  },
  {
    path: 'person-lookup',
    loadChildren: () =>
      import('./person-lookup/person-lookup.module').then(
        (m) => m.PersonLookupPageModule
      ),
  },
  {
    path: 'vehicle-add',
    loadChildren: () =>
      import('./vehicle-add/vehicle-add.module').then(
        (m) => m.VehicleAddPageModule
      ),
  },
  {
    path: 'vehicle-append',
    loadChildren: () =>
      import('./vehicle-append/vehicle-append.module').then(
        (m) => m.VehicleAppendPageModule
      ),
  },
  {
    path: 'vehicle-lookup',
    loadChildren: () =>
      import('./vehicle-lookup/vehicle-lookup.module').then(
        (m) => m.VehicleLookupPageModule
      ),
  },
  {
    path: 'view-more',
    loadChildren: () =>
      import('./modals/view-more/view-more.module').then(
        (m) => m.ViewMorePageModule
      ),
  },  {
    path: 'append-report',
    loadChildren: () => import('./modals/append-report/append-report.module').then( m => m.AppendReportPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
