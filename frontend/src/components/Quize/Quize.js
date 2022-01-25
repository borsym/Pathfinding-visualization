import React, { useContext } from "react";
import { QuestionContext } from "../../contexts/QuestionsContext";
import Question from "./Question";
const Quize = () => {
  const [questionState, dispatch] = useContext(QuestionContext);
  console.log("questionstate", questionState);
  console.log("kerdesek", questionState.questions);
  return (
    <div className="quize">
      <div>
        <div className="flex justify-center">
          <div className="bg-blue-100 p-2 font-bold">
            Question {questionState.currentQuestionIndex + 1}/
            {questionState.questions.length}
          </div>
        </div>
        <Question />
        <div className="flex justify-end "></div>
      </div>
    </div>
  );
};

export default Quize;
