import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VehicleLookupPageRoutingModule } from './vehicle-lookup-routing.module';

import { VehicleLookupPage } from './vehicle-lookup.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VehicleLookupPageRoutingModule
  ],
  declarations: [VehicleLookupPage]
})
export class VehicleLookupPageModule {}
