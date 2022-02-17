import React from "react";
import { useDroppable } from "@dnd-kit/core";

const DroppableContainer = (props) => {
  // ide fogok dobálni
  const { setNodeRef, id } = useDroppable({
    // isOver megváltozik a megjelenése ha draggable köré ér
    // over ebből foogm az idt kikapni
    id: props.id,
  });
  // console.log("dropable", props.id);
  // const isOverContainer =
  return (
    <div id={props.id} ref={setNodeRef} className={`blank-style bg-slate-600`}>
      {props.children ? (
        props.children
      ) : (
        <div className="flex content-center h-full">&nbsp;</div>
      )}
    </div>
  );
};

export default DroppableContainer;
