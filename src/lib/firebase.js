// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { getStorage } from "firebase/storage";
import { initializeApp } from "@firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBcFvjC1haGWchAy9nZ6lIdy9xCUmyhLM8",
  authDomain: "hieudz-3f9a6.firebaseapp.com",
  projectId: "hieudz-3f9a6",
  storageBucket: "hieudz-3f9a6.appspot.com",
  messagingSenderId: "868387452098",
  appId: "1:868387452098:web:3671c5b1b95cd94383b75b",
  measurementId: "G-BZLM3RZDC9"
};
const app = initializeApp({
  apiKey: "AIzaSyBcFvjC1haGWchAy9nZ6lIdy9xCUmyhLM8",
  authDomain: "hieudz-3f9a6.firebaseapp.com",
  projectId: "hieudz-3f9a6",
  storageBucket: "hieudz-3f9a6.appspot.com",
  messagingSenderId: "868387452098",
  appId: "1:868387452098:web:3671c5b1b95cd94383b75b",
  measurementId: "G-BZLM3RZDC9"
});
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
const storage = getStorage(app);

export { auth, db, storage };
export default firebase;
