// Core+
import { Component, OnInit } from '@angular/core';

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
    public formBuilder: FormBuilder
  ) {}

  // Submits the form to the database after completing data validation
  submitForm() {
    // 1. Validate form data
    // 2. Submit to database
    const formData: Object = {};
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
