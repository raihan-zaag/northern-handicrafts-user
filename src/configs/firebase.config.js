import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC7yIo-KIBidH7ihb7ckLcVzyvToLAIvqo",
  authDomain: "optiluxe-81104.firebaseapp.com",
  projectId: "optiluxe-81104",
  storageBucket: "optiluxe-81104.firebasestorage.app",
  messagingSenderId: "792636579987",
  appId: "1:792636579987:web:1967155ee77813a4276d66",
  measurementId: "G-WLGRL6ERCS",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Check if Firebase is already initialized
const firebaseApps = getApps();
if (firebaseApps.length === 0) {
  console.log("Firebase is not initialized");
} else {
  console.log("Firebase is initialized");
}

const socialAuth = getAuth(app);

export { socialAuth };
