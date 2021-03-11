import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController, NavParams } from '@ionic/angular';

// Models
import { Vehicle } from 'src/app/models/vehicle.model';

// Services
import { VehicleService } from 'src/app/services/vehicle.service';

@Component({
  selector: 'app-vehicle-append',
  templateUrl: './vehicle-append.page.html',
  styleUrls: ['./vehicle-append.page.scss'],
  providers: [NavParams],
})
export class VehicleAppendPage implements OnInit {
  data;
  source;

  constructor(
    private modalController: ModalController,
    private navParams: NavParams,
    private alertController: AlertController,
    private router: Router
  ) {
    if (this.navParams.get('source')) {
      this.source = this.navParams.get('source');
    }
    if (this.navParams.get('data')) {
      this.data = this.navParams.get('data');
    }
  }

  // Closes the modal
  close(): void {
    this.modalController.dismiss();
  }

  async openPrompt() {
    console.log('made it');
    const alert = await this.alertController.create({
      header: 'Add a Report',
      message: 'What kind of report would you like to add?',
      buttons: [
        {
          text: 'Person',
          handler: () => {
            this.router.navigate(['/person-append']);
          },
        },
        {
          text: 'Vehicle',
          handler: () => {
            this.router.navigate(['/vehicle-append']);
          },
        },
        {
          text: 'Incident',
          handler: () => {
            this.router.navigate(['/incident-append']);
          },
        },
        {
          text: 'Cancel',
          handler: () => {
            this.close();
          },
        },
      ],
    });

    await alert.present();
  }

  ngOnInit() {
    if (!this.data) {
      console.error('Error 05: Page was loaded without Modal Context');
      this.router.navigate(['/home']);
      return;
    }
    this.openPrompt();
  }
}
