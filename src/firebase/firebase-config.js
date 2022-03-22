// Import the functions you need from the SDKs you need
//import { initializeApp } from "firebase/app";
import firebase from "firebase/compat"

const firebaseConfig = {
  apiKey: "AIzaSyDSHra20mLkt5m6xvL3qw4TdpxVw9AV6e4",
  authDomain: "iste-501-rimac-team-3-temp.firebaseapp.com",
  projectId: "iste-501-rimac-team-3-temp",
  storageBucket: "iste-501-rimac-team-3-temp.appspot.com",
  messagingSenderId: "333717648797",
  appId: "1:333717648797:web:23d366b27ca57750536b74"
};
firebase.initializeApp(firebaseConfig)

export const app = firebase.firestore()
