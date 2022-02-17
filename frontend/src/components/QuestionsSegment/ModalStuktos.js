import React, { useState, useContext } from "react";
import Button from "../Button";
import Card from "../Card";
import { AiOutlineClose } from "react-icons/ai";
import { QuestionContext } from "../../contexts/QuestionsContext";

const cardsidx = [0, 1, 2, 3, 4];
const ModalStuktos = (props) => {
  const [questionState, dispatch] = useContext(QuestionContext);
  const [counter, setCounter] = useState(0);
  const handleButtonClick = (value) => {
    let max = cardsidx.length - 1;
    counter + value < 0
      ? setCounter(0)
      : counter + value > max
      ? setCounter(max)
      : setCounter(counter + value);
    console.log(counter);
  };
  // nem reszponziv
  return props.showModal ? (
    <div className="fixed top-0 left-0 w-full h-screen bg-grey-800 flex justify-center items-center -mt-[90px] z-10">
      <div className="relative p-8 w-full max-w-3xl max-h-[38rem] md:min-h-[24rem] bg-zinc-100 rounded-md border-2 border-black sm:min-w-0 min-h-0">
        <AiOutlineClose
          onClick={() => {
            props.setShowModal(false);
            setCounter(0);
            dispatch({ type: "RESTART" });
          }}
          className="cursor-pointer absolute top-5 right-5 w-8 h-8 p-0 z-10"
        />
        {props.children}
      </div>
    </div>
  ) : (
    ""
  );
};

export default ModalStuktos;
