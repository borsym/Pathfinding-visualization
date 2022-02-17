import React from "react";

const Answer = (props) => {
  const letterMapping = ["A", "B", "C", "D"];
  const disabledClass = props.currentAnswer ? "pointer-events-none" : ""; // ezt valahogy bele kell rakni, egyszer bekapcsolódik utána bent is marad, ugyhogy a nextel majd valamit művelni kell
  return (
    <div
      className={`p-3 bg-white flex justify-start  cursor-pointer  `}
      onClick={() => props.onSelectAnswer(props.answerText)}
    >
      <div className="p-2 border-2 bg-blue-500 border-transparent">
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
