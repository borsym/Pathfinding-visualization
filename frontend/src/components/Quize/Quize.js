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
          <div className="flex justify-center">
            <div className="bg-blue-100 p-2 font-bold">
              Question {quizeState.currentQuestionIndex + 1}/
              {quizeState.questions.length}
            </div>
          </div>
          <Question />
          <div className="flex justify-end ">
            <button
              className="px-4 py-3 leading-none font-semibold rounded-lg bg-gray-300 text-gray-900 hover:bg-gray-400"
              onClick={() => dispatch({ type: "NEXT_QUESTION" })}
            >
              Next Question{" "}
            </button>
          </div>
        </div>
      )) || (
        <div className="results">
          <div>Congrat</div>
          <div>
            {quizeState.correctAnswerCount} of {quizeState.questions.length}
          </div>
          <div>
            <button
              onClick={() => dispatch({ type: "RESTART" })}
              className=" ml-4 px-6 py-3 leading-none font-semibold rounded-lg bg-gray-800 text-white hover:bg-gray-900"
            >
              Restart{" "}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Quize;
