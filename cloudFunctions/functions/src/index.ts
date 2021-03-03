import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { deleteDoc, getUserData } from './microFunctions';

admin.initializeApp();
const auth = admin.auth();

interface ClaimsDocumentData extends admin.firestore.DocumentData {
  _lastCommitted?: admin.firestore.Timestamp;
}

// mirrorCustomClaims
export const mirrorCustomClaims = functions.firestore
  .document('userClaims/{uid}')
  .onWrite(async (change, context) => {
    const beforeData: ClaimsDocumentData = change.before.data() || {};
    const afterData: ClaimsDocumentData = change.after.data() || {};
    const skipUpdate =
      beforeData._lastCommitted &&
      afterData._lastCommitted &&
      !beforeData._lastCommitted.isEqual(afterData._lastCommitted);

    if (skipUpdate) {
      console.log('No Changes');
      return;
    }

    if (!afterData || afterData === null) {
      console.log(`Can't run for deleted user`);
      return;
    }

    const { _lastCommitted, ...newClaims } = afterData;
    const stringifyClaims = JSON.stringify(newClaims);

    if (stringifyClaims.length > 1000) {
      console.error(
        'New custom claims object string greater than 1000 chars',
        stringifyClaims
      );
      return;
    }

    const uid = context.params.uid;
    console.log(`setting custom claims for ${uid}`, newClaims);

    await auth.setCustomUserClaims(uid, newClaims);
    console.log('Updating document timestamp');

    await change.after.ref.update({
      _lastCommitted: admin.firestore.FieldValue.serverTimestamp(),
      ...newClaims,
    });
  });

// setIsStudent
export const setIsStudent = functions.firestore
  .document('users/{uid}')
  .onCreate(async (change, context) => {
    // User Info
    const uid = context.params.uid;
    const userDocRef = admin.firestore().collection('users').doc(uid);
    const userData: any = await getUserData(uid);
    // Email formatting
    const emailDomain = userData.email.split('@');
    const emailSuffix = emailDomain[1].toLowerCase();
    // Sets boolean status of constant to true if email address domain is valid, and false if not
    const goodUser: boolean =
      emailSuffix === 'west-mec.org' || emailSuffix === 'west-mec.edu';
    console.log(
      `emailDomain: ${emailDomain}, emailSuffix: ${emailSuffix}, goodUser: ${goodUser}`
    );

    // Sets the isStudent claim status for the new user depending on whether the user used a west-mec email
    console.log(`Setting isUser to ${goodUser}`);
    await admin.firestore().collection('userClaims').doc(uid).set(
      {
        isUser: goodUser,
        isAdmin: false,
        isDeleted: false,
      },
      { merge: true }
    );

    // Adds some default properties to the user's document when it's created
    console.log(
      `Setting Default Perams for user ${userData.displayName} (${uid})`
    );
    await userDocRef.set(
      {
        email: userData.email,
        displayName: userData.displayName,
      },
      { merge: true }
    );
  });

// userDeletionMonitor
export const userDeletionMonitor = functions.firestore
  .document('users/{usersId}')
  .onWrite(async (change, context) => {
    const beforeData: ClaimsDocumentData = change.before.data() || {};
    const afterData: ClaimsDocumentData = change.after.data() || {};

    const targetUid = beforeData.uid;

    if (!targetUid || targetUid === '') {
      return;
    }

    if (beforeData.uid === afterData.uid) {
      console.log('No changes detected, exiting');
      return;
    }

    await admin
      .auth()
      .deleteUser(targetUid)
      .then(function () {
        console.log(`Successfully deleted user: ${targetUid}`);
      })
      .catch(function (error) {
        console.log(`Error deleting user: ${targetUid}`, error);
      });

    await deleteDoc('userClaims', targetUid);
    return;
  });
