import React, { useContext } from "react";
import { QuestionContext } from "../../contexts/QuestionsContext";
import Answer from "./Answer";
import axios from "axios";


// ezt inkább backendbe kéne leküldeni
const Question = () => {
  const [quizeState, dispatch] = useContext(QuestionContext);
  const currentQuestion = Object.keys(quizeState.questions.quize)
    .map((id, idx) => {
      if (idx === quizeState.currentQuestionIndex) {
        return quizeState.questions.quize[id];
      }
    })
    .filter((question) => question !== undefined)[0];

  const handleSelectAnswer = async (answer) => {
    const solution = await axios
      .get(`http://localhost:8000/api/solutions/${quizeState.algorithm}`)  // itt inkább le kéne küldenem a választ kés visszakapni rá egy eredményt hogy true vagy false
      .then(
        (result) =>
          Object.keys(result.data[quizeState.currentQuestionType])
            .map((id, idx) => {
              if (idx === quizeState.currentQuestionIndex) {
                return result.data[quizeState.currentQuestionType][id];
              }
            })
            .filter((question) => question !== undefined)[0]
      );
    dispatch({ type: "SET_ANSWER", payload: { answer, solution } });
  };
  // questionState.currentQuestionIndex + 1;
  console.log("current", currentQuestion);
  // console.log("--");
  // Object.keys(quizeState.questions.quize).map((id, idx) => {
  //   // <p>{questionState.questions.dnd[id].answers.join(" ")}</p>
  //   console.log("idx", idx);
  //   console.log("id", id);
  //   console.log("kerdes", quizeState.questions.quize[id]);
  // });dispatch({ type: "SELECT_ANSWER", payload: answerText })
  // console.log("--");

  return (
    <div>
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
              answerText={answer}
              key={index}
              index={index}
              currentAnswer={quizeState.currentAnswer}
              correctAnswer={quizeState.correctAnswer}
              onSelectAnswer={(answerText) => handleSelectAnswer(answerText)}
            />
          )
        )}
      </div>
    </div>
  );
};
export default Question;
