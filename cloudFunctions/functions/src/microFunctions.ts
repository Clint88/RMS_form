// Imports
import * as admin from 'firebase-admin';

// Gets
export async function getUserData(userId: string) {
  const userDocument = await admin.firestore().collection('users').doc(userId);
  const userRecordSnapshot = await userDocument.get();
  return userRecordSnapshot.data();
}

// Deletes
export async function deleteDoc(collection: string, document: any) {
  await admin.firestore().collection(collection).doc(document).delete();
  return;
}
