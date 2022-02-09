import axios from "axios";
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
  // const sendValuesBackend = (answers) => {

  // };

  const getValuesFromSelect = (e) => {
    console.log("hello");
    const answers = Object.keys(currentQuestion)
      .map((key, idx) => {
        if (key !== "img") {
          let select = document.getElementById(key);
          let value = select.options[select.selectedIndex].value;
          //return `${value}-${key}`; // lehet elég csak a value-t adni
          return value;
        }
      })
      .filter((answer) => answer !== undefined);

    axios.post(`http://localhost:8000/api/dropdown/${quizeState.algorithm}`, {
      answers: answers,
      algorithm: quizeState.algorithm,
      idx: quizeState.currentQuestionIndex,
    });
  };
  return (
    <>
      <div>{currentQuestion.img}</div> {/* itt a kep lesz */}
      {/* <label for="cars">Choose a car:</label> */}
      {Object.keys(currentQuestion).map(
        (key, idx) =>
          key !== "img" && (
            <select name={key} id={key} className="flex p-1 m-1">
              {currentQuestion[key].map((question, index) => (
                <option value={question}>{question}</option>
              ))}
            </select>
          )
      )}
      <button
        className="px-4 py-3 leading-none font-semibold rounded-lg bg-gray-300 text-gray-900 hover:bg-gray-400"
        onClick={getValuesFromSelect}
      >
        Submit
      </button>
    </>
  );
};

export default DropdownQuestion;
