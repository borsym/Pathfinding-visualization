import React from "react";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { animateAlgorithm } from "../functions/animate.js";
import Button from "./Button";
import Dropdown from "./Dropdown";

import "react-toastify/dist/ReactToastify.css";
import "../index.css";

const START_NODE_ROW = 10;
const START_NODE_COL = 15;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 35;

const NavBar = ({ setGrid, grid }) => {
  // , setAlgorithm, algorithm
  const optionsAlgorithms = ["BFS", "DFS", "Dijkstra", "A*"];
  const optionsMazes = ["Rekurziv", "Iterativ", "Valami"];
  const optionsSpeed = ["Fast", "Normal", "Slow"];
  const optionsType = ["Dirt", "Water", "Stone"];
  const [algorithm, setAlgorithm] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const [speed, setSpeed] = useState(10);
  // useEffect(() => {
  //   setAlgorithm("");
  // }, [setAlgorithm]);
  // function animateAlgorithm(
  //   visitedNodesInOrder,
  //   nodesInShortestPathOrder,
  //   speed
  // ) {
  //   //   // ez már fix nem ide kell...
  //   for (let i = 0; i <= visitedNodesInOrder.length; i++) {
  //     if (i === visitedNodesInOrder.length) {
  //       // eljutot a végére...
  //       setTimeout(() => {
  //         animateShortestPath(nodesInShortestPathOrder);
  //       }, speed * i);
  //       return;
  //     }
  //     setTimeout(() => {
  //       const node = visitedNodesInOrder[i];
  //       document.getElementById(`node-${node[0]}-${node[1]}`).className =
  //         "node-style bg-visited-node-blue animate-fillBoxVisited";
  //     }, speed * i);
  //   }
  // }

  // function animateShortestPath(nodesInShortestPathOrder) {
  //   for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
  //     setTimeout(() => {
  //       const node = nodesInShortestPathOrder[i];
  //       document.getElementById(`node-${node[0]}-${node[1]}`).className =
  //         "node-style bg-yellow-100";
  //     }, 50 * i);
  //   }
  // }

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
          setIsDisabled(true);
          animateAlgorithm(res.data.path, res.data.shortestPath, speed);
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

  // this works for now but it need to be refactored such as the grid getInitial Grid function, maybe this function need to be liftied up into the App.js
  const getInitialGrid = () => {
    for (let row = 0; row < 20; row++) {
      for (let col = 0; col < 50; col++) {
        document.getElementById(`node-${row}-${col}`).className = "node-style";
      }
    }
    setGrid(grid);
  };

  const createNode = (col, row) => {
    return {
      col,
      row,
      isStart: row === START_NODE_ROW && col === START_NODE_COL,
      isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
      distance: Infinity,
      isVisited: false,
      isWall: false,
      previousNode: null,
    };
  };

  return (
    <nav className="flex justify-center items-center mx-auto bg-slate-800 p-4">
      <ToastContainer />
      <Button name="Valami" />
      <Button name="Valami" />
      <Button name="Clear Board" function={getInitialGrid} />
      <Button name="Struktograms" />
      <Button
        name="Visualize"
        isVisualize="true"
        algorithmName={algorithm}
        function={handleVisualize}
        isDisabled={isDisabled}
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
