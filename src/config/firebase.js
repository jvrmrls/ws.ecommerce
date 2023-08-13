import admin from 'firebase-admin';
import serviceAccount from '#static/src/config/mome-cloud-firebase-adminsdk-cbvga-0290199eae.json' assert { type: 'json' };

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
