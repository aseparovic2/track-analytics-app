// Import the functions you need from the SDKs you need
//import { initializeApp } from "firebase/app";
import firebase from "firebase/compat"

const firebaseConfig = {
  apiKey: "AIzaSyDScCOM2IblVXpmtzZXAEnPXyPVLdi8YF8",
  authDomain: "iste-501-rimac-team-3.firebaseapp.com",
  databaseURL: "https://iste-501-rimac-team-3-default-rtdb.firebaseio.com",
  projectId: "iste-501-rimac-team-3",
  storageBucket: "iste-501-rimac-team-3.appspot.com",
  messagingSenderId: "303908844677",
  appId: "1:303908844677:web:0d59a0cdc11ffe162be5ec",
  measurementId: "G-MSC4FM4901"
};
firebase.initializeApp(firebaseConfig)

export const app = firebase.firestore()
