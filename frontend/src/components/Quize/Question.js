import React, { useContext } from "react";
import { QuizeContext } from "../../contexts/QuizeContext";
import Answer from "./Answer";

const Question = () => {
  const [quizeState, dispatch] = useContext(QuizeContext);
  const currentQuestion = quizeState.questions[quizeState.currentQuestionIndex];
  return (
    <div>
      <div className="question">{currentQuestion.question}</div>
      <div className="answers">
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
