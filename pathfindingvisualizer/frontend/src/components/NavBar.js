import React from "react";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

import Button from "./Button";
import Dropdown from "./Dropdown";

import "react-toastify/dist/ReactToastify.css";
import "../index.css";

const START_NODE_ROW = 10;
const START_NODE_COL = 15;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 35;

export default function NavBar({ setGrid, grid }) {
  const optionsAlgorithms = ["BFS", "DFS", "Dijkstra", "A*"];
  const optionsMazes = ["Rekurziv", "Iterativ", "Valami"];
  const optionsSpeed = ["Fast", "Normal", "Slow"];
  const optionsType = ["Dirt", "Water", "Stone"];
  const [algorithm, setAlgorithm] = useState("");

  // this works for now but it need to be refactored such as the grid getInitial Grid function, maybe this function need to be liftied up into the App.js
  const getInitialGrid = () => {
    const grid = [];
    for (let row = 0; row < 20; row++) {
      const currentRow = [];
      for (let col = 0; col < 50; col++) {
        currentRow.push(createNode(col, row));
      }
      grid.push(currentRow);
    }
    setGrid(grid);
  };

  const notify = () =>
    !algorithm &&
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
        function={notify}
        // className=" bg-cyan-600 hover:bg-cyan-500 hover:text-blue-800"
      />
      <Dropdown
        name="Algorithms"
        options={optionsAlgorithms}
        setAlgorithm={setAlgorithm}
      />
      <Dropdown name="Maze" options={optionsMazes} />
      <Dropdown name="Speed" options={optionsSpeed} />
      <Dropdown name="Type" options={optionsType} />
    </nav>
  );
}
