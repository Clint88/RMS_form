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

// Searchbar
import algoliasearch from 'algoliasearch';

@Component({
  selector: 'app-person-lookup',
  templateUrl: './person-lookup.page.html',
  styleUrls: ['./person-lookup.page.scss'],
})
export class PersonLookupPage implements OnInit {
  persons: Observable<Person[]> = this.personService.persons$;
  searchConfig;
  personsIndex;
  person: Person;
  searchQuery: string = '';

  constructor(
    private personService: PersonService,
    private modalController: ModalController
  ) {
    this.searchConfig = algoliasearch(
      'U05K5PJPG3',
      '1532baaf40772552ff1fbd6f65364cb3'
    );
    this.personsIndex = this.searchConfig.initIndex('person');
    this.personsIndex.search(this.searchQuery).then((data) => {
      this.person = data.hits;
    });
  }

  async onSearchChange(event) {
    this.searchQuery = event.detail.value;
    this.personsIndex.search(this.searchQuery).then((data) => {
      this.persons = data.hits;
    });
  }

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

  async openAppendModal(data) {
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
