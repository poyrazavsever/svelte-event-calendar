// src/firebase.ts
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Firebase yapılandırma nesnesi
const firebaseConfig = {
    apiKey: "AIzaSyAAss9SKJsi952YXk5avHYKNtKyE7E6un0",
    authDomain: "event-calendar-352fe.firebaseapp.com",
    projectId: "event-calendar-352fe",
    storageBucket: "event-calendar-352fe.appspot.com",
    messagingSenderId: "215685036693",
    appId: "1:215685036693:web:cc1c3e495e8c1b1a0f799c",
    measurementId: "G-64PSQDH6LT"
  };

// Firebase'i başlat
const app = initializeApp(firebaseConfig);

// Firestore ve Auth hizmetlerini al
export const db = getFirestore(app);
export const auth = getAuth(app);
