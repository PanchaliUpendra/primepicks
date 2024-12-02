// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import {getStorage} from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAKczyNqGfAMn1QXy5I-a7iIg_GeGZ5j_Y",
  authDomain: "department-store-9d74e.firebaseapp.com",
  projectId: "department-store-9d74e",
  storageBucket: "department-store-9d74e.appspot.com",
  messagingSenderId: "340216701253",
  appId: "1:340216701253:web:2bfcf44904c68942c51e2c",
  measurementId: "G-JW3YCMK5MW"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);