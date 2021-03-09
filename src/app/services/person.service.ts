// Core+
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// Models
import { Person } from '../models/person.model';

@Injectable({
  providedIn: 'root',
})
export class PersonService {
  filteredPersonsSubject: BehaviorSubject<any> = new BehaviorSubject(null);
  personSnapshot$: Observable<any> = this.afs
    .collection<Person>('persons')
    .snapshotChanges();
  filteredPersons$: Observable<any> = this.filteredPersonsSubject.asObservable();
  completeFilteredPersons$: Observable<any> = combineLatest([
    this.personSnapshot$,
    this.filteredPersons$,
  ]);

  constructor(private afs: AngularFirestore) {}

  get persons$(): Observable<any> {
    return this.afs
      .collection<Person>('persons')
      .snapshotChanges()
      .pipe(
        // Passes the Observable to RxJS functions. https://rxjs-dev.firebaseapp.com/api and https://www.learnrxjs.io/
        map((changes) => {
          // This will return an observable of an Array of Client Forms
          const persons: any = changes.map((change) => {
            const person: Person = {
              uid: change.payload.doc.id, // Adds the uid of the document into the object
              ...change.payload.doc.data(), // Adds properties to the object for any properties of the data object
            };
            return person;
          });
          return persons;
        })
      );
  }

  setLinkedPersons(appendResults) {
    this.filteredPersonsSubject.next(appendResults);
  }

  get appendPersons$(): Observable<Person[]> {
    return this.completeFilteredPersons$.pipe(
      map(([personSnapshotChanges, filteredPersons]) => {
        let filteredPersonIds = {};

        if (filteredPersons) {
          filteredPersons.map((filteredPerson) => {
            filteredPersonIds[filteredPerson] = true;
          });
        }

        const searchDictionary = Object.assign({}, filteredPersonIds);

        const personForms: Person[] = personSnapshotChanges
          .filter((change) => {
            return searchDictionary[change.payload.doc.id];
          })
          .map((change) => {
            const personForm: Person = {
              // Adds the uid of the document into the object
              uid: change.payload.doc.id,
              // Adds properties to the object for any properties of the data object
              ...change.payload.doc.data(),
            };
            return personForm;
          });
        return personForms;
      })
    );
  }
}
