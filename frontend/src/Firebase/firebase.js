// import firebase from "firebase";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
// import "firebase/firestore";
// import "firebase/auth";
// import { useAuthState } from "react-firebase-hooks/auth";
// import { useCollectionData } from "react-firebase-hooks/firestore";

firebase.initializeApp({
  // Import the functions you need from the SDKs you need
  // import { initializeApp } from "firebase/app";
  // import { getAnalytics } from "firebase/analytics";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  // const firebaseConfig = {
  apiKey: "AIzaSyBmjHvoCSc63KtDGyvVRKND397aIPNo0L4",
  authDomain: "pathfinding-visualizer-d5941.firebaseapp.com",
  projectId: "pathfinding-visualizer-d5941",
  storageBucket: "pathfinding-visualizer-d5941.appspot.com",
  messagingSenderId: "106729206356",
  appId: "1:106729206356:web:11b7b018fa439ea2ee33c1",
  measurementId: "G-LCE01B1T7H",
  // };

  // // Initialize Firebase
  // const app = initializeApp(firebaseConfig);
  // const analytics = getAnalytics(app);
});

// const auth = firebase.auth();
// const firestore = firebase.firestore();
// const analytics = firebase.analytics();
export { firebase };
