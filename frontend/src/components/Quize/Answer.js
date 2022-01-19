import React from "react";

const Answer = (props) => {
  const letterMapping = ["A", "B", "C", "D"];
  const isCorrectAnswer =
    props.currentAnswer && props.answerText === props.correctAnswer;
  const isWrongAnswer =
    props.currentAnswer === props.answerText &&
    props.currentAnswer !== props.correctAnswer;
  const correctAnswerClass = isCorrectAnswer ? "bg-green-500" : "";
  const wrongAnswerClass = isWrongAnswer ? "bg-red-500" : "";
  console.log(props.currentAnswer);
  const disabledClass = props.currentAnswer ? "pointer-events-none" : "";
  return (
    <div
      className={`p-3 bg-white flex justify-start  cursor-pointer   ${disabledClass}`}
      onClick={() => props.onSelectAnswer(props.answerText)}
    >
      <div className="p-2 border-2 bg-blue-500 border-transparent">
        {letterMapping[props.index]}
      </div>
      <div
        className={`border-2 w-full flex justify-center font-semibold  ${correctAnswerClass} ${wrongAnswerClass}`}
      >
        {props.answerText}
      </div>
    </div>
  );
};

export default Answer;
