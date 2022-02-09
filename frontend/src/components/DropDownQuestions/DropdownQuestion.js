import axios from "axios";
import React, { useContext } from "react";
import { QuestionContext } from "../../contexts/QuestionsContext";
const DropdownQuestion = () => {
  const [quizeState, dispatch] = useContext(QuestionContext);
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const currentQuestion = Object.keys(
    quizeState.questions[quizeState.currentQuestionType]
  )
    .map((id, idx) => {
      if (idx === quizeState.currentQuestionIndex) {
        return quizeState.questions[quizeState.currentQuestionType][id];
      }
    })
    .filter((question) => question !== undefined)[0];

  const clearAllBg = () => {
    Object.keys(currentQuestion).map((key, idx) => {
      if (key !== "img") {
        document.getElementById(key).className = "flex p-1 m-1";
      }
    });
  };

  const getValuesFromSelect = () => {
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

    axios
      .post(`http://localhost:8000/api/dropdown/${quizeState.algorithm}`, {
        answers: answers,
        algorithm: quizeState.algorithm,
        idx: quizeState.currentQuestionIndex,
      })
      .then((result) => {
        // console.log("ez a result", result.data);
        Object.keys(currentQuestion).map((key, idx) => {
          if (key !== "img") {
            // console.log("idx", idx);
            // console.log("resultidx", result.data[idx - 1]);
            // console.log(document.getElementById(key));
            document.getElementById(key).className = result.data[idx - 1]
              ? "flex p-1 m-1 bg-green-100"
              : "flex p-1 m-1 bg-red-100";
            // document.getElementById(key).class = " bg-green-100";
          }
        });
      });

    setIsSubmitted(true);
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
      {!isSubmitted ? (
        <button
          className="px-4 py-3 leading-none font-semibold rounded-lg bg-gray-300 text-gray-900 hover:bg-gray-400"
          onClick={getValuesFromSelect}
        >
          Submit
        </button>
      ) : (
        <button
          className="px-4 py-3 leading-none font-semibold rounded-lg bg-gray-300 text-gray-900 hover:bg-gray-400"
          onClick={() => {
            dispatch({ type: "NEXT_QUESTION" });
            setIsSubmitted(false);
            clearAllBg();
          }}
        >
          Next
        </button>
      )}
    </>
  );
};

export default DropdownQuestion;
