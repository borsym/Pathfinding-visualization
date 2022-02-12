import React from "react";
import { useDroppable } from "@dnd-kit/core";

const DroppableContainer = (props) => {
  // ide fogok dobálni
  const { setNodeRef, id } = useDroppable({
    // isOver megváltozik a megjelenése ha draggable köré ér
    // over ebből foogm az idt kikapni
    id: props.id,
  });
  // const isOverContainer =
  return (
    <div
      ref={setNodeRef}
      className={`min-w-[150px] min-h-[40px] p-1 mt-1 mb-1 border-2 inline-block rounded-md border-inherit  ${
        typeof props.isCorrect === "boolean"
          ? props.isCorrect
            ? "bg-green-100"
            : "bg-red-700"
          : "bg-slate-600"
      } `}
    >
      {props.children ? (
        props.children
      ) : (
        <div className="flex content-center h-full">&nbsp;</div>
      )}
    </div>
  );
};

export default DroppableContainer;
