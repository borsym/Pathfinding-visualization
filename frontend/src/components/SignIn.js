import React from "react";
import { firebase } from "../Firebase/firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

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
