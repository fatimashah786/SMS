import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBn2qPM-s7H5d2rmdQ_JPEAKD4sMiT-_8M",
  authDomain: "test-5cea0.firebaseapp.com",

  projectId: "test-5cea0",
  storageBucket: "test-5cea0.appspot.com",
  messagingSenderId: "858298144544",
  appId: "1:858298144544:web:458092afdc7c0e1a7c6945",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const db = getFirestore(app);
export default app;
