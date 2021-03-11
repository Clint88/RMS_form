import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavParams, ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Person } from 'src/app/models/person.model';
import { Vehicle } from 'src/app/models/vehicle.model';
import { PersonService } from 'src/app/services/person.service';
import { VehicleService } from 'src/app/services/vehicle.service';

@Component({
  selector: 'app-append-report',
  templateUrl: './append-report.page.html',
  styleUrls: ['./append-report.page.scss'],
  providers: [NavParams],
})
export class AppendReportPage implements OnInit {
  // Global Variables
  type = {
    person: false,
    vehicle: false,
  };

  // Database refs
  persons: Observable<Person[]> = this.personService.persons$;
  vehicles: Observable<Vehicle[]> = this.vehicleService.vehicles$;

  constructor(
    private personService: PersonService,
    private vehicleService: VehicleService,
    private modalController: ModalController,
    private navParams: NavParams,
    private router: Router
  ) {
    if (this.navParams.get('type')) {
      this.type = this.navParams.get('type');
    }
  }

  // Closes the modal
  close(docId?: string): void {
    if (docId) {
      this.modalController.dismiss(docId);
    } else {
      this.modalController.dismiss();
    }
  }

  async ngOnInit() {
    if (!this.type.person && !this.type.vehicle) {
      console.error('Error 05: Page was loaded without Modal Context');
      this.router.navigate(['/home']);
      return;
    }
  }
}
