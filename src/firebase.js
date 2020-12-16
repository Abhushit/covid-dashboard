import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCHYpP_Pd-NwTUcnDkl5M6Vsi4nTw1tWDg",
  authDomain: "covid-dash1.firebaseapp.com",
  projectId: "covid-dash1",
  storageBucket: "covid-dash1.appspot.com",
  messagingSenderId: "9445502453",
  appId: "1:9445502453:web:b929f12fd32709264d44bc",
  measurementId: "G-GQQWLGKE8T",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
export { auth };
