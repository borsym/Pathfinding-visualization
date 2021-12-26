import "./App.css";
import Legend from "./Legend";
import NavBar from "./NavBar";
import Grid from "./Grid";
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
