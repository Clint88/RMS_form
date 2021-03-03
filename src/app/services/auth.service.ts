// Core+
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { from, Observable, of } from 'rxjs';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';

// Firebase
import firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';

// Models
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$: Observable<User>;
  currentUser: firebase.User;
  lastCommitted: any;
  myClaims: any;

  constructor(
    public afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap((user) => {
        if (!user) {
          return of(null);
        }
        if (user) {
          return this.afs
            .doc<User>(`users/${user.uid}`)
            .valueChanges()
            .pipe(
              withLatestFrom(from(user.getIdTokenResult())),
              map(([user, claimResult]) => {
                const newUser: User = {
                  ...user,
                  isUser: claimResult.claims.isUser,
                  isAdmin: claimResult.claims.isAdmin,
                  isDeleted: claimResult.claims.isDeleted,
                };
                return newUser;
              })
            );
        }
      })
    );
    afAuth.onAuthStateChanged((user) => {
      this.currentUser = user;
      if (user) {
        this.listenToClaims();
      }
    });
    // Calls a diagnostic function for testing
    afAuth.onIdTokenChanged((user) => {
      if (user) {
        this.currentUser = user;
        // this.reportAdminStatus();
      }
    });
  }

  listenToClaims() {
    this.afs
      .collection('userClaims')
      .doc(this.currentUser.uid)
      .snapshotChanges()
      .subscribe((snapshot) => {
        const data: any = snapshot.payload.data();

        if (data && data._lastCommitted) {
          if (
            this.lastCommitted &&
            !data._lastCommitted.isEqual(this.lastCommitted)
          ) {
            this.currentUser.getIdToken(true);
          }
        }
      });
  }

  // Diagnostic function for testing
  async reportAdminStatus() {
    const result = await this.currentUser.getIdTokenResult();
    const isUser = result.claims.isUser;
    const isAdmin = result.claims.isAdmin;
    const isDeleted = result.claims.isDeleted;

    console.info(isUser ? 'User is a User' : 'User is not a User');
    console.info(isAdmin ? 'User is an Admin' : 'User is not an Admin');
    console.info(isDeleted ? 'User is Deleted' : 'User is not Deleted');
  }

  async googleSignin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    const credential: firebase.auth.UserCredential = await this.afAuth.signInWithPopup(
      provider
    );
    return this.updateUserData(credential);
  }

  private updateUserData(credential: firebase.auth.UserCredential) {
    const user: firebase.User = credential.user;
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(
      `users/${user.uid}`
    );

    let data: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
    };
    if (credential.additionalUserInfo.isNewUser) {
      userRef.set(data, { merge: true });
      return this.signOut();
    }

    return userRef.set(data, { merge: true });
  }

  async signOut() {
    await this.afAuth.signOut();
    console.log(localStorage.getItem('user'));
    localStorage.removeItem('user');
    this.router.navigate(['/']);
  }
}
