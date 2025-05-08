// lib/firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBMiCrLClPRJZhwlLGwMs7eKPBVaLJ-liU",
  authDomain: "askme-49fb7.firebaseapp.com",
  projectId: "askme-49fb7",
  storageBucket: "askme-49fb7.firebasestorage.app",
  messagingSenderId: "371357700059",
  appId: "1:371357700059:web:9b7782eecc79260cd121fe",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
