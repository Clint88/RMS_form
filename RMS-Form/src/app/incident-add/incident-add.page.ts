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
    this.incidentForm = this.formBuilder.group({
      iR: new FormControl('', [Validators.required]),
      occurrenceDate: new FormControl('', [Validators.required]),
      occurrenceTime: new FormControl('', [Validators.required]),
      incidentType: new FormControl('', [Validators.required]),
      location: new FormControl('', [Validators.required]),
      locationName: new FormControl('', [Validators.required]),
      officerName: new FormControl('', [Validators.required]),
      officerSerial: new FormControl('', [Validators.required]),
      domViolence: new FormControl(''),
      narrativeSec: new FormControl('', [Validators.required])
    });
  }
}
