// Core+
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

// Services
import { IncidentService } from '../services/incident.service';

// Models
import { Incident } from '../models/incident.model';
import { Person } from '../models/person.model';
import { Vehicle } from '../models/vehicle.model';

// Pages
import { ViewMorePage } from '../modals/view-more/view-more.page';
import { ModalController } from '@ionic/angular';

// Searchbar
import algoliasearch from 'algoliasearch';

@Component({
  selector: 'app-incident-lookup',
  templateUrl: './incident-lookup.page.html',
  styleUrls: ['./incident-lookup.page.scss'],
})
export class IncidentLookupPage implements OnInit {
  incidents: Observable<Incident[]> = this.incidentService.incidents$;
  searchConfig;
  incidentIndex;
  personsIndex;
  vehicleIndex;
  incident: Incident;
  persons: Person;
  vehicle: Vehicle;
  searchQuery: string = '';

  constructor(
    private incidentService: IncidentService,
    private modalController: ModalController
  ) {
    this.searchConfig = algoliasearch(
      'YCWVX2WB7E',
      '8aa7153555fce678a6e3010f8b7a6eec'
    );
    this.incidentIndex = this.searchConfig.initIndex('incident');
    this.incidentIndex.search(this.searchQuery).then((data) => {
      this.incident = data.hits;
    });
    this.personsIndex = this.searchConfig.initIndex('persons');
    this.personsIndex.search(this.searchQuery).then((data) => {
      this.persons = data.hits;
    });
    this.vehicleIndex = this.searchConfig.initIndex('vehicle');
    this.vehicleIndex.search(this.searchQuery).then((data) => {
      this.vehicle = data.hits;
    });
  }

  
  

  async onSearchChange(Event) {
    this.searchQuery = Event.detail.value;
    this.personsIndex.search(this.searchQuery).then((data) => {
      this.persons = data.hits;
    });
  }


  async openInfoModal(data) {
    const type = {
      person: false,
      vehicle: false,
      incident: true,
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
