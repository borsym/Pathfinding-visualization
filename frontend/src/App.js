import Legend from "./components/Legend";
import NavBar from "./components/NavBar";
import Grid from "./components/Grid";
import React from "react";
import { GridProvider } from "./contexts/GridContext";

export default function App() {
  return (
    <GridProvider>
      <NavBar />
      <Legend />
      <Grid />
    </GridProvider>
  );
}
