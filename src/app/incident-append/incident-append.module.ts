import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IncidentAppendPageRoutingModule } from './incident-append-routing.module';

import { IncidentAppendPage } from './incident-append.page';

import { UpdateIncidentDirective } from '../directives/update-incident.directive';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    IncidentAppendPageRoutingModule,
  ],
  declarations: [IncidentAppendPage, UpdateIncidentDirective],
})
export class IncidentAppendPageModule {}
