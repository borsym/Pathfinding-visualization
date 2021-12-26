import "./App.css";
import Legend from "./Legend";
import NavBar from "./NavBar";
import Grid from "./Grid";
import { useState } from "react";
export default function App() {
  // const [grid, setGrid] = useState([]);

  return (
    <>
      <NavBar />
      <Legend />
      <Grid />
    </>
  );
}
