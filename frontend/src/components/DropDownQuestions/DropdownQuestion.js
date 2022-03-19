/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useContext, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { QuestionContext } from "../../contexts/QuestionsContext";
import { firebase } from "../../Firebase/firebase";
import errorMessage from "../../functions/ErrorMessage";
import Button from "../Button";

const DropdownQuestion = () => {
  const [quizeState, dispatch] = useContext(QuestionContext);
  const [isSubmitted, setIsSubmitted] = useState(false); // if submitted we change the button to next

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
      if (key !== "img" && document.getElementById(key) !== null) {
        document.getElementById(key).className = "flex p-1 m-1";
      }
    });
  };

  useEffect(() => {
    console.log("curr", currentQuestion);
  }, [currentQuestion]);

  const getValuesFromSelect = () => {
    let currentQuestionId = null;
    Object.keys(quizeState.questions[quizeState.currentQuestionType]).map(
      (id, idx) => {
        if (idx === quizeState.currentQuestionIndex) {
          currentQuestionId = id;
        }
      }
    );

    let answers = {};
    Object.keys(currentQuestion).map((key, idx) => {
      if (key !== "kep") {
        let select = document.getElementById(key);
        let value = select.options[select.selectedIndex].value;
        answers[key] = value;
      }
    });

    axios
      .post(`http://localhost:8000/api/dropdown/${quizeState.algorithm}`, {
        answers: answers,
        algorithm: quizeState.algorithm,
        questionsType: quizeState.currentQuestionType,
        id: currentQuestionId,
        uid: firebase.auth().currentUser.uid,
      })
      .then((result) => {
        Object.keys(result.data).map((key, idx) => {
          document.getElementById(key).className = result.data[key]
            ? "flex p-1 m-1 bg-green-100"
            : "flex p-1 m-1 bg-red-100";
        });
      })
      .catch(() => {
        errorMessage("A szerver nem elérhető!");
      });

    setIsSubmitted(true);
  };

  const replacing = {
    // every dropdown element contains the key of the question this is why i change them
    "answer-1": "A",
    "answer-2": "B",
    "answer-3": "C",
    "answer-4": "D",
  };

  return (
    <div key={quizeState.currentQuestionIndex}>
      <div className="flex justify-center">
        <img
          src={currentQuestion["kep"]}
          alt="kep"
          className="max-h-28 max-w-xs"
        />
      </div>
      {/* ujra rendelődik mindig itt van  probléma , erre valamit ki kell találni mert ha submitolom akkor újra tölti a kompoenst memo nem oldja meg*/}
      {Object.keys(currentQuestion).map(
        (key, idx) =>
          key !== "kep" && (
            <select key={key} name={key} id={key} className="flex p-1 m-1">
              {currentQuestion[key].map((question, index) => (
                <option value={question} key={`${key}-${question}`}>
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
