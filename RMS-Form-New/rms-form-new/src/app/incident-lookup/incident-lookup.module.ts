import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IncidentLookupPageRoutingModule } from './incident-lookup-routing.module';

import { IncidentLookupPage } from './incident-lookup.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IncidentLookupPageRoutingModule
  ],
  declarations: [IncidentLookupPage]
})
export class IncidentLookupPageModule {}
