import { Component, OnInit } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { NavParams, ModalController, AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Incident } from 'src/app/models/incident.model';
import { Person } from 'src/app/models/person.model';
import { Vehicle } from 'src/app/models/vehicle.model';
import { IncidentService } from 'src/app/services/incident.service';
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
    incident: false,
  };
  data;
  afsRef: AngularFirestoreCollection<any>;

  // Database refs
  persons: Observable<Person[]> = this.personService.persons$;
  vehicles: Observable<Vehicle[]> = this.vehicleService.vehicles$;
  incidents: Observable<Incident[]> = this.incidentService.incidents$;

  constructor(
    private personService: PersonService,
    private vehicleService: VehicleService,
    private incidentService: IncidentService,
    private afs: AngularFirestore,
    private modalController: ModalController,
    private alertController: AlertController,
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
  close(docRef?: string): void {
    if (docRef) {
      if (this.type.person) {
        this.afsRef = this.afs.collection('persons');
      }
      if (this.type.vehicle) {
        this.afsRef = this.afs.collection('vehicles');
      }
      if (this.type.incident) {
        this.afsRef = this.afs.collection('incidents');
      }
      this.afsRef
        .doc(this.data.uid)
        .get()
        .subscribe((doc) => {
          if (this.type.incident) {
            doc.data().persons;
          }
        });
    } else {
      this.modalController.dismiss();
    }
  }

  async ngOnInit() {
    if (!this.data) {
      console.error('Error 05: Page was loaded without Modal Context');
      this.router.navigate(['/home']);
      return;
    }
  }
}
