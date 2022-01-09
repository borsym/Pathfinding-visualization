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
  } = props;
  const extraClassName = isFinish
    ? "node-finish bg-red-500"
    : isStart
    ? "node-start bg-green-500"
    : isWall
    ? "node-wall bg-wall-blue animate-fillBoxWall"
    : "";

  return (
    <div
      id={`node-${row}-${col}`}
      className={`node ${extraClassName} node-style`}
      onMouseDown={(e) => onMouseDown(e, row, col)}
      onMouseEnter={(e) => onMouseEnter(e, row, col)}
      onMouseUp={() => onMouseUp()}
    ></div>
  );
};

export default Node;
