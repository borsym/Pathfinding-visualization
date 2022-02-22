import Answer from "./Answer";
import axios from "axios";
import { firebase } from "../../Firebase/firebase";
import { QuestionContext } from "../../contexts/QuestionsContext";
import React, { useContext } from "react";

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
    props.setDisabled("pointer-events-none");
    axios
      .post(`http://localhost:8000/api/quize/${quizeState.algorithm}`, {
        answers: answers,
        algorithm: quizeState.algorithm,
        questionsType: quizeState.currentQuestionType,
        id: currentQuestionId,
        uid: firebase.auth().currentUser.uid
      })
      .then((result) => {
        Object.keys(result.data).map((key, idx) => {
          document.getElementById(key).className = result.data[key]
            ? "border-2 w-full flex justify-center font-semibold bg-green-100"
            : "border-2 w-full flex justify-center font-semibold bg-red-100";
        });
      });
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
              id={index}
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
export default Question;
