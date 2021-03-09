// Core+
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

// Services
import { PersonService } from '../services/person.service';

// Models
import { Person } from '../models/person.model';

// Pages
import { ViewMorePage } from '../modals/view-more/view-more.page';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-person-lookup',
  templateUrl: './person-lookup.page.html',
  styleUrls: ['./person-lookup.page.scss'],
})
export class PersonLookupPage implements OnInit {
  persons: Observable<Person[]> = this.personService.persons$;

  constructor(
    private personService: PersonService,
    private modalController: ModalController
  ) {}

  async openInfoModal(data) {
    const type = {
      person: true,
      vehicle: false,
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
