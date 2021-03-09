// Core+
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

// Services
import { VehicleService } from '../services/vehicle.service';

// Models
import { Vehicle } from '../models/vehicle.model';
import { ModalController } from '@ionic/angular';

// Pages
import { ViewMorePage } from '../modals/view-more/view-more.page';

@Component({
  selector: 'app-vehicle-lookup',
  templateUrl: './vehicle-lookup.page.html',
  styleUrls: ['./vehicle-lookup.page.scss'],
})
export class VehicleLookupPage implements OnInit {
  vehicles: Observable<Vehicle[]> = this.vehicleService.vehicles$;

  constructor(
    private vehicleService: VehicleService,
    private modalController: ModalController
  ) {}

  async openInfoModal(data) {
    const type = {
      person: false,
      vehicle: true,
      incident: false,
    };
    const modal = await this.modalController.create({
      component: ViewMorePage,
      componentProps: {
        type: type,
        data: data,
      },
      cssClass: 'modal-styles',
    });

    return await modal.present();
  }

  ngOnInit() {}
}
