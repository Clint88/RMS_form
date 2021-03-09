// Core+
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, NavParams, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-view-more',
  templateUrl: './view-more.page.html',
  styleUrls: ['./view-more.page.scss'],
  providers: [NavParams],
})
export class ViewMorePage implements OnInit {
  // Global Variables
  type = {
    person: false,
    vehicle: false,
    incident: false,
  };
  data: object;

  constructor(
    private modalController: ModalController,
    private navParams: NavParams
  ) {
    if (this.navParams.get('type')) {
      this.type = this.navParams.get('type');
    }
    if (this.navParams.get('data')) {
      this.data = this.navParams.get('data');
    }
  }

  // Closes the modal
  close(): void {
    this.modalController.dismiss();
  }

  ngOnInit() {}
}
