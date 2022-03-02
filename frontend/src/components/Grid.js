/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { GridContext } from "../contexts/GridContext";
import errorMessage from "../functions/ErrorMessage";
import Node from "./Node";

const Grid = () => {
  const [grid, setGrid, type, setType, dispatch, isVisualize, setIsVisualize] =
    useContext(GridContext);
  const [mouseIsPressed, setMouseIsPressed] = useState(false);
  const [changes, setChanges] = useState([]); // sends to the server the changes
  const [isControl, setIsControl] = useState(false); // if the CTRL is pressed
  const [isMoveStartEnd, setIsMoveStartEnd] = useState(false); // if the start or end is moved
  const [StartOrEnd, setStartOrEnd] = useState(""); // start or end is moved
  const [prevStart, setPrevStart] = useState({ row: -1, col: -1 }); // previous start position

  useEffect(() => {
    // refresh the page and put everything back to initial state
    window.onbeforeunload = function () {
      saveFormData();
      return null;
    };

    function saveFormData() {
      axios.post("http://localhost:8000/", {
        is_refreshed: true,
      });
    }
  }, []);

  const handleMouseDown = (e, row, col) => {
    // bit bugy
    if (isVisualize) return;
    if (e.target.id.includes("start") || e.target.id.includes("end")) {
      setChanges([...changes, { row, col }]);
      setStartOrEnd(e.target.id.includes("start") ? "start" : "end");
      setPrevStart({ row, col });
      setMouseIsPressed(true);
      setIsMoveStartEnd(true);
    } else {
      setIsControl(e.ctrlKey === true || isControl);
      const firstControl = e.ctrlKey === true || isControl;
      setChanges([...changes, { row, col }]);
      const newGrid = getNewGridWithWallToggled(
        grid,
        row,
        col,
        firstControl,
        type
      );
      setGrid(newGrid);
      setMouseIsPressed(true);
    }
  };

  const handleMouseEnter = (e, row, col) => {
    if (!mouseIsPressed || isVisualize) return;

    if (isMoveStartEnd) {
      setPrevStart({ row, col });
      const newGrid =
        StartOrEnd === "start"
          ? getNewGridMovedStart(grid, row, col, true, prevStart)
          : getNewGridMovedEnd(grid, row, col, true);
      setGrid(newGrid);
    } else {
      setIsControl(e.ctrlKey === true || isControl);

      setChanges([...changes, { row, col }]);
      const newGrid = getNewGridWithWallToggled(
        grid,
        row,
        col,
        isControl,
        type
      );
      setGrid(newGrid);
    }
  };

  const handleMouseUp = (e) => {
    // check if the paramter row and col is in the changes arrey
    //remove all duplicated elements from the changes array
    setMouseIsPressed(false);
    if (isMoveStartEnd) {
      axios
        .post("http://localhost:8000/api/moveStartEnd", {
          start: [parseInt(changes[0].row), parseInt(changes[0].col)], // innen indult ki
          end: [
            // ide raktam le
            StartOrEnd === "start"
              ? parseInt(getStartPosition(grid).row)
              : parseInt(getEndPosition(grid).row),
            StartOrEnd === "start"
              ? parseInt(getStartPosition(grid).col)
              : parseInt(getEndPosition(grid).col),
          ],
          type: StartOrEnd === "start" ? -1 : -2,
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
          setIsMoveStartEnd(false);
          setStartOrEnd("");
        });
    } else {
      let unique = [];
      const counts = {};
      for (let i = 0; i < changes.length; i++) {
        if (counts[changes[i].row + "-" + changes[i].col]) {
          counts[changes[i].row + "-" + changes[i].col] = null;
        } else {
          counts[changes[i].row + "-" + changes[i].col] = 1;
        }
      }

      for (let key in counts) {
        if (counts[key]) {
          unique.push([
            parseInt(key.split("-")[0]),
            parseInt(key.split("-")[1]),
          ]);
        }
      }

      axios
        .post("http://localhost:8000/api/wallUpdate", {
          cordinates: unique,
          type: isControl ? type : 99999, // bad practie 999...
        })
        .then(function (response) {})
        .catch(function () {
          errorMessage("A szerver nem elérhető!");
        })
        .finally(function () {
          setChanges([]);
          setIsControl(false);
          setMouseIsPressed(false);
          setIsMoveStartEnd(false);
        });
    }
    return;
  };

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
                    type={parseInt(type)}
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
  if (node.isFinish || node.isStart) {
    return newGrid;
  }

  const newNode = {
    ...node,
  };

  isControl
    ? newNode.type === type
      ? (newNode.type = 0)
      : (newNode.type = type)
    : (newNode.isWall =
        !node.isWall && // ezt innen lehet törölni kell documenteset...
        !document
          .getElementById(`node-${row}-${col}`)
          .className.includes("wall"));

  newGrid[row][col] = newNode;
  if (!newNode.isWall) {
    // ez nem teljesen így kéne erre más ötlet kell (hafalat generálok és kiszedem ez arra van)
    document.getElementById(`node-${row}-${col}`).className = "node node-style";
  }
  return newGrid;
};

const getStartPosition = (grid) => {
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      if (grid[row][col].isStart) {
        return { row, col };
      }
    }
  }
  return { row: -1, col: -1 };
};

const getEndPosition = (grid) => {
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      if (grid[row][col].isFinish) {
        return { row, col };
      }
    }
  }
  return { row: -1, col: -1 };
};

const getNewGridMovedStart = (grid, row, col, current, prevStart) => {
  const newGrid = grid.slice();
  console.log("row: " + row + " col: " + col);
  console.log("prevStart: " + prevStart.row + " " + prevStart.col);

  const prevNode = newGrid[prevStart.row][prevStart.col];
  const newPrevNode = {
    ...prevNode,
    isStart: !current,
  };

  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isStart: current,
  };

  newGrid[prevStart.row][prevStart.col] = newPrevNode;
  newGrid[row][col] = newNode;

  return newGrid;
};

const getNewGridMovedEnd = (grid, row, col, current) => {
  const newGrid = grid.slice();
  for (let i = 0; i < newGrid.length && current; i++) {
    for (let j = 0; j < newGrid[i].length; j++) {
      if (newGrid[i][j].isFinish) {
        newGrid[i][j].isFinish = false;
      }
    }
  }
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isFinish: current,
  };
  newGrid[row][col] = newNode;
  return newGrid;
};

export default Grid;
