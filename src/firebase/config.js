// Import the functions you need from the SDKs you need
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBZbb27GqDGz3eutplV_psLgQlmOx5m5Nk',
  authDomain: 'muso-ninjas-f755a.firebaseapp.com',
  projectId: 'muso-ninjas-f755a',
  storageBucket: 'muso-ninjas-f755a.appspot.com',
  messagingSenderId: '233974937421',
  appId: '1:233974937421:web:c01864b315b4eb15b26904',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// init firestore service
const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();
const projectStorage = firebase.storage();
const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp;

export { projectFirestore, projectAuth, projectStorage, serverTimestamp };
