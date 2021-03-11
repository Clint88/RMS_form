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
  selector: 'app-incident-append',
  templateUrl: './incident-append.page.html',
  styleUrls: ['./incident-append.page.scss'],
  providers: [NavParams, FormBuilder],
})
export class IncidentAppendPage implements OnInit {
  // Global Variables
  incidentForm: FormGroup;
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
    this.docPath = `incidents/${this.docId}`;
    // Define reactive form structure
    this.incidentForm = this.formBuilder.group({
      occurrenceDate: new FormControl('', [Validators.required]),
      occurrenceTime: new FormControl('', [Validators.required]),
      incidentType: new FormControl('', [Validators.required]),
      location: new FormControl(''),
      locationName: new FormControl(''),
      officerName: new FormControl('', [Validators.required]),
      domViolence: new FormControl(''),
      narrativeSec: new FormControl('', [Validators.required]),
    });
  }
}
