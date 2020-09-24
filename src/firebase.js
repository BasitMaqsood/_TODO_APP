import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyArkZJXXv0-bka3Cjl7SB9AHauvoB7lkBM",
    authDomain: "todo-app-de0fb.firebaseapp.com",
    databaseURL: "https://todo-app-de0fb.firebaseio.com",
    projectId: "todo-app-de0fb",
    storageBucket: "todo-app-de0fb.appspot.com",
    messagingSenderId: "648760302745",
    appId: "1:648760302745:web:517cbba35da416c937ac08",
    measurementId: "G-WWCS9775WP"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

export default db;

