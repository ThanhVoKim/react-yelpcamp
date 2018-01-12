import * as firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyDv_p41BBFlWdFcQutYQfNFH33xf3ITnPA',
  authDomain: 'testing-f0bde.firebaseapp.com',
  databaseURL: 'https://testing-f0bde.firebaseio.com',
  projectId: 'testing-f0bde',
  storageBucket: 'testing-f0bde.appspot.com',
  messagingSenderId: '180026380089'
};
firebase.initializeApp(config);

const database = firebase.database();
const facebookProvider = new firebase.auth.FacebookAuthProvider();
const twitterProvider = new firebase.auth.TwitterAuthProvider();
const googleProvider = new firebase.auth.GoogleAuthProvider();

export { firebase, database, facebookProvider, twitterProvider, googleProvider };