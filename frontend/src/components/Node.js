import React from "react";
import "../Node.css";

const Node = (props) => {
  const {
    col,
    row,
    isFinish,
    isStart,
    isWall,
    onMouseDown,
    onMouseEnter,
    onMouseUp,
    type, // mivel ez egy szám ennek függvényébe majd ki kell kalkulnánom milyen szín fog oda kerülni gondolom én
  } = props;
  const extraClassName = isFinish
    ? "node-finish bg-red-500"
    : isStart
    ? "node-start bg-green-500"
    : isWall
    ? "node-wall bg-wall-blue animate-fillBox"
    : type === "10" || type === 10 // sometimes the frontend get 10 as a string sometimes as a number but with 20 and 30 only str
    ? "node-type bg-green-900 animate-fillBox"
    : type === "20"
    ? "node-type bg-blue-900 animate-fillBox"
    : type === "30"
    ? "node-type bg-neutral-400 animate-fillBox"
    : "";

  return (
    <div
      id={`node-${row}-${col}`}
      className={`node ${extraClassName} node-style`}
      onMouseDown={(e) => onMouseDown(e, row, col)}
      onMouseEnter={(e) => onMouseEnter(e, row, col)}
      onMouseUp={(e) => onMouseUp(e)}
    ></div>
  );
};

export default Node;
