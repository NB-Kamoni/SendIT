import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCJRxMhYTuQk7SMdQBH7pNSq5FaIn6DR8Q",
    authDomain: "farmfolio-2a11a.firebaseapp.com",
    projectId: "farmfolio-2a11a",
    storageBucket: "farmfolio-2a11a.appspot.com",
    messagingSenderId: "59897684350",
    appId: "1:59897684350:web:03122ca3427008f7a2132f",
    measurementId: "G-FNG692HQ8E"
  };
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)



export { app, auth };