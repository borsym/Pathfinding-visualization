import React, { useContext } from "react";
import { QuestionContext } from "../../contexts/QuestionsContext";
import Answer from "./Answer";
// ezt inkább backendbe kéne leküldeni
const Question = () => {
  const [quizeState, dispatch] = useContext(QuestionContext);
  const currentQuestion = quizeState.questions[quizeState.currentQuestionIndex];
  console.log("--");
  console.log("current", currentQuestion);
  console.log("--");
  return (
    <div>
      <div className="flex justify-center font-semibold text-2xl">
        {currentQuestion.question}
      </div>
      <div className="grid grid-flow-row auto-rows-max bg-red-100">
        {currentQuestion.incorrectAnswers.map((answer, index) => (  // options
          <Answer
            answerText={answer}
            key={index}
            index={index}
            currentAnswer={quizeState.currentAnswer}
            correctAnswer={quizeState.correctAnswer}
            onSelectAnswer={(answerText) =>
              dispatch({ type: "SELECT_ANSWER", payload: answerText })
            }
          />
        ))}
      </div>
    </div>
  );
};
export default Question;
