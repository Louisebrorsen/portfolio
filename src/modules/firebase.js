import { 
    getFirestore, 
    collection, 
  } from 'firebase/firestore';

  import { getAuth } from 'firebase/auth';
  import { getStorage } from 'firebase/storage';



// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDjUdVsPVIYj92ALa5nfD0UKKprZMQo40Q",
    authDomain: "portfolio-louisebrorsen-39afb.firebaseapp.com",
    projectId: "portfolio-louisebrorsen-39afb",
    storageBucket: "portfolio-louisebrorsen-39afb.appspot.com",
    messagingSenderId: "318888852327",
    appId: "1:318888852327:web:43e134a819ec2772d64dc2"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); /* dette er en funktion man får adgang til via fireStore.  */
const storage = getStorage(app);

const auth = getAuth(app); 

const ItemsFirebaseCollectionRef = 'portfolio-item';


const ItemsCollection = collection(db, 'portfolio-item');


export { auth, db, ItemsCollection, ItemsFirebaseCollectionRef, storage };


