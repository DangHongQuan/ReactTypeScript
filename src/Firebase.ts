// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC0SSnal84zfB1VRrwQxPDgyFux3g1i5cM",
  authDomain: "democonnect-reactjs.firebaseapp.com",
  databaseURL: "https://democonnect-reactjs-default-rtdb.firebaseio.com",
  projectId: "democonnect-reactjs",
  storageBucket: "democonnect-reactjs.appspot.com",
  messagingSenderId: "460195135131",
  appId: "1:460195135131:web:a74f2e582fbb924727d03e",
  measurementId: "G-SQ3Z02ST3S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const database= getDatabase(app);  