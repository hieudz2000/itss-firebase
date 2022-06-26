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
    apiKey: "AIzaSyDYHEP67WxUUZMRJ3NEJrTGIfwHGoVG3qg",
    authDomain: "fir-sample-a04d1.firebaseapp.com",
    projectId: "fir-sample-a04d1",
    storageBucket: "fir-sample-a04d1.appspot.com",
    messagingSenderId: "3958416278",
    appId: "1:3958416278:web:bc2b547af6903d682373b7",
};
const app = initializeApp({
    apiKey: "AIzaSyDYHEP67WxUUZMRJ3NEJrTGIfwHGoVG3qg",
    authDomain: "fir-sample-a04d1.firebaseapp.com",
    projectId: "fir-sample-a04d1",
    storageBucket: "fir-sample-a04d1.appspot.com",
    messagingSenderId: "3958416278",
    appId: "1:3958416278:web:bc2b547af6903d682373b7",
});
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
const storage = getStorage(app);

export { auth, db, storage };
export default firebase;
