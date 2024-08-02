// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCaSawoZHYkyeys2r-etyzzxcpPTapfmwg",
  authDomain: "inventory-management-d808c.firebaseapp.com",
  projectId: "inventory-management-d808c",
  storageBucket: "inventory-management-d808c.appspot.com",
  messagingSenderId: "888566447291",
  appId: "1:888566447291:web:ccbfa1d9d78648cfc4fd9e",
  measurementId: "G-895GJPDQJ9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export {firestore}