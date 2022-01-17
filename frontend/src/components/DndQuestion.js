import React from "react";
import Blank from "./DnD/Blank";
import Dnd from "./DnD/Dnd";
import DataDnd from "../Data/DataDnd";
const questions = DataDnd;
const DndQuestion = ({ idx, algorithm }) => {
  // get the text from the questions array by the idx and algorithm, is it good practice?
  const currentData = questions[idx][0][algorithm];

  return (
    <>
      <Dnd taskId={currentData.taskId} words={currentData.words}>
        {currentData.text}
      </Dnd>
    </>
  );
};

export default DndQuestion;
