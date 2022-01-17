import Legend from "./components/Legend";
import NavBar from "./components/NavBar";
import Grid from "./components/Grid";
import Dnd from "./components/DnD/Dnd";
import React, { useState, useEffect } from "react";
import { GridProvider } from "./contexts/GridContext";
import ModalTutorial from "./components/ModalTutorial";
import Blank from "./components/DnD/Blank";

export default function App() {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShowModal(true);
    }, 500);
  }, []);

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

    // <GridProvider>
    //   {/* <ModalTutorial showModal={showModal} setShowModal={setShowModal} /> */}
    //   <NavBar />
    //   <Legend />
    //   <Grid />
    // </GridProvider>
  );
}
