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
  useEffect(() => {
    setTimeout(() => {
      setShowModal(true);
    }, 500);
  }, []);

  return (
    <GridProvider>
      {/* <ModalTutorial showModal={showModal} setShowModal={setShowModal} /> */}
      <QuestionProvider>
        <NavBar algorithm={algorithm} setAlgorithm={setAlgorithm} />
      </QuestionProvider>
      <Legend algorithm={algorithm} />
      <Grid />
    </GridProvider>
  );
}
