import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VehicleAddPageRoutingModule } from './vehicle-add-routing.module';

import { VehicleAddPage } from './vehicle-add.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    VehicleAddPageRoutingModule
  ],
  declarations: [VehicleAddPage]
})
export class VehicleAddPageModule {}
