// Core+
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

// Services
import { PersonService } from '../services/person.service';

// Models
import { Person } from '../models/person.model';

@Component({
  selector: 'app-person-lookup',
  templateUrl: './person-lookup.page.html',
  styleUrls: ['./person-lookup.page.scss'],
})
export class PersonLookupPage implements OnInit {
  persons: Observable<Person[]> = this.personService.persons$;

  constructor(private personService: PersonService) {}

  ngOnInit() {}
}
