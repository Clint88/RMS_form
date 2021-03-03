// Core+
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PersonAddPage } from '../person-add/person-add.page';
import { VehicleAddPage } from '../vehicle-add/vehicle-add.page';

// Reactive Forms
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-incident-add',
  templateUrl: './incident-add.page.html',
  styleUrls: ['./incident-add.page.scss']
})
export class IncidentAddPage implements OnInit {
  // Global Variables
  incidentAdd: boolean = false;
  vehicleAdd: boolean = false;
  personAdd: boolean = false;
  incidentForm: FormGroup;
  constructor(
    // Inject dependancies needed for Angular Reactive Forms
    public formBuilder: FormBuilder,
    private modalController: ModalController
  ) {}

  // Submits the form to the database after completing data validation
  submitForm() {
    // 1. Validate form data
    // 2. Submit to database
    const formData: Object = {};
  }

  async incidentBtn() {
    const modal = await this.modalController.create({
      component: IncidentAddPage,
      cssClass: 'modal-styles'
    });
    return await modal.present();
  }
  async personBtn() {
    const modal = await this.modalController.create({
      component: PersonAddPage,
      cssClass: 'modal-styles'
    });
    return await modal.present();
  }
  async vehicleBtn() {
    const modal = await this.modalController.create({
      component: VehicleAddPage,
      cssClass: 'modal-styles'
    });
    return await modal.present();
  }

  ngOnInit() {
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
      narrativeSec: new FormControl('', [Validators.required])
    });
  }
}
