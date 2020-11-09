import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

// noinspection SpellCheckingInspection
export const firebaseConfig = {
  apiKey: "AIzaSyB2HUmai_U5ilhYjPlgMs_yCbrjdSC7dIA",
  authDomain: "updowncardgames-3c85a.firebaseapp.com",
  databaseURL: "https://updowncardgames-3c85a.firebaseio.com",
  projectId: "updowncardgames-3c85a",
  storageBucket: "updowncardgames-3c85a.appspot.com",
  messagingSenderId: "813363233759",
  appId: "1:813363233759:web:5d986387d6b1fc1e6c3a6a",
  measurementId: "G-0JLJQEE5N2",
};

export const myFirebase = firebase.initializeApp(firebaseConfig);
export const db = myFirebase.firestore();
