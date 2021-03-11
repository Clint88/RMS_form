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
  selector: 'app-person-append',
  templateUrl: './person-append.page.html',
  styleUrls: ['./person-append.page.scss'],
  providers: [NavParams, FormBuilder],
})
export class PersonAppendPage implements OnInit {
  // Global Variables
  personForm: FormGroup;
  state: string;
  docId;
  docPath: string;

  constructor(
    private modalController: ModalController,
    private navParams: NavParams,
    public formBuilder: FormBuilder,
    private router: Router
  ) {
    if (this.navParams.get('docId')) {
      this.docId = this.navParams.get('docId');
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
    this.docPath = `persons/${this.docId}`;
    // Define reactive form structure
    this.personForm = this.formBuilder.group({
      code: new FormControl('', [Validators.required]),
      firstN: new FormControl('', [Validators.required]),
      middleN: new FormControl(''),
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
