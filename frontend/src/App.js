import "./App.css";
import Legend from "./components/Legend";
import NavBar from "./components/NavBar";
import Grid from "./components/Grid";
import { useState, useEffect } from "react";
import axios from "axios";

export default function App() {
  const [grid, setGrid] = useState([[]]); // i would like to use this in the navbar and in the grid
  //const [algorithm, setAlgorithm] = useState(""); // i really dont think this is the right place for this

  // useEffect(() => {
  //   axios
  //     .get(`http://localhost:8000/${algorithm}`)
  //     .then((res) => {
  //       console.log(res.data.path);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       console.log(algorithm);
  //     });
  // }, [algorithm]);

  return (
    <>
      <NavBar
        setGrid={setGrid}
        grid={grid}
        // setAlgorithm={setAlgorithm}
        // algorithm={algorithm}
      />
      <Legend />
      <Grid setGrid={setGrid} grid={grid} />
      {/* <h1>{msg}</h1> */}
    </>
  );
}
