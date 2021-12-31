import Legend from "./components/Legend";
import NavBar from "./components/NavBar";
import Grid from "./components/Grid";
import { useState, useEffect } from "react";
import { GridProvider } from "./contexts/GridContext";
import axios from "axios";

export default function App() {
  // i would like to use this in the navbar and in the grid
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
