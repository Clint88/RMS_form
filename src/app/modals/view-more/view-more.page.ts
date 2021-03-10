// Core+
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, NavParams } from '@ionic/angular';
import { Observable } from 'rxjs';

// Models
import { Person } from 'src/app/models/person.model';
import { Vehicle } from 'src/app/models/vehicle.model';

// Services
import { PersonService } from 'src/app/services/person.service';
import { VehicleService } from 'src/app/services/vehicle.service';

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
  data;

  // Incident Report Additional Info
  persons: Observable<Person[]> = this.personService.appendPersons$;
  vehicles: Observable<Vehicle[]> = this.vehicleService.appendVehicles$;

  constructor(
    private vehicleService: VehicleService,
    private personService: PersonService,
    private modalController: ModalController,
    private navParams: NavParams,
    private router: Router
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

  async ngOnInit() {
    if (!this.data) {
      console.error('Error 05: Page was loaded without Modal Context');
      this.router.navigate(['/home']);
    }
    await this.personService.setLinkedPersons(this.data.persons);
    await this.vehicleService.setLinkedVehicles(this.data.vehicles);
  }
}
