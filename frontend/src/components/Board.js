import React from "react";

const Board = (props) => {
  const drop = (e) => {
    e.preventDefault();
    const cardIdx = e.dataTransfer.getData("cardIdx");

    const card = document.getElementById(cardIdx);
    card.style.display = "block";

    e.target.appendChild(card);
  };

  const dragOver = (e) => {
    e.preventDefault();
  };
  return (
    <div
      id={props.id}
      onDrop={drop}
      onDragOver={dragOver}
      className={props.className}
    >
      {props.children}
    </div>
  );
};

export default Board;
