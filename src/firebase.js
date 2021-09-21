import firebase from "firebase"

const firebaseConfig = {
    apiKey: "AIzaSyCV1pEcW0GMEurvY6c9aXbMXBFwZsoLANc",
    authDomain: "ecommerce-f9d8e.firebaseapp.com",
    projectId: "ecommerce-f9d8e",
    storageBucket: "ecommerce-f9d8e.appspot.com",
    messagingSenderId: "31359945443",
    appId: "1:31359945443:web:edf24c65875f38e1ecd3d6"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const auth = firebase.auth();

  export {auth}