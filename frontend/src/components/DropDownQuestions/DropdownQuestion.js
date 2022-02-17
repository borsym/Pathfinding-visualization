import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { QuestionContext } from "../../contexts/QuestionsContext";
import Button from "../Button";
import { firebase } from "../../Firebase/firebase";
const DropdownQuestion = () => {
  const [quizeState, dispatch] = useContext(QuestionContext);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const currentQuestion = Object.keys(
    quizeState.questions[quizeState.currentQuestionType]
  )
    .map((id, idx) => {
      if (idx === quizeState.currentQuestionIndex) {
        return quizeState.questions[quizeState.currentQuestionType][id];
      }
    })
    .filter((question) => question !== undefined)[0];

  const clearAllBg = () => {
    Object.keys(currentQuestion).map((key, idx) => {
      if (key !== "img") {
        document.getElementById(key).className = "flex p-1 m-1";
      }
    });
  };

  const getValuesFromSelect = () => {
    let currentQuestionId = null;
    Object.keys(quizeState.questions[quizeState.currentQuestionType]).map(
      (id, idx) => {
        if (idx === quizeState.currentQuestionIndex) {
          currentQuestionId = id;
        }
      }
    );
    console.log("test", currentQuestionId);
    let answers = {};
    Object.keys(currentQuestion).map((key, idx) => {
      if (key !== "kep") {
        let select = document.getElementById(key);
        let value = select.options[select.selectedIndex].value;
        // return `${key}-${value}`; // lehet elég csak a value-t adni
        // return value;
        // return (answer[key] = value);
        answers[key] = value;
      }
    });
    // .filter((answer) => answer !== undefined);
    // mar itt baja van
    // console.log("a", answers);
    // console.log("b", quizeState.algorithm);
    // console.log("c", quizeState.currentQuestionType);
    axios
      .post(`http://localhost:8000/api/dropdown/${quizeState.algorithm}`, {
        answers: answers,
        algorithm: quizeState.algorithm,
        questionsType: quizeState.currentQuestionType,
        id: currentQuestionId,
        uid: firebase.auth().currentUser.uid,
      })
      .then((result) => {
        console.log("ez a result", result.data);
        Object.keys(result.data).map((key, idx) => {
          document.getElementById(key).className = result.data[key]
            ? "flex p-1 m-1 bg-green-100"
            : "flex p-1 m-1 bg-red-100";
        });
      });

    setIsSubmitted(true);
  };
  const replacing = {
    "answer-1": "A",
    "answer-2": "B",
    "answer-3": "C",
    "answer-4": "D",
  };

  return (
    <div key={quizeState.currentQuestionIndex}>
      <div>{currentQuestion.img}</div> {/* itt a kep lesz */}
      {/* <label for="cars">Choose a car:</label> */}
      {Object.keys(currentQuestion).map(
        (key, idx) =>
          key !== "kep" && (
            <select name={key} id={key} className="flex p-1 m-1">
              {currentQuestion[key].map((question, index) => (
                <option value={question}>
                  {replacing[key]}: {question}
                </option>
              ))}
            </select>
          )
      )}
      {!isSubmitted ? (
        <Button
          name="Submit"
          questionSection={true}
          function={getValuesFromSelect}
        />
      ) : (
        <Button
          name="Next"
          questionSection={true}
          function={() => {
            dispatch({ type: "NEXT_QUESTION" });
            setIsSubmitted(false);
            clearAllBg();
          }}
        />
      )}
    </div>
  );
};

export default DropdownQuestion;
