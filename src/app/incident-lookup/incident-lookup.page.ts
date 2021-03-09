// Core+
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

// Services
import { IncidentService } from '../services/incident.service';

// Models
import { Incident } from '../models/incident.model';

// Pages
import { ViewMorePage } from '../modals/view-more/view-more.page';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-incident-lookup',
  templateUrl: './incident-lookup.page.html',
  styleUrls: ['./incident-lookup.page.scss'],
})
export class IncidentLookupPage implements OnInit {
  incidents: Observable<Incident[]> = this.incidentService.incidents$;

  constructor(
    private incidentService: IncidentService,
    private modalController: ModalController
  ) {}

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
