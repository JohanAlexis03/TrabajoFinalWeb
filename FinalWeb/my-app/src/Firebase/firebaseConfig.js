// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD-SSsrJv2-Wa3hzljEomgo-fpw6mVKgbg",
  authDomain: "proyectofinalweb-f2b0c.firebaseapp.com",
  projectId: "proyectofinalweb-f2b0c",
  storageBucket: "proyectofinalweb-f2b0c.firebasestorage.app",
  messagingSenderId: "647463476788",
  appId: "1:647463476788:web:2bb7f63ee0d75a3473f461",
  measurementId: "G-S0Q084MPHZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);