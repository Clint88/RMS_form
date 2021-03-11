import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewMorePageRoutingModule } from './view-more-routing.module';

import { ViewMorePage } from './view-more.page';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, ViewMorePageRoutingModule],
  declarations: [ViewMorePage],
})
export class ViewMorePageModule {}
