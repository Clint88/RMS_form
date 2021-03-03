// Core+
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// Models
import { Vehicle } from '../models/vehicle.model';

@Injectable({
  providedIn: 'root',
})
export class VehicleService {
  constructor(private afs: AngularFirestore) {}

  get vehicles$(): Observable<any> {
    return this.afs
      .collection<Vehicle>('vehicles')
      .snapshotChanges()
      .pipe(
        // Passes the Observable to RxJS functions. https://rxjs-dev.firebaseapp.com/api and https://www.learnrxjs.io/
        map((changes) => {
          // This will return an observable of an Array of Client Forms
          const vehicles: any = changes.map((change) => {
            const vehicle: Vehicle = {
              uid: change.payload.doc.id, // Adds the uid of the document into the object
              ...change.payload.doc.data(), // Adds properties to the object for any properties of the data object
            };
            return vehicle;
          });
          return vehicles;
        })
      );
  }
}
