import React from "react";
import Blank from "./DnD/Blank";
import Dnd from "./DnD/Dnd";
const DndQuestion = () => {
  return (
    <>
      {" "}
      <Dnd
        taskId="dnd-1"
        words={["logaritmikus", "negyzetes", "sulyozott", "nem sulyozott"]}
      >
        Ez egy teszt mi itt a valasz: <Blank solution={["negyzetes"]} /> ha
        behuztad akkor huzd mar be ide is pls{" "}
        <Blank solution={["sulyozott", "cica"]} /> nagyon ugyes vagy
      </Dnd>
    </>
  );
};

export default DndQuestion;
