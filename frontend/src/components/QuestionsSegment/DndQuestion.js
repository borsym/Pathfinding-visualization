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
  const [quizeState, dispatch] = useContext(QuestionContext);
  console.log("questionstate", quizeState.questions);
  const currentQuestion = Object.keys(
    quizeState.questions[quizeState.currentQuestionType]
  )
    .map((id, idx) => {
      if (idx === quizeState.currentQuestionIndex) {
        return quizeState.questions[quizeState.currentQuestionType][id];
      }
    })
    .filter((question) => question !== undefined)[0];

  console.log("currentq", currentQuestion.answers);
  // console.log("text", currentQuestion.question);
  const text = Object.keys(currentQuestion.question).map((key, idx) => {
    if (currentQuestion.question[key] === "@@@") {
      return <Blank id={idx} />;
    } else {
      return currentQuestion.question[key] + " ";
    }
  });
  // const currentData = questions[idx][0][algorithm];
  //<Blank id={blank-2} /> --- @@@
  // console.log("text2", text);
  return (
    <>
      <Dnd
        taskid={quizeState.currentQuestionIndex}
        words={currentQuestion.answers}
        key={quizeState.currentQuestionIndex}
      >
        {text}
      </Dnd>
    </>
  );
};

export default DndQuestion;
