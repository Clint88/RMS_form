import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PersonAddPageRoutingModule } from './person-add-routing.module';

import { PersonAddPage } from './person-add.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PersonAddPageRoutingModule
  ],
  declarations: [PersonAddPage]
})
export class PersonAddPageModule {}
