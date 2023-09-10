import admin from 'firebase-admin';
import { initializeApp } from 'firebase/app';
import serviceAccount from '#static/src/config/mome-cloud-firebase-adminsdk-cbvga-0290199eae.json' assert { type: 'json' };

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const firebaseConfig = {
  apiKey: "AIzaSyDumaKMKq5md6xoqLdoE2K4NGaLzjpnUtU",
  authDomain: "mome-cloud.firebaseapp.com",
  projectId: "mome-cloud",
  storageBucket: "mome-cloud.appspot.com",
  messagingSenderId: "171489193697",
  appId: "1:171489193697:web:fe9df7ce7e4320183ed1a0",
  measurementId: "G-B057NGF65C"
};

const app = initializeApp(firebaseConfig);