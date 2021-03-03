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
  selector: 'app-person-add',
  templateUrl: './person-add.page.html',
  styleUrls: ['./person-add.page.scss'],
})
export class PersonAddPage implements OnInit {
 // Global Variables
 incidentAdd: boolean = false;
 vehicleAdd: boolean = false;
 personAdd: boolean = false;
 personForm: FormGroup;
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
   this.personForm = this.formBuilder.group({
     zip: new FormControl('', [Validators.required]),
     ssn: new FormControl('', [Validators.required]),
     lisence: new FormControl('', [Validators.required]),
     height: new FormControl('', [Validators.required]),
     weight: new FormControl('', [Validators.required]),
     phone: new FormControl('', [Validators.required]),
     gender: new FormControl('', [Validators.required]),
     race: new FormControl('', [Validators.required]),
     eye: new FormControl('', [Validators.required]),
     hair: new FormControl('', [Validators.required]),
     marks: new FormControl('', [Validators.required]),
     hazard: new FormControl('', [Validators.required]),
     code: new FormControl('', [Validators.required]),
     first: new FormControl('', [Validators.required]),
     middle: new FormControl('', [Validators.required]),
     last: new FormControl('', [Validators.required]),
     address: new FormControl('', [Validators.required]),
     city: new FormControl('', [Validators.required]),
     state: new FormControl('', [Validators.required])
   });
 }
}
