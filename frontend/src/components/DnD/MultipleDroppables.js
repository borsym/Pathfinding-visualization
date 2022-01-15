import React from "react";
import Droppable from "./Droppable";
const MultipleDroppables = () => {
  const droppables = ["1", "2", "3", "4"];

  return (
    <section>
      {droppables.map((id) => (
        <Droppable id={id} key={id}>
          Droppable container id: ${id}
        </Droppable>
      ))}
    </section>
  );
};

export default MultipleDroppables;
