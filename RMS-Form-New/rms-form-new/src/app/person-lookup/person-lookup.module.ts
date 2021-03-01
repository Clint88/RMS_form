import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PersonLookupPageRoutingModule } from './person-lookup-routing.module';

import { PersonLookupPage } from './person-lookup.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PersonLookupPageRoutingModule
  ],
  declarations: [PersonLookupPage]
})
export class PersonLookupPageModule {}
