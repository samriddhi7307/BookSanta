import firebase from 'firebase';
require('@firebase/firestore')

const firebaseConfig = {
    apiKey: "AIzaSyC5eaXyB87_A3dLGVJkbIJBscWupfPfn1I",
    authDomain: "booksanta-2486a.firebaseapp.com",
    projectId: "booksanta-2486a",
    storageBucket: "booksanta-2486a.appspot.com",
    messagingSenderId: "518751479533",
    appId: "1:518751479533:web:294b9e852f820d6c63cee4"
  };

  firebase.initializeApp(firebaseConfig);

  export default firebase.firestore();

  