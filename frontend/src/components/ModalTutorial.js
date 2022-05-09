import React, { useState } from "react";
import Card from "./Card";
import { AiOutlineClose } from "react-icons/ai";
import DataTutorial from "../Data/DataTutorial";
import PropTypes from "prop-types";

const cardsidx = [0, 1, 2, 3, 4, 5, 6, 7]; // how many tutorial cards do i have
const ModalTutorial = (props) => {
  const [counter, setCounter] = useState(0);
  const handleButtonClick = (value) => {
    let max = cardsidx.length - 1;
    counter + value < 0
      ? setCounter(0)
      : counter + value > max
      ? setCounter(max)
      : setCounter(counter + value);
  };

  return props.showModal ? (
    <div className="fixed top-0 left-0 w-full h-screen bg-grey-800 flex justify-center items-center -mt-[90px] z-10">
      <div className="relative p-8 w-full max-w-3xl max-h-[38rem] md:min-h-[24rem] bg-zinc-100 rounded-md border-2 border-black sm:min-w-0 min-h-0">
        <AiOutlineClose
          key="Close"
          id="profileClose"
          onClick={() => {
            props.setShowModal(false);
            setCounter(0);
          }}
          className="cursor-pointer absolute top-5 right-5 w-8 h-8 p-0 z-10"
        />
        <p className="cursor-pointer absolute top-5 left-5 w-8 h-8 p-0 z-10">
          {counter + 1}/{cardsidx.length}
        </p>

        <Card cardIdx={counter} data={DataTutorial} key="Card" />

        <button
          onClick={() => handleButtonClick(-1)}
          className="absolute bottom-0 left-0 m-2 btn-tutorial"
        >
          Previouse{" "}
        </button>
        {counter === cardsidx.length - 1 ? (
          <button
            onClick={() => {
              props.setShowModal(false);
              setCounter(0);
            }}
            className="absolute bottom-0 right-0 btn-tutorial m-2 bg-red-800"
          >
            Close{" "}
          </button>
        ) : (
          <button
            onClick={() => handleButtonClick(1)}
            className="absolute bottom-0 right-0 btn-tutorial m-2"
          >
            Next{" "}
          </button>
        )}
        {props.children}
      </div>
    </div>
  ) : (
    ""
  );
};

ModalTutorial.propTypes = {
  showModal: PropTypes.bool.isRequired,
  setShowModal: PropTypes.func.isRequired,
  children: PropTypes.node,
};

export default ModalTutorial;
