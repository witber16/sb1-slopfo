import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyArNJI68NblFVFvcjdfjzPgeWGhfZJgPyE",
  authDomain: "ironic-jd.firebaseapp.com",
  projectId: "ironic-jd",
  storageBucket: "ironic-jd.firebasestorage.app",
  messagingSenderId: "934934983097",
  appId: "1:934934983097:web:7d1e5099ce176f6aaec668",
  measurementId: "G-1L886T8ZRH"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);