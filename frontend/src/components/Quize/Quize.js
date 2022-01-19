import React, { useContext } from "react";
import { QuizeContext } from "../../contexts/QuizeContext";
import Question from "./Question";
const Quize = () => {
  const [quizeState, dispatch] = useContext(QuizeContext);
  console.log(quizeState);
  return (
    <div className="quize">
      {(!quizeState.showResults && (
        <div>
          <div className="score">
            Question {quizeState.currentQuestionIndex + 1} /
            {quizeState.questions.length}
          </div>
          <Question />
          <div
            className="next-button"
            onClick={() => dispatch({ type: "NEXT_QUESTION" })}
          >
            Next Question
          </div>
        </div>
      )) || (
        <div className="results">
          <div>Congrat</div>
          <div>
            {quizeState.correctAnswerCount} of {quizeState.questions.length}
          </div>
          <div
            className="next-button"
            onClick={() => dispatch({ type: "RESTART" })}
          >
            Restart
          </div>
        </div>
      )}
    </div>
  );
};

export default Quize;
