import React from "react";

const Answer = (props) => {
  const letterMapping = ["A", "B", "C", "D"];
  const isCorrectAnswer =
    props.currentAnswer && props.answerText === props.correctAnswer;
  const isWrongAnswer =
    props.currentAnswer === props.answerText &&
    props.currentAnswer !== props.correctAnswer;
  const correctAnswerClass = isCorrectAnswer ? "correct" : "";
  const wrongAnswerClass = isWrongAnswer ? "wrong" : "";
  const disabledClass = props.currentAnswer ? "disabled" : "";
  return (
    <div
      className={`answer ${correctAnswerClass} ${wrongAnswerClass} ${disabledClass}`}
      onClick={() => props.onSelectAnswer(props.answerText)}
    >
      <div>{letterMapping[props.index]}</div>
      <div>{props.answerText}</div>
    </div>
  );
};

export default Answer;
