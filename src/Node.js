import React, { Component } from "react";
import "./Node.css";

export default function Node(props) {
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
    ? "node-wall bg-black"
    : "";

  return (
    <div
      id={`node-${row}-${col}`}
      className={`node ${extraClassName} node-style`}
      onMouseDown={() => onMouseDown(row, col)}
      onMouseEnter={() => onMouseEnter(row, col)}
      onMouseUp={() => onMouseUp()}
    ></div>
  );
}
