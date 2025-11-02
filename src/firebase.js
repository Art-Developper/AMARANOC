// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAm7sBinnEv36MUlDj4-O98S0x5JhjZZFQ",
  authDomain: "amaranoc-a35ab.firebaseapp.com",
  projectId: "amaranoc-a35ab",
  storageBucket: "amaranoc-a35ab.firebasestorage.app",
  messagingSenderId: "103884148399",
  appId: "1:103884148399:web:497edd0c96366f50c1ce5a",
  measurementId: "G-JNQJWCFMN2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { auth }