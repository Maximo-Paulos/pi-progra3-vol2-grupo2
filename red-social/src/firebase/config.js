import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBtRpi9cWS4IxI5XMi1WENEfAtMKOcTAMA",
    authDomain: "pi-reactnative-b2a35.firebaseapp.com",
    projectId: "pi-reactnative-b2a35",
    storageBucket: "pi-reactnative-b2a35.firebasestorage.app",
    messagingSenderId: "396434616875",
    appId: "1:396434616875:web:ee2d6f598508011a1eb06e",
    measurementId: "G-GCVYJ21X5W"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const db = firebase.firestore();


