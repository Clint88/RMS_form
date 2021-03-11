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

// Searchbar
import algoliasearch from 'algoliasearch';

@Component({
  selector: 'app-vehicle-lookup',
  templateUrl: './vehicle-lookup.page.html',
  styleUrls: ['./vehicle-lookup.page.scss'],
})
export class VehicleLookupPage implements OnInit {
  vehicles: Observable<Vehicle[]> = this.vehicleService.vehicles$;
  searchConfig;
  vehicleIndex;
  vehicle: Vehicle;
  searchQuery: string = '';

  constructor(
    private vehicleService: VehicleService,
    private modalController: ModalController
  ) {
    this.searchConfig = algoliasearch(
      'YCWVX2WB7E',
      '8aa7153555fce678a6e3010f8b7a6eec'
    );
    this.vehicleIndex = this.searchConfig.initIndex('vehicles');
    this.vehicleIndex.search(this.searchQuery).then((data) => {
      this.vehicle = data.hits;
    });
  }

  async onSearchChange(event) {
    this.searchQuery = event.detail.value;
    this.vehicleIndex.search(this.searchQuery).then((data) => {
      this.vehicle = data.hits;
    });
  }

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
