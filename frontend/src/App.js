import "./App.css";
import Legend from "./components/Legend";
import NavBar from "./components/NavBar";
import Grid from "./components/Grid";
import { useState } from "react";

export default function App() {
  const [grid, setGrid] = useState([[]]); // i would like to use this in the navbar and in the grid

  return (
    <>
      <NavBar setGrid={setGrid} grid={grid} />
      <Legend />
      <Grid setGrid={setGrid} grid={grid} />
    </>
  );
}
