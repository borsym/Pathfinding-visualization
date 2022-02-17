import React, { useContext, useState } from "react";
import { QuestionContext } from "../../contexts/QuestionsContext";
import Button from "../Button";
import Question from "./Question";
const Quize = () => {
  const [questionState, dispatch] = useContext(QuestionContext);
  const [disabled, setDisabled] = useState("");

  // console.log("questionstate", questionState);
  // console.log("kerdesek", questionState.questions);
  const clearPreviousResult = () => {
    setDisabled("");
    for (let i = 0; i < 4; i++) {
      document.getElementById(i).className =
        "border-2 w-full flex justify-center font-semibold";
    }
  };
  return (
    <div className="quize">
      <div>
        <div className="flex justify-center">
          <div className="bg-blue-100 p-2 font-bold">
            Question {questionState.currentQuestionIndex + 1}/
            {Object.keys(questionState.questions.quize).length}
          </div>
        </div>
        <Question disabled={disabled} setDisabled={setDisabled} />
        <div className="flex justify-end "></div>
        <Button
          name="Next"
          questionSection={true}
          function={() => {
            clearPreviousResult();
            dispatch({ type: "NEXT_QUESTION" });
          }}
        />
      </div>
    </div>
  );
};

export default Quize;
