import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VehicleAppendPageRoutingModule } from './vehicle-append-routing.module';

import { VehicleAppendPage } from './vehicle-append.page';

import { UpdateVehicleDirective } from '../directives/update-vehicle.directive';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UpdateVehicleDirective,
    IonicModule,
    VehicleAppendPageRoutingModule,
  ],
  declarations: [VehicleAppendPage],
})
export class VehicleAppendPageModule {}
