import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyD_UxjNGsfvpU1Aac9c58vU8aP5hCksc8o",
  authDomain: "learnlingo-b5550.firebaseapp.com",
  projectId: "learnlingo-b5550",
  storageBucket: "learnlingo-b5550.firebasestorage.app",
  messagingSenderId: "584004299882",
  appId: "1:584004299882:web:7e05129679938d1969ee13",
  databaseURL: "https://learnlingo-b5550-default-rtdb.europe-west1.firebasedatabase.app" 
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getDatabase(app);