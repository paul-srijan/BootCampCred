// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCs5fpo5GnmBEO9lXVDgRza0pJarq1Jgw0",
  authDomain: "first-login-register.firebaseapp.com",
  projectId: "first-login-register",
  storageBucket: "first-login-register.appspot.com",
  messagingSenderId: "226317383885",
  appId: "1:226317383885:web:240648578a6816ca2e1184",
  measurementId: "G-GN1GKLGLLN"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };