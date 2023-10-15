import admin from 'firebase-admin';
import { initializeApp } from 'firebase/app';
import serviceAccount from '#static/ale-art-firebase-adminsdk-thxry-967d183f91.json' assert { type: 'json' };

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const firebaseConfig = {
  apiKey: 'AIzaSyAqNLAo2mPO1vwJov20YmhyDXACB6ZCU5A',
  authDomain: 'ale-art.firebaseapp.com',
  projectId: 'ale-art',
  storageBucket: 'ale-art.appspot.com',
  messagingSenderId: '303695385557',
  appId: '1:303695385557:web:1505385ba9d97c7192a35c',
  measurementId: 'G-Y5L57JRYBH'
};

const app = initializeApp(firebaseConfig);
