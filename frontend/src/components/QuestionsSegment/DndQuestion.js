import Blank from "../DnD/Blank";
import Dnd from "../DnD/Dnd";
import { QuestionContext } from "../../contexts/QuestionsContext";
import React, { useContext } from "react";

const DndQuestion = () => {
  const [quizeState, dispatch] = useContext(QuestionContext);
  let currentQuestionId = null;
  const currentQuestion = Object.keys(
    quizeState.questions[quizeState.currentQuestionType]
  )
    .map((id, idx) => {
      if (idx === quizeState.currentQuestionIndex) {
        currentQuestionId = id;
        return quizeState.questions[quizeState.currentQuestionType][id];
      }
    })
    .filter((question) => question !== undefined)[0];

  const text = Object.keys(currentQuestion.question).map((key, idx) => {
    if (currentQuestion.question[key] === "@@@") {
      return <Blank id={idx} />;
    } else {
      return currentQuestion.question[key] + " ";
    }
  });
  
  return (
    <>
      <Dnd
        taskid={quizeState.currentQuestionIndex}
        words={currentQuestion.answers}
        key={quizeState.currentQuestionIndex}
        currentQuestionId={currentQuestionId}
      >
        {text}
      </Dnd>
    </>
  );
};

export default DndQuestion;
