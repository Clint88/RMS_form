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

// Modal
import { Person } from '../models/person.model';

@Component({
  selector: 'app-person-add',
  templateUrl: './person-add.page.html',
  styleUrls: ['./person-add.page.scss'],
  providers: [NavParams],
})
export class PersonAddPage implements OnInit {
  // Global Variables
  personForm: FormGroup;
  status = { isModal: false };

  constructor(
    // Inject dependancies needed for Angular Reactive Forms
    public formBuilder: FormBuilder,
    private modalController: ModalController,
    private navParams: NavParams,
    private afs: AngularFirestore,
    private alertController: AlertController,
    private router: Router
  ) {
    if (this.navParams.get('status')) {
      this.status = this.navParams.get('status');
    }
  }

  // Submits the form to the database after completing data validation
  async submitForm() {
    // Makes sure that the "valid" property on the form is set to "VALID",
    // if it's not (meaning a required field was not filled in), it alerts the user and doesn't add the doc
    if (this.personForm.status === 'VALID') {
      await this.addpersonForm();
    } else {
      // alerts the user when not all the form fields are filled in
      console.error('All required fields were not filled out');
      this.failedAlert();
    }
  }

  async addpersonForm() {
    // Adds the visit info collected in the form to a new document in firestore
    this.afs
      .collection('persons')
      .add({
        // Form Data
        code: this.personForm.controls.code.value,
        firstN: this.personForm.controls.firstN.value,
        lastN: this.personForm.controls.lastN.value,
        middleN: this.personForm.controls.middleN.value,
        address: this.personForm.controls.address.value,
        city: this.personForm.controls.city.value,
        state: this.personForm.controls.state.value,
        zip: this.personForm.controls.zip.value,
        dob: this.personForm.controls.dob.value,
        dln: this.personForm.controls.dln.value,
        ssn: this.personForm.controls.ssn.value,
        height: this.personForm.controls.height.value,
        weight: this.personForm.controls.weight.value,
        sex: this.personForm.controls.sex.value,
        age: this.personForm.controls.age.value,
        race: this.personForm.controls.race.value,
        eyeColor: this.personForm.controls.eyeColor.value,
        hairColor: this.personForm.controls.hairColor.value,
        gang: this.personForm.controls.gang.value,
        scars: this.personForm.controls.scars.value,
        marks: this.personForm.controls.marks.value,
        tattoos: this.personForm.controls.tattoos.value,
        phone: this.personForm.controls.phone.value,
        hazard: this.personForm.controls.hazard.value,
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
        if (this.status.isModal) {
          this.close(docRef.id);
        }
      });

    this.personForm.reset(this.personForm);
    this.personForm.markAsUntouched;
    this.personForm.markAsPristine;

    console.info('Form saved!');
    if (!this.status.isModal) {
      this.successAlert();
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
            this.router.navigate(['/person-add']);
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
      age: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
      sex: new FormControl('', [Validators.required]),
      race: new FormControl('', [Validators.required]),
      eyeColor: new FormControl('', [Validators.required]),
      hairColor: new FormControl('', [Validators.required]),
      gang: new FormControl(''),
      scars: new FormControl(''),
      marks: new FormControl(''),
      tattoos: new FormControl(''),
      hazard: new FormControl(''),
    });
  }
}
