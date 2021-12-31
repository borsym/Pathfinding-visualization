import Legend from "./components/Legend";
import NavBar from "./components/NavBar";
import Grid from "./components/Grid";
import { useState, useEffect } from "react";
import { GridProvider } from "./contexts/GridContext";
import axios from "axios";

export default function App() {
 

  return (
    <GridProvider>
      <NavBar
      // setAlgorithm={setAlgorithm}
      // algorithm={algorithm}
      />
      <Legend />
      <Grid />
    </GridProvider>
  );
}
