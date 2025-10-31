
// Firebase init (use your existing file if you prefer)
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

const cfg = (window.__firebase_config && JSON.parse(window.__firebase_config)) || {
  apiKey: "AIzaSyAjNVTi5ZjZDLRcfxXmf2gWmHswSHM4d8E",
  authDomain: "karteji.firebaseapp.com",
  projectId: "karteji",
  storageBucket: "karteji.firebasestorage.app",
  messagingSenderId: "828706251907",
  appId: "1:828706251907:web:54825185b074209c4fe7b6",
  measurementId: "G-PPGRMBXGHW"
};
export const app = initializeApp(cfg);
export const auth = getAuth(app);
export const db   = getFirestore(app);
export const APP_ID = window.__app_id || "karteji";
