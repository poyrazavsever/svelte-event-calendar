import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAY6rLx-8bLB19sbwGFHR9PPHl8NiouoAs",
  authDomain: "event-calendar-c3e6a.firebaseapp.com",
  projectId: "event-calendar-c3e6a",
  storageBucket: "event-calendar-c3e6a.appspot.com",
  messagingSenderId: "815421647843",
  appId: "1:815421647843:web:5dc02cbe7bc957d85f4ed6",
  measurementId: "G-7GBB108JQ6",
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const firestore = firebase.firestore();

export { auth, firestore };
