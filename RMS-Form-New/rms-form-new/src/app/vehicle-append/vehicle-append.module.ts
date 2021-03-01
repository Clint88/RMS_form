import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VehicleAppendPageRoutingModule } from './vehicle-append-routing.module';

import { VehicleAppendPage } from './vehicle-append.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VehicleAppendPageRoutingModule
  ],
  declarations: [VehicleAppendPage]
})
export class VehicleAppendPageModule {}
