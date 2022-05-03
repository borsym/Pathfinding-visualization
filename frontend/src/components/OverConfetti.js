/* eslint-disable react/prop-types */
import React, { useEffect, useRef, useState } from "react";
import Confetti from "react-confetti";

// Showing confetti rain after the user solved the puzzle with max score
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
