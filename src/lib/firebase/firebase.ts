import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { getApp, getApps, initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyB89QDMVNrrFm_rdv0ztF8dYLda2UVYgeg",
  authDomain: "chat-pdf-66082.firebaseapp.com",
  projectId: "chat-pdf-66082",
  storageBucket: "chat-pdf-66082.firebasestorage.app",
  messagingSenderId: "439262306442",
  appId: "1:439262306442:web:2a3f314f55d5f09db30d73",
  measurementId: "G-58BJMLHJD5"
};

// Initialize Firebase
const app = getApps().length ? getApp(): initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const analytics = getAnalytics(app);

export {db, storage, analytics}