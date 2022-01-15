import Legend from "./components/Legend";
import NavBar from "./components/NavBar";
import Grid from "./components/Grid";
import Dnd from "./components/DnD/Dnd";
import React, { useState, useEffect } from "react";
import { GridProvider } from "./contexts/GridContext";
import ModalTutorial from "./components/ModalTutorial";

export default function App() {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShowModal(true);
    }, 500);
  }, []);

  return (
    <Dnd></Dnd>
    // <GridProvider>
    //   {/* <ModalTutorial showModal={showModal} setShowModal={setShowModal} /> */}
    //   <NavBar />
    //   <Legend />
    //   <Grid />
    // </GridProvider>
  );
}
