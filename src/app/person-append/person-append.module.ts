import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PersonAppendPageRoutingModule } from './person-append-routing.module';

import { PersonAppendPage } from './person-append.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PersonAppendPageRoutingModule
  ],
  declarations: [PersonAppendPage]
})
export class PersonAppendPageModule {}
