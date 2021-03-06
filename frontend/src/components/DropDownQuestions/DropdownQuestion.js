/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useContext, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { QuestionContext } from "../../contexts/QuestionsContext";
import { firebase } from "../../Firebase/firebase";
import Button from "../Button";
import {PATH} from "../../fileWithConstan";
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

  useEffect(() => {}, [currentQuestion]);

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
      .post(`${PATH}/api/dropdown/${quizeState.algorithm}`, {
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
      .catch(() => {});

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
          className="max-h-45 max-w-md"
        />
      </div>
      {/* ujra rendel??dik mindig itt van  probl??ma , erre valamit ki kell tal??lni mert ha submitolom akkor ??jra t??lti a kompoenst memo nem oldja meg*/}
      {Object.keys(currentQuestion).map(
        (key, idx) =>
          key !== "kep" && (
            <select
              key={key}
              name={key}
              id={key}
              className="flex p-1 m-1 border-4 hover:border-t-8 border-gray-300"
            >
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
