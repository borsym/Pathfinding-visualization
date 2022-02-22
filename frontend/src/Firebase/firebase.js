// import firebase from "firebase";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import  "firebase/compat/storage"; // compat lehet nem kell
// import "firebase/firestore";
// import "firebase/auth";
// import { useAuthState } from "react-firebase-hooks/auth";
// import { useCollectionData } from "react-firebase-hooks/firestore";

firebase.initializeApp({
  apiKey: "AIzaSyBmjHvoCSc63KtDGyvVRKND397aIPNo0L4",
  authDomain: "pathfinding-visualizer-d5941.firebaseapp.com",
  projectId: "pathfinding-visualizer-d5941",
  storageBucket: "pathfinding-visualizer-d5941.appspot.com",
  messagingSenderId: "106729206356",
  appId: "1:106729206356:web:11b7b018fa439ea2ee33c1",
  measurementId: "G-LCE01B1T7H",
});

// const auth = firebase.auth();
// const firestore = firebase.firestore();
// const analytics = firebase.analytics();

// Get a reference to the storage service, which is used to create references in your storage bucket
// const storage = getStorage();

// // Create a storage reference from our storage service
// // const storageRef = ref(storage);
// // Create a child reference
// const imagesRef = ref(storage, "images");
// // imagesRef now points to 'images'

// // Child references can also take paths delimited by '/'
// const borsyRef = ref(storage, "images/borsy_mate.png");

// console.log(imagesRef);
// console.log(borsyRef.getDownloadURL());
// spaceRef now points to "images/space.jpg"
// imagesRef still points to "images"

export { firebase };
