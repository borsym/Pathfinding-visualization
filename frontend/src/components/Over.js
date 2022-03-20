/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import { QuestionContext } from "../contexts/QuestionsContext";
import { firebase } from "../Firebase/firebase";
import OverConfetti from "./OverConfetti";

const Over = () => {
  const [quizeState, dispatch] = useContext(QuestionContext);
  const [user, setUser] = useState(null);
  const db = firebase.firestore();
  useEffect(() => {
    const user = db
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .get();
    user.then((user) => setUser(user.data()));
  }, []);
  console.log(user);
  return (
    <div>
      <h1>Congratulations {user?.name}!</h1>
      <h3>Your points: {user?.points} out of 14</h3>
      {user?.points === 14 ? <OverConfetti /> : null}
    </div>
  );
};

export default Over;
