import React, { useState, createContext } from "react";
const START_NODE_ROW = 10;
const START_NODE_COL = 15;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 35;

export const GridContext = createContext();

export const GridProvider = (props) => {
  const [grid, setGrid] = useState(getInitialGrid());

  const dispatchGridEvent = (actionType, payload) => {
    switch (actionType) {
      case "CLEAR_BOARD":
        setGrid(getInitialGrid()); // nope it doesn't affect the on every element only just the walls, i want this to be affected by the visited nodes too
        return;
      case "VISUALIZE_ALGORITHM":
        animateAlgorithm(payload.path, payload.shortestPath, payload.speed);
        return;
      case "VISUALIZE_MAZE":
        return;
      default:
        return;
    }
  };
  return (
    <GridContext.Provider value={[grid, setGrid, dispatchGridEvent]}>
      {props.children}
    </GridContext.Provider>
  );
};

const getInitialGrid = () => {
  const grid = [];
  for (let row = 0; row < 20; row++) {
    const currentRow = [];
    for (let col = 0; col < 50; col++) {
      currentRow.push(createNode(col, row));
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
  //   // ez már fix nem ide kell...
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
        "node-style bg-yellow-100";
    }, 50 * i);
  }
}
