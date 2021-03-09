// Core+
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, NavParams, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-view-more',
  templateUrl: './view-more.page.html',
  styleUrls: ['./view-more.page.scss'],
})
export class ViewMorePage implements OnInit {
  // Global Variables
  type = {
    person: false,
    vehicle: false,
    incident: false,
  };

  constructor(
    private modalController: ModalController,
    private navParams: NavParams,
    private alertController: AlertController,
    private router: Router
  ) {
    if (this.navParams.get('type')) {
      this.type = this.navParams.get('type');
    }
  }

  // Closes the modal
  close(): void {
    this.modalController.dismiss();
  }

  ngOnInit() {}
}
