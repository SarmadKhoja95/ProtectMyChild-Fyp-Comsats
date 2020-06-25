//Firebasae imports
import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyDSlxY15tPG3dkFzDGtofkmBck820gqZ-Y",
  authDomain: "fyp-pmc.firebaseapp.com",
  databaseURL: "https://fyp-pmc.firebaseio.com",
  projectId: "fyp-pmc",
  storageBucket: "fyp-pmc.appspot.com",
  messagingSenderId: "603449347097",
  appId: "1:603449347097:web:4ac03bda0e9774cea1ae88",
  measurementId: "G-0C5HFV1NJV"
};

// Initialize firebase...
const Firebase = firebase.initializeApp(firebaseConfig);
export default Firebase;