import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-vehicle-append',
  templateUrl: './vehicle-append.page.html',
  styleUrls: ['./vehicle-append.page.scss'],
  providers: [NavParams, FormBuilder],
})
export class VehicleAppendPage implements OnInit {
  // Global Variables
  vehicleForm: FormGroup;
  state: string;
  docId;
  docPath: string;

  constructor(
    private modalController: ModalController,
    private navParams: NavParams,
    public formBuilder: FormBuilder,
    private router: Router
  ) {
    console.log(this.docId);
    this.docId = this.navParams.get('docId');
    console.log(this.docId);
    if (this.navParams.get('docId')) {
      this.docId = this.navParams.get('docId');
      console.log(this.docId);
      this.docPath = `vehicles/${this.docId}`;
    }
  }

  changeHandler(e) {
    this.state = e;
    console.log(this.state);
  }

  // Closes the modal
  close(): void {
    this.modalController.dismiss();
  }

  ngOnInit() {
    if (!this.docId) {
      console.error('Error 05: Page was loaded without Modal Context');
      this.router.navigate(['/home']);
      return;
    }
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
