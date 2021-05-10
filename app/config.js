import firebase from '@firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyCjgrrp7SzIesERAB0GUHqeJAzmD7yn3Q0",
    authDomain: "cryptomonnaie-740f1.firebaseapp.com",
    projectId: "cryptomonnaie-740f1",
    storageBucket: "cryptomonnaie-740f1.appspot.com",
    messagingSenderId: "933068777090",
    appId: "1:933068777090:web:f88c59c16bd60a7844b69b"
  };

// Initialize Firebase
firebase.initializeApp(config);



export default firebase