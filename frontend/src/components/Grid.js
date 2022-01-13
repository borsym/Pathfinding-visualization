import React, { useState, useEffect, useContext } from "react";
import Node from "./Node";
import { GridContext } from "../contexts/GridContext";
import axios from "axios";

// const START_NODE_ROW = 10;
// const START_NODE_COL = 15;
// const FINISH_NODE_ROW = 10;
// const FINISH_NODE_COL = 35;

const Grid = () => {
  const [grid, setGrid, type, setType] = useContext(GridContext);
  const [mouseIsPressed, setMouseIsPressed] = useState(false);
  const [changes, setChanges] = useState([]);
  const [isControl, setIsControl] = useState(false);

  useEffect(() => {
    window.onbeforeunload = function () {
      saveFormData();
      return null;
    };

    function saveFormData() {
      console.log("saved ");
      axios.post("http://localhost:8000/", {
        is_refreshed: true,
      });
    }
  }, []);

  const handleMouseDown = (e, row, col) => {
    console.log(e);
    if (e.ctrlKey === true && !isControl) {
      setIsControl(true);
    }

    setChanges([...changes, { row, col }]);
    const newGrid = getNewGridWithWallToggled(grid, row, col, isControl, type);
    setGrid(newGrid);
    setMouseIsPressed(true);
  };

  const handleMouseEnter = (e, row, col) => {
    // itt lehet felesleges átpasszolni az eventet
    if (e.ctrlKey === true && !isControl) {
      //itt is kell ez mivel akkor lerak egy falat ha ez nincs meg
      setIsControl(true);
    }
    if (!mouseIsPressed) return;

    setChanges([...changes, { row, col }]);
    const newGrid = getNewGridWithWallToggled(grid, row, col, isControl, type);
    setGrid(newGrid);
  };

  const handleMouseUp = (e) => {
    // check if the paramter row and col is in the changes arrey
    //remove all duplicated elements from the changes array
    let unique = [];
    const counts = {};
    console.log(changes);
    for (let i = 0; i < changes.length; i++) {
      if (counts[changes[i].row + "-" + changes[i].col]) {
        counts[changes[i].row + "-" + changes[i].col] = null;
      } else {
        counts[changes[i].row + "-" + changes[i].col] = 1;
      }
    }
    //setChanges([]);
    // get the not null elements from the counts dictioanry
    for (let key in counts) {
      if (counts[key]) {
        unique.push([parseInt(key.split("-")[0]), parseInt(key.split("-")[1])]);
      }
    }
    // console.log(unique);

    axios
      .post("http://localhost:8000/wallUpdate", {
        cordinates: unique,
        type: isControl ? type : 99999, // bad practie 999...
      })
      .then(function (response) {})
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {
        console.log(isControl);
        setChanges([]);
        setIsControl(false);
        setMouseIsPressed(false);
      });
  };

  // function visualizeDijkstra() {
  //   const { grid } = this.state;
  //   const startNode = grid[START_NODE_ROW][START_NODE_COL];
  //   const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
  //   const visitedNodesInOrder = [1]; //dijkstra(grid, startNode, finishNode);
  //   const nodesInShortestPathOrder = [1]; //getNodesInShortestPathOrder(finishNode);
  //   this.animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
  // }

  return (
    <div className="flex justify-center">
      <div className="mt-5" id="grid">
        {grid.map((row, rowIdx) => {
          return (
            <div key={rowIdx} className="space-y-0 bg-white leading-none">
              {row.map((node, nodeIdx) => {
                const { row, col, isFinish, isStart, isWall, type } = node;
                return (
                  <Node
                    key={nodeIdx}
                    col={col}
                    row={row}
                    isFinish={isFinish}
                    isStart={isStart}
                    isWall={isWall}
                    mouseIsPressed={mouseIsPressed}
                    type={type}
                    onMouseDown={(e, row, col) => handleMouseDown(e, row, col)}
                    onMouseEnter={(e, row, col) =>
                      handleMouseEnter(e, row, col)
                    }
                    onMouseUp={(e) => handleMouseUp(e)}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const getNewGridWithWallToggled = (grid, row, col, isControl, type) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
  };
  isControl ? ( newNode.type === type ? newNode.type = 0 : newNode.type = type) : (newNode.isWall = !node.isWall);
  // console.log(newNode);
  newGrid[row][col] = newNode;
  return newGrid;
};

export default Grid;
