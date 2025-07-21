// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBFcsH4iZjnQ_xCL5AsBXbvgdExXOthUnc",
  authDomain: "storyvault-d4fda.firebaseapp.com",
  projectId: "storyvault-d4fda",
  storageBucket: "storyvault-d4fda.firebasestorage.app",
  messagingSenderId: "798906032704",
  appId: "1:798906032704:web:1844a8b00610f86bc235a5"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);