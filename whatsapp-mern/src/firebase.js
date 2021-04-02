import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyD0Rwcz0EyIvIh7RyntcNVadei9N5eiSTo",
    authDomain: "whatsapp-mern-c89c1.firebaseapp.com",
    projectId: "whatsapp-mern-c89c1",
    storageBucket: "whatsapp-mern-c89c1.appspot.com",
    messagingSenderId: "601842788932",
    appId: "1:601842788932:web:6558ff5f61a5813a0a2a11"
  };

  // Initialize firebase
  const firebaseApp = firebase.initializeApp(firebaseConfig);
  // Gets our Database
  const db = firebaseApp.firestore();
  // Authentication 
  const auth = firebase.auth();
  // Google's Authentication
  const provider = new firebase.auth.GoogleAuthProvider();

  export { auth, provider };
  export default db;