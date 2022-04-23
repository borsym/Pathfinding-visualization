import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

firebase.initializeApp({
  apiKey: "AIzaSyBmjHvoCSc63KtDGyvVRKND397aIPNo0L4",
  authDomain: "pathfinding-visualizer-d5941.firebaseapp.com",
  projectId: "pathfinding-visualizer-d5941",
  storageBucket: "pathfinding-visualizer-d5941.appspot.com",
  messagingSenderId: "106729206356",
  appId: "1:106729206356:web:11b7b018fa439ea2ee33c1",
  measurementId: "G-LCE01B1T7H",
});

export { firebase };
