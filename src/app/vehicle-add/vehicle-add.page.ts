// Core+
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

// Reactive Forms
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-vehicle-add',
  templateUrl: './vehicle-add.page.html',
  styleUrls: ['./vehicle-add.page.scss']
})
export class VehicleAddPage implements OnInit {
  // Global Variables
  incidentAdd: boolean = false;
  vehicleAdd: boolean = false;
  personAdd: boolean = false;
  vehicleForm: FormGroup;
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

  async vehicleBtn() {
    const modal = await this.modalController.create({
      component: VehicleAddPage,
      cssClass: 'modal-styles'
    });
    return await modal.present();
  }

  ngOnInit() {
    // Define reactive form structure
    this.vehicleForm = this.formBuilder.group({
      veh: new FormControl(''),
      license: new FormControl('', [Validators.required]),
      state: new FormControl('', [Validators.required]),
      year: new FormControl('', [Validators.required]),
      make: new FormControl('', [Validators.required]),
      model: new FormControl('', [Validators.required]),
      style: new FormControl('', [Validators.required]),
      speed: new FormControl(''),
      color: new FormControl('', [Validators.required])
    });
  }
}
