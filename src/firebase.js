import firebase from 'firebase';


  const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBsrWd0BzDx-ghdz_LCGBeou9HLIxJ7-Fw",
    authDomain: "clone-e5f5d.firebaseapp.com",
    projectId: "clone-e5f5d",
    storageBucket: "clone-e5f5d.appspot.com",
    messagingSenderId: "793319495425",
    appId: "1:793319495425:web:90fbade714bbeecbf9ad00"
  });

  const db= firebaseApp.firestore();
  const auth= firebase.auth();

  if (!firebase.apps.length) {
    firebase.initializeApp({});
 }else {
    firebase.app(); // if already initialized, use that one
 }

  export {db, auth};