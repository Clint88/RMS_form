import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-incident-add',
  templateUrl: './incident-add.page.html',
  styleUrls: ['./incident-add.page.scss']
})
export class IncidentAddPage implements OnInit {
  incidentAdd: boolean = false;
  constructor() {}

  enableForm() {
    console.log('test line 13');
    this.incidentAdd === true;
  }

  ngOnInit() {}
}
