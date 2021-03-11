import {
  Directive,
  Input,
  Output,
  EventEmitter,
  HostListener,
} from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { tap, take } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';

@Directive({
  selector: '[appUpdateIncident]',
})
export class UpdateIncidentDirective {
  @Input() path: string;
  @Input() formGroup: FormGroup;

  private _state: 'loading' | 'synced' | 'modified' | 'error';

  @Output() stateChange = new EventEmitter<string>();
  @Output() formError = new EventEmitter<string>();

  private docRef: AngularFirestoreDocument;

  constructor(private afs: AngularFirestore) {}

  ngOnInit() {
    this.preloadData();
  }

  set state(val) {
    this._state = val;
    this.stateChange.emit(val);
  }

  async setDoc() {
    try {
      await this.docRef.set(this.formGroup.value, { merge: true });
      this.state = 'synced';
    } catch (err) {
      console.log(err);
      this.formError.emit(err.message);
      this.state = 'error';
    }
  }

  preloadData() {
    this.state = 'loading';
    this.docRef = this.getDocRef(this.path);
    this.docRef
      .valueChanges()
      .pipe(
        tap((doc) => {
          if (doc) {
            this.formGroup.patchValue(doc);
            this.formGroup.markAsPristine();
            this.state = 'synced';
          }
        }),
        take(1)
      )
      .subscribe();
  }

  @HostListener('ngSubmit', ['$event'])
  onSubmit(e) {
    console.log('EVENT', e);
    this.setDoc();
  }

  getDocRef(path: string): any {
    if (path.split('/').length % 2) {
      return this.afs.doc(`${path}/${this.afs.createId()}`);
    } else {
      return this.afs.doc(path);
    }
  }
}
