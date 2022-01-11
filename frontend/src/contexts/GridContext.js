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

  const dispatchGridEvent = async (actionType, payload) => {
    switch (actionType) {
      case "CLEAR_BOARD":
        cleareBoard(payload.conditions);
        return;
      case "VISUALIZE_ALGORITHM":
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
      value={[grid, setGrid, type, setType, dispatchGridEvent]}
    >
      {props.children}
    </GridContext.Provider>
  );
};

const cleareBoard = async (conditions) => {
  // clear the board
  clearPreviousVisualization(conditions);
  await axios.post("http://localhost:8000/", {
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

const anmiteMaze = async (maze, conditions) => {
  cleareBoard(conditions);
  let order = [];
  await axios.get(`http://localhost:8000/${maze}`).then((res) => {
    order = res.data.order;
  });
  console.log(order);

  for (let i = 0; i < order.length; i++) {
    setTimeout(() => {
      const node = order[i];
      document.getElementById(`node-${node[0]}-${node[1]}`).className =
        "node-style node-wall bg-wall-blue animate-fillBox";
    }, 15 * i);
  }
};

function animateAlgorithm(
  visitedNodesInOrder,
  nodesInShortestPathOrder,
  speed
) {
  let conditions = ["node-type"];
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
      if (
        !conditions.some((e) =>
          document
            .getElementById(`node-${node[0]}-${node[1]}`)
            .classList.value.includes(e)
        )
      ) {
        document.getElementById(`node-${node[0]}-${node[1]}`).className =
          "node-style bg-visited-node-blue animate-fillBoxVisited";
      } else {
        // if the condition is true make the node background color overlapp with the bg-visited-node-blue
        // const color = document
        //   .getElementById(`node-${node[0]}-${node[1]}`)
        //   .className.match(/[a-z]+-[0-9]+/g);
        document.getElementById(`node-${node[0]}-${node[1]}`).className =
          "node-style bg-visited-node-blue animate-fillBoxVisited";
        // document.getElementById(
        //   `node-${node[0]}-${node[1]}`
        // ).className = `node-style bg-gradient-to-r from-visited-node-blue/90 to-${color}`;  // this is not cool, i have
      }
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
