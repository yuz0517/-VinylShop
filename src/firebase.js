
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDJAWW3PWLaw_oaI2O7ZeZqlfrYoRrEqGY",
  authDomain: "myapp2022-yuz.firebaseapp.com",
  projectId: "myapp2022-yuz",
  storageBucket: "myapp2022-yuz.appspot.com",
  messagingSenderId: "564396467679",
  appId: "1:564396467679:web:0adc895ee27bc29d0f506a",
  measurementId: "G-1JRWJ62N09"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth }