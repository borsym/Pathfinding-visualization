import React, { useContext, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
// import { animateAlgorithm } from "../functions/animate.js";
import Button from "./Button";
import Dropdown from "./Dropdown";
import { GridContext } from "../contexts/GridContext.js";
import "react-toastify/dist/ReactToastify.css";
import "../index.css";

// const START_NODE_ROW = 10;
// const START_NODE_COL = 15;
// const FINISH_NODE_ROW = 10;
// const FINISH_NODE_COL = 35;

const NavBar = () => {
  // , setAlgorithm, algorithm
  const optionsAlgorithms = ["BFS", "DFS", "Dijkstra", "A*"];
  const optionsMazes = ["Rekurziv", "Iterativ", "Valami"];
  const optionsSpeed = ["Fast", "Normal", "Slow"];
  const optionsType = ["Dirt", "Water", "Stone"];
  const [algorithm, setAlgorithm] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const [speed, setSpeed] = useState(10);
  const [grid, setGrid, dispatchGridEvent] = useContext(GridContext);

  const handleClearBoard = () => {
    dispatchGridEvent("CLEAR_BOARD", {
      conditions: ["node-start", "node-finish"],
    });
  };

  const handleVisualize = () => {
    if (!algorithm) {
      toast.warn("You have to pick an algorithm!", {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
      axios
        .get(`http://localhost:8000/${algorithm}`)
        .then((res) => {
          //console.log(res.data.path);
          setIsDisabled(true);
          dispatchGridEvent("VISUALIZE_ALGORITHM", {
            path: res.data.path,
            shortestPath: res.data.shortestPath,
            speed: speed,
            conditions: ["node-start", "node-finish", "node-wall"],
          });
          setTimeout(() => {
            setIsDisabled(false);
          }, speed * res.data.path.length + 50 * res.data.shortestPath.length);
        })
        .catch((err) => {
          console.log(err);
          console.log(algorithm);
        });
    }
  };

  return (
    <nav className="flex justify-center items-center mx-auto bg-slate-800 p-4">
      <ToastContainer />
      <Button name="Valami" />
      <Button name="Valami" />
      <Button name="Clear Board" function={handleClearBoard} />
      <Button name="Struktograms" />
      <Button
        name="Visualize"
        isVisualize="true"
        algorithmName={algorithm}
        function={handleVisualize}
        isDisabled={isDisabled}
        id="visualize"
        // className=" bg-cyan-600 hover:bg-cyan-500 hover:text-blue-800"
      />
      <Dropdown
        name="Algorithms"
        options={optionsAlgorithms}
        setVariable={setAlgorithm}
      />
      <Dropdown name="Maze" options={optionsMazes} />
      <Dropdown
        name="Speed"
        options={optionsSpeed}
        speed={speed}
        setVariable={setSpeed}
      />
      <Dropdown name="Type" options={optionsType} />
    </nav>
  );
};

export default NavBar;
