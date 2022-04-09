import axios from "axios";
import React, { useEffect, useState } from "react";
import Grid from "./components/Grid";
import Legend from "./components/Legend";
import NavBar from "./components/NavBar";
import { GridProvider } from "./contexts/GridContext";
import { QuestionProvider } from "./contexts/QuestionsContext";
import { firebase } from "./Firebase/firebase";
import errorMessage from "./functions/ErrorMessage";
import SignIn from "./components/SignIn";
// import ModalTutorial from "./components/ModalTutorial";
import {PATH} from "./fileWithConstan";

export default function App() {
  const [showModal, setShowModal] = useState(false);
  const [algorithm, setAlgorithm] = useState("");
  const [isUserSignedIn, setIsUserSignedIn] = useState(false);

  // Modal tutorial
  useEffect(() => {
    // if user is signed in, send request to backend create a new user, if exists the backend will handle
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        axios
          .post(`${PATH}/api/user`, {
            uid: user.uid,
            name: user.displayName,
          })
          .catch(() => {
            errorMessage("Nincs kapcsolat a szerverrel!");
          });
        return setIsUserSignedIn(true);
      }
      setIsUserSignedIn(false);
    });

    setTimeout(() => {
      setShowModal(true);
    }, 500);
  }, [setIsUserSignedIn]);

  return isUserSignedIn ? (
    // Grid provider for shareing the grid between every component
    <GridProvider>
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
      {/* legend showing a little description to the algorithm */}
      <Legend algorithm={algorithm} /> <Grid />
    </GridProvider>
  ) : (
    // if the user is not signed in, show the sign in page
    <SignIn />
  );
  // this is how I uploaded image and get the url
  // const onChange = async (e) => {
  //   const file = e.target.files[0];
  //   const storageRef = firebase.storage().ref();
  //   const fileRef = storageRef.child(file.name);
  //   await fileRef.put(file);
  //   const fileUrl = await fileRef.getDownloadURL();
  //   console.log(fileUrl);
  // };
  // const onSubmit = (e) => {
  //   e.preventDefault();
  // };
  // return (
  //   <>
  //     <form onSubmit={onSubmit}>
  //       <input type="file" onChange={onChange} />
  //       <button>Submit</button>
  //     </form>
  //   </>
  // );
}
