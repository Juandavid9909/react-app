import firebase from 'firebase';

export const firebaseConfig = {
  apiKey: "AIzaSyBzYsYpRZ0q0zrHqMzekXB8qRJhE3z9F_I",
  authDomain: "auth-21c1c.firebaseapp.com",
  databaseURL: "https://auth-21c1c.firebaseio.com",
  projectId: "auth-21c1c",
  storageBucket: "auth-21c1c.appspot.com",
  messagingSenderId: "511358099533"
};

const fire = firebase.initializeApp(firebaseConfig);
export default fire;
