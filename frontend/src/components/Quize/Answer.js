import React from "react";

const Answer = (props) => {
  const letterMapping = ["A", "B", "C", "D"];
  return (
    <div
      className={`p-3 bg-white flex justify-start  cursor-pointer  `}
      onClick={() => props.onSelectAnswer(props.answerText)}
    >
      <div className="p-2 border-2 bg-slate-800 border-transparent text-white">
        {letterMapping[props.index]}
      </div>
      <div
        id={props.id}
        className={`border-2 w-full flex justify-center font-semibold`}
      >
        {props.answerText}
      </div>
    </div>
  );
};

export default Answer;
