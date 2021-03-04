// Core+
import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';

// Reactive Forms
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';

// Services
import { AuthService } from '../services/auth.service';
import { Person } from '../models/person.model';

@Component({
  selector: 'app-person-add',
  templateUrl: './person-add.page.html',
  styleUrls: ['./person-add.page.scss']
})
export class PersonAddPage implements OnInit {
  // Global Variables
  personAdd: boolean = false;
  personForm: FormGroup;

  constructor(
    // Inject dependancies needed for Angular Reactive Forms
    public formBuilder: FormBuilder,
    private modalController: ModalController,
    private afs: AngularFirestore,
    private auth: AuthService,
    private alertController: AlertController,
    private router: Router
  ) {}

  // Submits the form to the database after completing data validation
  async submitForm() {
    // Makes sure that the "valid" property on the form is set to "VALID",
    // if it's not (meaning a required field was not filled in), it alerts the user and doesn't add the doc
    if (this.personForm.status === 'VALID') {
      if (this.personForm.status === 'VALID') {
        // Submit Data to the firestore if the form is valid
        await this.addpersonForm();
      } else {
        // alerts the user when not all the form fields are filled in
        console.error('All required fields were not filled out');
        this.failedAlert();
      }
    } else {
      // alerts the user when not all the form fields are filled in
      console.error('All required fields were not filled out');
      this.failedAlert();
    }
  }

  async personBtn() {
    const modal = await this.modalController.create({
      component: PersonAddPage,
      cssClass: 'modal-styles'
    });
    return await modal.present();
  }

  async addpersonForm() {
    // Adds the visit info collected in the form to a new document in firestore
    this.afs
      .collection('persons')
      .add({
        // Injected Properties
        // Form Data
        // vin: this.personForm.controls.vin.value,
        // plate: this.personForm.controls.plate.value,
        // plateState: this.personForm.controls.plateState.value,
        // color: this.personForm.controls.color.value,
        // make: this.personForm.controls.make.value,
        // model: this.personForm.controls.model.value,
        // year: this.personForm.controls.year.value
      })
      // Any actions which must be done to the document that require info about the document go here
      .then(async docRef => {
        // Sets the reportId to the proper formatted ID as defined in the data model diagrams
        docRef.set(
          {
            reportId: `${new Date().getFullYear()}-${docRef.id}`
          },
          { merge: true }
        );
      });

    this.personForm.reset(this.personForm);
    this.personForm.markAsUntouched;
    this.personForm.markAsPristine;

    console.info('Form saved!');
    this.successAlert();
  }

  async failedAlert() {
    const alert = await this.alertController.create({
      header: 'All required fields were not filled out',
      message: 'Please fill out all fields!',
      buttons: ['Ok']
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
            this.router.navigate(['/person-add']);
          }
        },
        {
          text: 'No',
          handler: () => {
            this.router.navigate(['/home']);
          }
        }
      ]
    });

    await alert.present();
  }

  ngOnInit() {
    // Define reactive form structure
    this.personForm = this.formBuilder.group({
      code: new FormControl('', [Validators.required]),
      firstN: new FormControl('', [Validators.required]),
      middleN: new FormControl('', [Validators.required]),
      lastN: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      state: new FormControl('', [Validators.required]),
      zip: new FormControl('', [Validators.required]),
      dob: new FormControl('', [Validators.required]),
      ssn: new FormControl('', [Validators.required]),
      dln: new FormControl('', [Validators.required]),
      height: new FormControl('', [Validators.required]),
      weight: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
      sex: new FormControl('', [Validators.required]),
      race: new FormControl('', [Validators.required]),
      eyeColor: new FormControl('', [Validators.required]),
      gang: new FormControl('', [Validators.required]),
      mst: new FormControl('', [Validators.required]),
      hazard: new FormControl('', [Validators.required])
    });
  }
}
