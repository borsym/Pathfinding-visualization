import React, { useState } from "react";
import Button from "./Button";
import Card from "./Card";
import { AiOutlineClose } from "react-icons/ai";
import DataTutorial from "./DataTutorial";

const cardsidx = [0, 1, 2, 3];
const Modal = (props) => {
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
  return props.showModal ? (
    <div className="fixed top-0 left-0 w-full h-screen bg-grey-800 flex justify-center items-center">
      <div className="relative p-8 w-full max-w-3xl max-h-[28rem] bg-zinc-100 rounded-md border-2 border-black">
        <AiOutlineClose
          onClick={() => props.setShowModal(false)}
          className="cursor-pointer absolute top-5 right-5 w-8 h-8 p-0 z-10"
        />
        {cardsidx.map(
          (idx) => counter === idx && <Card cardIdx={idx} data={DataTutorial} />
        )}
        <button onClick={() => handleButtonClick(-1)}>previouse </button>
        <button onClick={() => handleButtonClick(1)}>next </button>
        {props.children}
      </div>
    </div>
  ) : (
    ""
  );
};

export default Modal;
