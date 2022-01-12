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
  const optionsAlgorithms = ["BFS", "DFS", "Dijkstra", "Astar"];
  const optionsMazes = ["Recursive Division", "Iterativ", "Valami"];
  const optionsSpeed = ["Fast", "Normal", "Slow"];
  const optionsType = ["Empty", "Grass", "Water", "Stone"];
  const optionDistance = [
    "Euclidean",
    "Manhattan",
    "Chebyshev",
    "Euclidean-mine",
  ];
  const [algorithm, setAlgorithm] = useState("");
  const [maze, setMaze] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const [speed, setSpeed] = useState(10);
  const [distanceFormula, setDistanceFormula] = useState("Euclidean");

  const [grid, setGrid, type, setType, dispatchGridEvent] =
    useContext(GridContext);

  const handleClearBoard = () => {
    dispatchGridEvent("CLEAR_BOARD", {
      conditions: ["node-start", "node-finish"],
    });
  };

  const handleVisualizeMaze = (maze) => {
    dispatchGridEvent("VISUALIZE_MAZE", {
      maze: maze,
      conditions: ["node-start", "node-finish"],
    });
  };

  const handleDistanceFormula = (distanceFormula) => {
    axios.post("http://localhost:8000/changeDistance", {
      distance: distanceFormula,
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
            conditions: ["node-start", "node-finish", "node-wall", "node-type"],
          });
          setTimeout(() => {
            // ezt mindenképpen meg kellene csinálni mindengyik elemre is
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
      <Dropdown
        name="Distance Formula"
        options={optionDistance}
        setVariable={setDistanceFormula}
        function={handleDistanceFormula}
      />
      <Button name="Clear Board" function={handleClearBoard} />
      <Button name="Struktograms" />
      <Button
        name="Visualize"
        isVisualize="true"
        algorithmName={algorithm}
        function={handleVisualize}
        isDisabled={isDisabled}
        id="visualize"
      />
      <Dropdown
        name="Algorithms"
        options={optionsAlgorithms}
        setVariable={setAlgorithm}
      >
        {/* <Dropdown name="" options={optionDistance} className="p-9 m-9" /> */}
        {/* <ThirdLevelDropdown name="Distance" options={optionDistance} /> */}
      </Dropdown>
      <Dropdown
        name="Maze"
        options={optionsMazes}
        maze={maze}
        setVariable={setMaze}
        function={handleVisualizeMaze}
      />
      <Dropdown
        name="Speed"
        options={optionsSpeed}
        speed={speed}
        setVariable={setSpeed}
      />
      <Dropdown
        name="Type"
        options={optionsType}
        type={type}
        setVariable={setType}
      />
    </nav>
  );
};

export default NavBar;
