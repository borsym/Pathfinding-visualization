/* eslint-disable react/prop-types */
import React, { useEffect, useRef, useState } from "react";
import Confetti from "react-confetti";

export default function OverConfetti() {
  const [height, setHeight] = useState(null);
  const [width, setWidth] = useState(null);
  const [show, setShow] = useState(true);
  const confettiRef = useRef(null);

  useEffect(() => {
    setHeight(confettiRef.current.clientHeight);
    setWidth(confettiRef.current.clientWidth);
  }, []);

  const handleShow = (toggle) => {
    setShow(toggle);
    console.log(width);
    console.log(height);
  };

  return (
    <div>
      <div
        onMouseEnter={() => handleShow(true)}
        onMouseLeave={() => handleShow(false)}
        className="p-20"
        ref={confettiRef}
      >
        <Confetti
          run={show}
          recycle={show}
          numberOfPieces={80}
          width={width}
          height={height}
        />
      </div>
    </div>
  );
}
