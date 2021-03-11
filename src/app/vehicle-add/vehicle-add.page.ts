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

@Component({
  selector: 'app-vehicle-add',
  templateUrl: './vehicle-add.page.html',
  styleUrls: ['./vehicle-add.page.scss'],
  providers: [NavParams],
})
export class VehicleAddPage implements OnInit {
  // Global Variables
  vehicleForm: FormGroup;
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
    if (this.vehicleForm.status === 'VALID') {
      await this.addvehicleForm();
    } else {
      // alerts the user when not all the form fields are filled in
      console.error('All required fields were not filled out');
      this.failedAlert();
    }
  }

  async addvehicleForm() {
    // Adds the visit info collected in the form to a new document in firestore
    this.afs
      .collection('vehicles')
      .add({
        // Form Data
        vin: this.vehicleForm.controls.vin.value,
        plate: this.vehicleForm.controls.plate.value,
        plateState: this.vehicleForm.controls.plateState.value,
        color: this.vehicleForm.controls.color.value,
        make: this.vehicleForm.controls.make.value,
        model: this.vehicleForm.controls.model.value,
        year: this.vehicleForm.controls.year.value,
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

    this.vehicleForm.reset(this.vehicleForm);
    this.vehicleForm.markAsUntouched;
    this.vehicleForm.markAsPristine;

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
            this.router.navigate(['/vehicle-add']);
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
    this.vehicleForm = this.formBuilder.group({
      vin: new FormControl(''),
      plate: new FormControl('', [Validators.required]),
      plateState: new FormControl('', [Validators.required]),
      year: new FormControl('', [Validators.required]),
      make: new FormControl('', [Validators.required]),
      model: new FormControl('', [Validators.required]),
      style: new FormControl('', [Validators.required]),
      speed: new FormControl(''),
      color: new FormControl('', [Validators.required]),
    });
  }
}
