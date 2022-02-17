import Legend from "./components/Legend";
import NavBar from "./components/NavBar";
import Grid from "./components/Grid";
import React, { useState, useEffect } from "react";
import { GridProvider } from "./contexts/GridContext";
import ModalTutorial from "./components/ModalTutorial";
import { QuestionProvider } from "./contexts/QuestionsContext";
import SignIn from "./SignIn";
import { firebase } from "./Firebase/firebase";
import axios from "axios";

export default function App() {
  // const [user] = useAuthState(auth);
  const [showModal, setShowModal] = useState(false);
  const [algorithm, setAlgorithm] = useState("");
  const [isUserSignedIn, setIsUserSignedIn] = useState(false);
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      axios.post("http://localhost:8000/api/user", {
        uid: user.uid,
        name: user.displayName,
      });
      return setIsUserSignedIn(true);
    }
    setIsUserSignedIn(false);
  });
  // Modal tutorial
  useEffect(() => {
    setTimeout(() => {
      setShowModal(true);
    }, 500);
  }, []);

  return isUserSignedIn ? (
    // Grid provider for shareing the grid between every component
    <GridProvider>
      {/* modal tutorial */}
      {/* <ModalTutorial showModal={showModal} setShowModal={setShowModal} /> */}
      {/* sharing the questions between different components in the question segment */}
      <QuestionProvider>
        <NavBar
          algorithm={algorithm}
          setAlgorithm={setAlgorithm}
          showModelTutorial={showModal}
          setShowModelTutorial={setShowModal}
        />
      </QuestionProvider>
      <Legend algorithm={algorithm} />{" "}
      {/* legend showing a little description to the algorithm */}
      <Grid />
    </GridProvider>
  ) : (
    <SignIn />
  );
}
