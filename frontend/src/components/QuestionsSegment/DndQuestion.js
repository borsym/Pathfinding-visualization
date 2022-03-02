/* eslint-disable no-unused-vars */
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
    // in the database we have "@@@" meaning a blank
    return currentQuestion.question[key] === "@@@" ? (
      <Blank id={idx} />
    ) : (
      currentQuestion.question[key] + " "
    );
  });

  return (
    <>
      <Dnd
        taskid={parseInt(quizeState.currentQuestionIndex)}
        words={currentQuestion.answers}
        key={parseInt(quizeState.currentQuestionIndex)}
        currentQuestionId={currentQuestionId}
      >
        {text}
      </Dnd>
    </>
  );
};

export default DndQuestion;
