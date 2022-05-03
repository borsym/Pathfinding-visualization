/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import { QuestionContext } from "../contexts/QuestionsContext";
import { firebase } from "../Firebase/firebase";
import OverConfetti from "./OverConfetti";

const Over = () => { // Showing the result after the user solved the puzzle
  const [user, setUser] = useState(null);
  const db = firebase.firestore();
  useEffect(() => {
    const user = db
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .get();
    user.then((user) => setUser(user.data()));
  }, []);

  return (
    <div className="text-center text-2xl">
      <h1>
        Congratulations <b>{user?.name}</b>!
      </h1>
      <h3>
        Your points: <b>{user?.points}</b> out of <b>14</b>
      </h3>

      {user?.points < 4 ? (
        <>
          <h3> You need to improve your knowledge!</h3>
          <h5>Your grade would be</h5>
          <h6>1</h6>
        </>
      ) : user?.points < 7 ? (
        <>
          <h3> You are doing well but you still need to improve</h3>
          <h5>Your grade would be</h5>
          <h6>2</h6>
        </>
      ) : user?.points < 10 ? (
        <>
          <h3> You are doing great!</h3>
          <h5>Your grade would be</h5>
          <h6>3</h6>
        </>
      ) : user?.points < 13 ? (
        <>
          <h3> You are doing really well!</h3>
          <h5>Your grade would be</h5>
          <h6>4</h6>
        </>
      ) : user?.points == 14 ? (
        <>
          <h3> Confetti for you!!!</h3>
          <h5>Your grade would be</h5>
          <h6>5</h6>
        </>
      ) : (
        <>
          <h3> You are doing really well!</h3>
          <h5>Your grade would be</h5>
          <h6>5</h6>
        </>
      )}
      {user?.points === 14 ? <OverConfetti /> : null}
    </div>
  );
};

export default Over;
