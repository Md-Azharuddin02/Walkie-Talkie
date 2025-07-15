import { initializeApp } from "firebase/app";
import { getAuth, RecaptchaVerifier } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBKTyJSKJe7xDZkdGJsbWDneav8JZaYYjw",
  authDomain: "wlkie-talkie-84a54.firebaseapp.com",
  projectId: "wlkie-talkie-84a54",
  storageBucket: "wlkie-talkie-84a54.appspot.com",
  messagingSenderId: "887914098090",
  appId: "1:887914098090:web:dda788ec1e784ccbfd4fd3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Configure RecaptchaVerifier
export const generateRecaptcha = () => {
  window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
    'size': 'invisible',
    'callback': (response) => {
      // reCAPTCHA solved, allow signInWithPhoneNumber.
    }
  });
};

export default app;