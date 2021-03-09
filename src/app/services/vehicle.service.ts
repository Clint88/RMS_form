// Core+
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// Models
import { Vehicle } from '../models/vehicle.model';

@Injectable({
  providedIn: 'root',
})
export class VehicleService {
  filteredVehiclesSubject: BehaviorSubject<any> = new BehaviorSubject(null);
  vehicleSnapshot$: Observable<any> = this.afs
    .collection<Vehicle>('vehicles')
    .snapshotChanges();
  filteredVehicles$: Observable<any> = this.filteredVehiclesSubject.asObservable();
  completeFilteredVehicles$: Observable<any> = combineLatest([
    this.vehicleSnapshot$,
    this.filteredVehicles$,
  ]);

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

  setLinkedVehicles(appendResults) {
    this.filteredVehiclesSubject.next(appendResults);
  }

  get appendVehicles$(): Observable<any> {
    return this.completeFilteredVehicles$.pipe(
      map(([vehicleSnapshotChanges, filteredVehicles]) => {
        let filteredVehicleIds = {};

        if (filteredVehicles) {
          filteredVehicles.map((filteredVehicle) => {
            filteredVehicleIds[filteredVehicle] = true;
          });
        }

        const searchDictionary = Object.assign({}, filteredVehicleIds);

        const clientForms: Vehicle[] = vehicleSnapshotChanges
          .filter((change) => {
            return searchDictionary[change.payload.doc.id];
          })
          .map((change) => {
            const clientForm: Vehicle = {
              uid: change.payload.doc.id, // Adds the uid of the document into the object
              ...change.payload.doc.data(), // Adds properties to the object for any properties of the data object
            };
            return clientForm;
          });
        return clientForms;
      })
    );
  }

  appendVehicles2$(vehicleIds: Array<string>): Observable<any> {
    return this.afs
      .collection<Vehicle>('vehicles')
      .snapshotChanges()
      .pipe(
        // Passes the Observable to RxJS functions. https://rxjs-dev.firebaseapp.com/api and https://www.learnrxjs.io/
        map(
          (changes) =>
            changes.filter((change) => {
              change.payload.doc.id === vehicleIds[0];
            })
          // {
          //   // This will return an observable of an Array of Client Forms
          //   const vehicles: any = changes.map((change) => {
          //     const vehicle: Vehicle = {
          //       uid: change.payload.doc.id, // Adds the uid of the document into the object
          //       ...change.payload.doc.data(), // Adds properties to the object for any properties of the data object
          //     };
          //     return vehicle;
          //   });
          //   return vehicles;
          // }
        )
      );
  }
}
