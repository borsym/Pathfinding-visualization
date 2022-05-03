/* eslint-disable no-unused-vars */
import axios from "axios";
import PropTypes from "prop-types";
import React, { useContext } from "react";
import { QuestionContext } from "../../contexts/QuestionsContext";
import { firebase } from "../../Firebase/firebase";
import Answer from "./Answer";
import {PATH} from "../../fileWithConstan";

const Question = (props) => {
  const [quizeState, dispatch] = useContext(QuestionContext);
  let currentQuestionId = null;
  const currentQuestion = Object.keys(quizeState.questions.quize)
    .map((id, idx) => {
      if (idx === quizeState.currentQuestionIndex) {
        currentQuestionId = id;
        return quizeState.questions.quize[id];
      }
    })
    .filter((question) => question !== undefined)[0];

  const handleSelectAnswer = async (answer, index) => {
    let answers = {};
    answers[index] = answer;
    props.setDisabled("pointer-events-none"); // disable all answers if you select one
    axios
      .post(`${PATH}/api/quize/${quizeState.algorithm}`, {
        answers: answers,
        algorithm: quizeState.algorithm,
        questionsType: quizeState.currentQuestionType,
        id: currentQuestionId,
        uid: firebase.auth().currentUser.uid,
      })
      .then((result) => {
        Object.keys(result.data).map((key, idx) => {
          document.getElementById(key).className = result.data[key]
            ? "border-2 w-full flex justify-center font-semibold bg-green-100"
            : "border-2 w-full flex justify-center font-semibold bg-red-100";
        });
      })
      .catch(() => {});
  };

  return (
    <div className={`${props.disabled}`}>
      <div className="flex justify-center font-semibold text-2xl">
        {currentQuestion.question}
      </div>
      <div className="grid grid-flow-row auto-rows-max bg-red-100">
        {currentQuestion.answers.map(
          (
            answer,
            index // options
          ) => (
            <Answer
              id={parseInt(index)}
              answerText={answer}
              key={index}
              index={index}
              currentAnswer={quizeState.currentAnswer}
              onSelectAnswer={(answerText) =>
                handleSelectAnswer(answerText, index)
              }
            />
          )
        )}
      </div>
    </div>
  );
};

Question.propTypes = {
  disabled: PropTypes.string,
  setDisabled: PropTypes.func,
};

export default Question;
