/* eslint-disable no-unused-vars */
import Button from "../Button";
import Question from "./Question";
import { QuestionContext } from "../../contexts/QuestionsContext";
import React, { useContext, useState } from "react";

const Quize = () => {
  const [questionState, dispatch] = useContext(QuestionContext);
  const [disabled, setDisabled] = useState("");

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
        <Question disabled={disabled} setDisabled={setDisabled} />
        <div className="float-right">
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
    </div>
  );
};

export default Quize;
