import React, { useContext } from "react";
import Blank from "../DnD/Blank";
import Dnd from "../DnD/Dnd";
import DataDnd from "../../Data/DataDnd";
import { QuestionContext } from "../../contexts/QuestionsContext";
const questions = DataDnd; // ezt a backendből kell megkapni

/*
megkapom az algoritmus nevét
kérés packendneg get/questionDnd/{algorithm}
megkapom az adatokat és az alapján fogok tovább iterálni
*/
const DndQuestion = () => {
  // get the text from the questions array by the idx and algorithm, is it good practice?
  const [questionState, dispatch] = useContext(QuestionContext);
  // const currentData = questions[idx][0][algorithm];

  return (
    <>
      hello -
      {questionState.correctAnswerCount}
      {/* <Dnd taskId={currentData.taskId} words={currentData.words}>
        {currentData.text}
      </Dnd> */}
    </>
  );
};

export default DndQuestion;
