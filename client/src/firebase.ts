// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAfEqpZEc-PUTA-DmAOKbyqc6Re7bX6AY4",
  authDomain: "akar-2cab1.firebaseapp.com",
  projectId: "akar-2cab1",
  storageBucket: "akar-2cab1.appspot.com",
  messagingSenderId: "827201630486",
  appId: "1:827201630486:web:16dc01e366ff347c2ae037",
  measurementId: "G-EHJ775PCVC",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
