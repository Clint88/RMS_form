// Core+
import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, NavParams } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';

// Reactive Forms
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';

// Pages
import { PersonAddPage } from '../person-add/person-add.page';
import { VehicleAddPage } from '../vehicle-add/vehicle-add.page';

// Services
import { AuthService } from '../services/auth.service';
import { VehicleService } from '../services/vehicle.service';
import { PersonService } from '../services/person.service';

// Models
import { Incident } from '../models/incident.model';

@Component({
  selector: 'app-incident-add',
  templateUrl: './incident-add.page.html',
  styleUrls: ['./incident-add.page.scss'],
})
export class IncidentAddPage implements OnInit {
  constructor(
    // Inject dependancies needed for Angular Reactive Forms
    public formBuilder: FormBuilder,
    private afs: AngularFirestore,
    // Custom Services
    private auth: AuthService,
    private vehicleService: VehicleService,
    private personService: PersonService,
    // Controllers and routers
    private alertController: AlertController,
    private modalController: ModalController,
    private router: Router
  ) {}

  // Global Variables
  incidentAdd: boolean = false;
  vehicleAdd: boolean = false;
  personAdd: boolean = false;
  incidentForm: FormGroup;
  persons: Array<string> = [];
  vehicles: Array<string> = [];
  appendVehicles = this.vehicleService.appendVehicles$;
  appendPersons = this.personService.appendPersons$;

  // Submits the form to the database after completing data validation
  async submitForm() {
    // Makes sure that the "valid" property on the form is set to "VALID",
    // if it's not (meaning a required field was not filled in), it alerts the user and doesn't add the doc
    if (this.incidentForm.status === 'VALID') {
      await this.addincidentForm();
    } else {
      // alerts the user when not all the form fields are filled in
      console.error('All required fields were not filled out');
      this.failedAlert();
    }
  }

  async incidentBtn() {
    const modal = await this.modalController.create({
      component: IncidentAddPage,
      cssClass: 'modal-styles',
    });
    return await modal.present();
  }
  async personBtn() {
    const status = { isModal: true };
    const modal = await this.modalController.create({
      component: PersonAddPage,
      componentProps: { status: status },
      cssClass: 'modal-styles',
    });

    modal.onDidDismiss().then(async (data) => {
      const personId = data['data'];
      await this.persons.push(personId); // Here's your vehicle
      await this.personService.setLinkedPersons(this.persons);
    });

    return await modal.present();
  }
  async vehicleBtn() {
    const status = { isModal: true };
    const modal = await this.modalController.create({
      component: VehicleAddPage,
      componentProps: { status: status },
      cssClass: 'modal-styles',
    });

    modal.onDidDismiss().then(async (data) => {
      const vehicleId = data['data'];
      await this.vehicles.push(vehicleId); // Here's your vehicle
      await this.vehicleService.setLinkedVehicles(this.vehicles);
    });

    return await modal.present();
  }

  async addincidentForm() {
    // Adds the visit info collected in the form to a new document in firestore
    this.afs
      .collection('incidents')
      .add({
        // Injected Properties
        creatorUid: this.auth.currentUser.uid,
        officerName: this.auth.currentUser.displayName,
        officerId: `WMLPS-${this.auth.currentUser.uid}`,

        // Form Data
        codeName: this.incidentForm.controls.incidentType.value,
        location: this.incidentForm.controls.location.value,
        commonLocation: this.incidentForm.controls.locationName.value,
        narrative: this.incidentForm.controls.narrativeSec.value,

        occurrenceDate: this.incidentForm.controls.occurrenceDate.value,
        occurrenceTime: this.incidentForm.controls.occurrenceTime.value,
        domViolence: this.incidentForm.controls.domViolence.value,
      })
      // Any actions which must be done to the document that require info about the document go here
      .then(async (docRef) => {
        // Sets the reportId to the proper formatted ID as defined in the data model diagrams
        docRef.set(
          {
            reportId: `${new Date().getFullYear()}-${docRef.id}`,
          },
          { merge: true }
        );

        // Add in any persons or vehicles
        const incidentDoc = this.afs.collection('incidents').doc(docRef.id);
        await incidentDoc.ref
          .get()
          .then(
            (doc: firebase.default.firestore.DocumentSnapshot<Incident>) => {
              // Check to see if there are pre-existing linked docs
              if (doc.data().persons) {
                // Storage for person arrays
                const existingPersons: Array<string> = doc.data().persons;

                // Send updated array to the document
                docRef.set(
                  {
                    persons: existingPersons.concat(this.persons),
                  },
                  { merge: true }
                );
              } else {
                // Send new array only to the document
                docRef.set(
                  {
                    persons: this.persons,
                  },
                  { merge: true }
                );
              }

              // Check to see if there are pre-existing linked docs
              if (doc.data().vehicles) {
                // Storage for vehicle arrays
                const existingVehicles: Array<string> = doc.data().vehicles;

                // Send updated array to the document
                docRef.set(
                  {
                    vehicles: existingVehicles.concat(this.vehicles),
                  },
                  { merge: true }
                );
              } else {
                // Send new array only to the document
                docRef.set(
                  {
                    vehicles: this.vehicles,
                  },
                  { merge: true }
                );
              }
            }
          );
      });

    this.incidentForm.reset(this.incidentForm);
    this.incidentForm.markAsUntouched;
    this.incidentForm.markAsPristine;

    console.info('Form saved!');
    this.successAlert();
  }

  async failedAlert() {
    const alert = await this.alertController.create({
      header: 'All required fields were not filled out',
      message: 'Please fill out all fields!',
      buttons: ['Ok'],
    });

    await alert.present();
  }

  async successAlert() {
    const alert = await this.alertController.create({
      header: 'Form Saved!',
      message: 'Fill Out Another form?',
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            this.router.navigate(['/incident-add']);
            location.reload();
          },
        },
        {
          text: 'No',
          handler: () => {
            this.router.navigate(['/home']);
          },
        },
      ],
    });

    await alert.present();
  }

  async ngOnInit() {
    // Define reactive form structure
    this.incidentForm = this.formBuilder.group({
      iR: new FormControl('', [Validators.required]),
      occurrenceDate: new FormControl('', [Validators.required]),
      occurrenceTime: new FormControl('', [Validators.required]),
      incidentType: new FormControl('', [Validators.required]),
      location: new FormControl(''),
      locationName: new FormControl(''),
      officerName: new FormControl('', [Validators.required]),
      officerSerial: new FormControl('', [Validators.required]),
      domViolence: new FormControl(''),
      narrativeSec: new FormControl('', [Validators.required]),
    });
  }
}
