import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA0dYoK6pzTC3J4RZHWRX1GQwL7lV650iU",
  authDomain: "crud-biblioteca-ae370.firebaseapp.com",
  projectId: "crud-biblioteca-ae370",
  storageBucket: "crud-biblioteca-ae370.appspot.com",
  messagingSenderId: "772647773127",
  appId: "1:772647773127:web:03ff291685d60610efafe2"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);