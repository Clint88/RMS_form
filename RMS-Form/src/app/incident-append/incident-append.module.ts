import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IncidentAppendPageRoutingModule } from './incident-append-routing.module';

import { IncidentAppendPage } from './incident-append.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IncidentAppendPageRoutingModule
  ],
  declarations: [IncidentAppendPage]
})
export class IncidentAppendPageModule {}
