// Core+
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// Models
import { Person } from '../models/person.model';

@Injectable({
  providedIn: 'root',
})
export class PersonService {
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
}
