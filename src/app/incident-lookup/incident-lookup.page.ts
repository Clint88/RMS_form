// Core+
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

// Services
import { IncidentService } from '../services/incident.service';

// Models
import { Incident } from '../models/incident.model';

@Component({
  selector: 'app-incident-lookup',
  templateUrl: './incident-lookup.page.html',
  styleUrls: ['./incident-lookup.page.scss'],
})
export class IncidentLookupPage implements OnInit {
  incidents: Observable<Incident[]> = this.incidentService.incidents$;

  constructor(private incidentService: IncidentService) {}

  ngOnInit() {}
}
