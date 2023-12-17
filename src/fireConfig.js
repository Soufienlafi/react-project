import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDESq8XgT8lVv4Hc_ax1BOP9LZOTQm-uDo",
  authDomain: "fir-project-17ff4.firebaseapp.com",
  projectId: "fir-project-17ff4",
  storageBucket: "fir-project-17ff4.appspot.com",
  messagingSenderId: "658920521596",
  appId: "1:658920521596:web:3247de998ace636aa6eef9"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export const auth = getAuth(app)
export default db;
