import { array } from "prop-types";
import React, { useContext } from "react";
import { QuestionContext } from "../../contexts/QuestionsContext";
const DropdownQuestion = () => {
  const [quizeState, dispatch] = useContext(QuestionContext);

  const currentQuestion = Object.keys(
    quizeState.questions[quizeState.currentQuestionType]
  )
    .map((id, idx) => {
      if (idx === quizeState.currentQuestionIndex) {
        return quizeState.questions[quizeState.currentQuestionType][id];
      }
    })
    .filter((question) => question !== undefined)[0];

  //   console.log(currentQuestion);
  //   Object.keys(currentQuestion).map((key, idx) => {
  //     console.log("key,idx", key, idx);
  //     if (key !== "img") {
  //       console.log("kerdesek", currentQuestion[key]);
  //       currentQuestion[key].map((answer, index) => {
  //         console.log("answer", answer);
  //         console.log("index", index);
  //       });
  //     }

  //     // for (const q of currentQuestion[key]) {
  //     //   console.log(q);
  //     // }
  //   });

  return (
    <>
      <div>{currentQuestion.img}</div> {/* itt a kep lesz */}
      <form action="">
        {/* <label for="cars">Choose a car:</label> */}
        {Object.keys(currentQuestion).map(
          (key, idx) =>
            key !== "img" && (
              <select name={key} id={key}>
                {currentQuestion[key].map((question, index) => (
                  <option value={question}>{question}</option>
                ))}
              </select>
            )
        )}

        <input type="submit" value="Submit" />
      </form>
    </>
  );
};

export default DropdownQuestion;
