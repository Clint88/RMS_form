import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IncidentAddPageRoutingModule } from './incident-add-routing.module';

import { IncidentAddPage } from './incident-add.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IncidentAddPageRoutingModule
  ],
  declarations: [IncidentAddPage]
})
export class IncidentAddPageModule {}
