import axios from "axios";
import React, { createContext, useState } from "react";
import PropTypes from "prop-types";
import errorMessage from "../functions/ErrorMessage";
import warningMessage from "../functions/WarningMessage";
import { PATH } from "../fileWithConstan";
const START_NODE_ROW = 10;
const START_NODE_COL = 15;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 35;

export const GridContext = createContext();

export const GridProvider = (props) => {
  const [grid, setGrid] = useState(getInitialGrid());
  const [type, setType] = useState(3); // current weight, what we are putting when pressing control
  const [isVisualize, setIsVisualize] = useState(false); // if we are visualizing the grid is disabled

  // communication between components
  const dispatchGridEvent = async (actionType, payload) => {
    switch (actionType) {
      case "CLEAR_BOARD":
        clearBoard(grid);
        cleareBoard(payload.conditions);
        return;
      case "VISUALIZE_ALGORITHM":
        if (payload.shortestPath.length === 0) {
          warningMessage("There is no path to the finish!");
        }
        clearPreviousVisualization(payload.conditions);
        animateAlgorithm(payload.path, payload.shortestPath, payload.speed);
        return;
      case "VISUALIZE_MAZE":
        anmiteMaze(payload.maze, payload.conditions);
        return;
      default:
        return;
    }
  };
  return (
    <GridContext.Provider
      value={[
        grid,
        setGrid,
        type,
        setType,
        dispatchGridEvent,
        isVisualize,
        setIsVisualize,
      ]}
    >
      {props.children}
    </GridContext.Provider>
  );
};

GridProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

const cleareBoard = async (conditions) => {
  // clear the board
  clearPreviousVisualization(conditions);
  await axios
    .post(`${PATH}/api/clearForMaze`, {
      // indicated the clear
      is_refreshed: true,
    })
    .catch(() => {
      errorMessage("A szerver nem elérhető!");
    });
};

const clearPreviousVisualization = (conditions) => {
  for (let row = 0; row < 20; row++) {
    for (let col = 0; col < 50; col++) {
      const node = document.getElementById(`node-${row}-${col}`);
      if (!conditions.some((e) => node.classList.value.includes(e))) {
        node.className = "node-style";
      }
    }
  }
};

const clearBoard = (grid) => {
  for (let row = 0; row < 20; row++) {
    for (let col = 0; col < 50; col++) {
      grid[row][col].isWall = false;
    }
  }
};

const getInitialGrid = () => {
  const grid = [];
  for (let row = 0; row < 20; row++) {
    const currentRow = [];
    for (let col = 0; col < 50; col++) {
      const node = createNode(col, row);
      currentRow.push(node);
    }
    grid.push(currentRow);
  }
  return grid;
};

const createNode = (col, row) => {
  return {
    col,
    row,
    isStart: row === START_NODE_ROW && col === START_NODE_COL,
    isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
    isWall: false,
  };
};

const anmiteMaze = (maze, conditions) => {
  clearPreviousVisualization(conditions);
  for (let i = 0; i < maze.length; i++) {
    setTimeout(() => {
      const node = maze[i];
      document.getElementById(`node-${node[0]}-${node[1]}`).className =
        "node-style node-wall bg-wall-blue animate-fillBox";
    }, 20 * i);
  }
};

function animateAlgorithm(
  visitedNodesInOrder,
  nodesInShortestPathOrder,
  speed
) {
  for (let i = 0; i <= visitedNodesInOrder.length; i++) {
    if (i === visitedNodesInOrder.length) {
      // if the visited nodes are all finished then the animation is the shortest path
      setTimeout(() => {
        animateShortestPath(nodesInShortestPathOrder);
      }, speed * i);
      return;
    }
    setTimeout(() => {
      const node = visitedNodesInOrder[i];
      document.getElementById(`node-${node[0]}-${node[1]}`).className =
        "node-style bg-visited-node-blue animate-fillBoxVisited";
    }, speed * i);
  }
}

function animateShortestPath(nodesInShortestPathOrder) {
  for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
    setTimeout(() => {
      const node = nodesInShortestPathOrder[i];
      document.getElementById(`node-${node[0]}-${node[1]}`).className =
        "node-style bg-yellow-200";
    }, 50 * i);
  }
}
