import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAsJNWuuTaqtmXUxERmOlCoAObgkfEKnv0",
  authDomain: "whatsapp-clone-b053a.firebaseapp.com",
  projectId: "whatsapp-clone-b053a",
  storageBucket: "whatsapp-clone-b053a.appspot.com",
  messagingSenderId: "193691991204",
  appId: "1:193691991204:web:190a0c6b052d25f013ba31",
  measurementId: "G-B5YD8PC19J"
};


// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider(app);
export const db = getFirestore(app);
