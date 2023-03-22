// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAiyHqKZKgUpWLln67snItT3vO85_MuR28',
  authDomain: 'volunteermanagement-39e07.firebaseapp.com',
  projectId: 'volunteermanagement-39e07',
  storageBucket: 'volunteermanagement-39e07.appspot.com',
  messagingSenderId: '130368023371',
  appId: '1:130368023371:web:f88992884253a7cae7d6ce',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
