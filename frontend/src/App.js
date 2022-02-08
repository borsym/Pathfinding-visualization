import Legend from "./components/Legend";
import NavBar from "./components/NavBar";
import Grid from "./components/Grid";
import React, { useState, useEffect } from "react";
import { GridProvider } from "./contexts/GridContext";
import ModalTutorial from "./components/ModalTutorial";
import { QuestionProvider } from "./contexts/QuestionsContext";
export default function App() {
  const [showModal, setShowModal] = useState(false);
  const [algorithm, setAlgorithm] = useState("");

  // Modal tutorial
  useEffect(() => {
    setTimeout(() => {
      setShowModal(true);
    }, 500);
  }, []);

  return (
    // Grid provider for shareing the grid between every component
    <GridProvider>
      {/* modal tutorial */}
      {/* <ModalTutorial showModal={showModal} setShowModal={setShowModal} /> */}
      {/* sharing the questions between different components in the question segment */}
      <QuestionProvider>
        <NavBar algorithm={algorithm} setAlgorithm={setAlgorithm} />
      </QuestionProvider>
      <Legend algorithm={algorithm} />{" "}
      {/* legend showing a little description to the algorithm */}
      <Grid />
    </GridProvider>
  );
}
