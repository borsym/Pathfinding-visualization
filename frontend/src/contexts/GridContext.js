import axios from "axios";
import React, { useState, createContext } from "react";
const START_NODE_ROW = 10;
const START_NODE_COL = 15;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 35;

export const GridContext = createContext();

export const GridProvider = (props) => {
  const [grid, setGrid] = useState(getInitialGrid());
  const [type, setType] = useState(10);

  const dispatchGridEvent = (actionType, payload) => {
    switch (actionType) {
      case "CLEAR_BOARD":
        cleareBoard(payload.conditions);
        return;
      case "VISUALIZE_ALGORITHM":
        clearPreviousVisualization(payload.conditions);
        animateAlgorithm(payload.path, payload.shortestPath, payload.speed);
        return;
      case "VISUALIZE_MAZE":
        return;
      default:
        return;
    }
  };
  return (
    <GridContext.Provider
      value={[grid, setGrid, type, setType, dispatchGridEvent]}
    >
      {props.children}
    </GridContext.Provider>
  );
};

const cleareBoard = (conditions) => {
  // clear the board
  clearPreviousVisualization(conditions);
  axios.post("http://localhost:8000/", {
    // indicated the clear
    is_refreshed: true,
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
    distance: Infinity,
    isVisited: false,
    isWall: false,
    previousNode: null,
  };
};

function animateAlgorithm(
  visitedNodesInOrder,
  nodesInShortestPathOrder,
  speed
) {
  for (let i = 0; i <= visitedNodesInOrder.length; i++) {
    if (i === visitedNodesInOrder.length) {
      // eljutot a végére...
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
