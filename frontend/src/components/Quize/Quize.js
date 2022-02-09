import React, { useContext } from "react";
import { QuestionContext } from "../../contexts/QuestionsContext";
import Question from "./Question";
const Quize = () => {
  const [questionState, dispatch] = useContext(QuestionContext);
  // console.log("questionstate", questionState);
  // console.log("kerdesek", questionState.questions);
  return (
    <div className="quize">
      <div>
        <div className="flex justify-center">
          <div className="bg-blue-100 p-2 font-bold">
            Question {questionState.currentQuestionIndex + 1}/
            {Object.keys(questionState.questions.quize).length}
          </div>
        </div>
        <Question />
        <div className="flex justify-end "></div>
        <button
          className="px-4 py-3 leading-none font-semibold rounded-lg bg-gray-300 text-gray-900 hover:bg-gray-400"
          onClick={() => {
            dispatch({ type: "NEXT_QUESTION" });
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Quize;
