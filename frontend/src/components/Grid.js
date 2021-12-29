import React from "react";
import Node from "./Node";
import { useState, useEffect } from "react";
// import {dijkstra, getNodesInShortestPathOrder} from '../algorithms/dijkstra';

const START_NODE_ROW = 10;
const START_NODE_COL = 15;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 35;

export default function Grid({ setGrid, grid }) {
  const [mouseIsPressed, setMouseIsPressed] = useState(false);
  useEffect(() => {
    setGrid(getInitialGrid());
  }, [setGrid]);

  const handleMouseDown = (row, col) => {
    const newGrid = getNewGridWithWallToggled(grid, row, col);
    setGrid(newGrid);
    setMouseIsPressed(true);
  };

  const handleMouseEnter = (row, col) => {
    if (!mouseIsPressed) return;
    const newGrid = getNewGridWithWallToggled(grid, row, col);
    setGrid(newGrid);
  };

  const handleMouseUp = () => {
    setMouseIsPressed(false);
  };

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

  // ennek fixen itt kell lennie át kell rakni anavbarból TODO!!!! FIX

  // function animateShortestPath(nodesInShortestPathOrder) {
  //   for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
  //     setTimeout(() => {
  //       const node = nodesInShortestPathOrder[i];
  //       document.getElementById(`node-${node.row}-${node.col}`).className =
  //         "node node-shortest-path";
  //     }, 50 * i);
  //   }
  // }

  function visualizeDijkstra() {
    const { grid } = this.state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = [1]; //dijkstra(grid, startNode, finishNode);
    const nodesInShortestPathOrder = [1]; //getNodesInShortestPathOrder(finishNode);
    this.animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
  }

  return (
    <div className="flex justify-center">
      {/* <button onClick={() => this.visualizeDijkstra()}>
          Visualize Dijkstra's Algorithm
        </button> */}
      <div className="mt-5">
        {grid.map((row, rowIdx) => {
          return (
            <div key={rowIdx} className="space-y-0 bg-white leading-none">
              {row.map((node, nodeIdx) => {
                const { row, col, isFinish, isStart, isWall } = node;
                return (
                  <Node
                    key={nodeIdx}
                    col={col}
                    row={row}
                    isFinish={isFinish}
                    isStart={isStart}
                    isWall={isWall}
                    mouseIsPressed={mouseIsPressed}
                    onMouseDown={(row, col) => handleMouseDown(row, col)}
                    onMouseEnter={(row, col) => handleMouseEnter(row, col)}
                    onMouseUp={() => handleMouseUp()}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}

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

const getNewGridWithWallToggled = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isWall: !node.isWall,
  };
  newGrid[row][col] = newNode;
  return newGrid;
};
