import React, { useContext } from "react";
import { QuizeContext } from "../../contexts/QuizeContext";
import Answer from "./Answer";
// ezt inkább backendbe kéne leküldeni
const Question = () => {
  const [quizeState, dispatch] = useContext(QuizeContext);
  const currentQuestion = quizeState.questions[quizeState.currentQuestionIndex];
  return (
    <div>
      <div className="flex justify-center font-semibold text-2xl">
        {currentQuestion.question}
      </div>
      <div className="grid grid-flow-row auto-rows-max bg-red-100">
        {quizeState.answers.map((answer, index) => (
          <Answer
            answerText={answer}
            key={index}
            index={index}
            currentAnswer={quizeState.currentAnswer}
            correctAnswer={currentQuestion.correctAnswer}
            onSelectAnswer={(answerText) =>
              dispatch({ type: "SELECT_ANSWER", payload: answerText })
            }
          />
        ))}
      </div>
    </div>
  );
};
export default Question;
