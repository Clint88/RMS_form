import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PersonAppendPageRoutingModule } from './person-append-routing.module';

import { PersonAppendPage } from './person-append.page';

import { UpdatePersonDirective } from '../directives/update-person.directive';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    PersonAppendPageRoutingModule,
  ],
  declarations: [PersonAppendPage, UpdatePersonDirective],
})
export class PersonAppendPageModule {}
