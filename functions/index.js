const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

exports.addUserDocumentInCollection = functions.auth.user().onCreate(user => {
  return admin.firestore().collection('users').doc(user.uid).set({
    email: user.email
  }).catch(console.error);
});

exports.deleteUserDocumentInCollection = functions.auth.user().onDelete(user => {
  return admin.firestore().collection('users').doc(user.uid).delete().catch(console.error)
});