// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDIp0P_j73IDepWwia-HvQ3UNjTPksAZOM",
  authDomain: "price-match-app.firebaseapp.com",
  projectId: "price-match-app",
  storageBucket: "price-match-app.appspot.com",
  messagingSenderId: "762267760080",
  appId: "1:762267760080:web:6d0af552f13dee531df5d5",
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(firebase);

// Initialize storage
const storage = getStorage(firebase);

const auth = getAuth();

export { db, storage, auth };
