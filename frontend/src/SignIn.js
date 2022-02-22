import React from "react";
import { firebase } from "./Firebase/firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
// const db = firebase.firestore();

// const SignInFirebase = () => {
//   console.log("bennevan");
//   // const googleProvider = new firebase.auth.GoogleAuthProvider();
//   // firebase
//   //   .auth()
//   //   .signInWithPopup(googleProvider)
//   //   .then((result) => {
//   db.collection("users")
//     .doc(firebase.auth().currentUser.uid)
//     .get()
//     .then((doc) => {
//       if (!doc.exists) {
//         return db
//           .collection("users")
//           .doc(firebase.auth().currentUser.uid)
//           .set({
//             name: firebase.auth().displayName,
//             points: Number(0),
//           });
//       }
//     });
//   // })
//   // .catch((error) => {
//   //   console.log(error);
//   // });
// };
// Configure FirebaseUI.
const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: "popup",
  // We will display Google and Facebook as auth providers. firebase.auth.FacebookAuthProvider.PROVIDER_ID,
  signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],

  callbacks: {
    // Avoid redirects after sign-in.
    signInSuccessWithAuthResult: () => false,
  },
};

const SignIn = () => {
  return (
    <div className="grid place-items-center h-screen bg-slate-700">
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
    </div>
  );
};

export default SignIn;
