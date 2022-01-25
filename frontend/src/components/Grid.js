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
  const [isMoveStartEnd, setIsMoveStartEnd] = useState(false);
  const [StartOrEnd, setStartOrEnd] = useState("");

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
    console.log(e.target.id);
    if (e.target.id.includes("start") || e.target.id.includes("end")) {
      console.log("bent vagoyk");
      setChanges([...changes, { row, col }]);
      setStartOrEnd(e.target.id.includes("start") ? "start" : "end");
      const newGrid = e.target.id.includes("start")
        ? getNewGridMovedStart(grid, row, col, false)
        : getNewGridMovedEnd(grid, row, col, false);
      setGrid(newGrid);
      setMouseIsPressed(true);
      setIsMoveStartEnd(true);
    } else {
      if (e.ctrlKey === true && !isControl) {
        setIsControl(true);
      }

      setChanges([...changes, { row, col }]);
      const newGrid = getNewGridWithWallToggled(
        grid,
        row,
        col,
        isControl,
        type
      );
      setGrid(newGrid);
      setMouseIsPressed(true);
    }
  };

  const handleMouseEnter = (e, row, col) => {
    if (!mouseIsPressed) return;

    if (isMoveStartEnd) {
      const newGrid =
        StartOrEnd === "start"
          ? getNewGridMovedStart(grid, row, col, true)
          : getNewGridMovedEnd(grid, row, col, true);
      setGrid(newGrid);
    } else {
      if (e.ctrlKey === true && !isControl) {
        //itt is kell ez mivel akkor lerak egy falat ha ez nincs meg
        setIsControl(true);
      }
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
    if (isMoveStartEnd) {
      axios
        .post("http://localhost:8000/moveStart", {
          start: [parseInt(changes[0].row), parseInt(changes[0].col)],
          end: [
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
    }
    setMouseIsPressed(false);
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
        setIsMoveStartEnd(false);
      });
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
  isControl
    ? newNode.type === type
      ? (newNode.type = 0)
      : (newNode.type = type)
    : (newNode.isWall = !node.isWall);
  // console.log(newNode);
  newGrid[row][col] = newNode;
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
// ezt a kettot mergelni kéne
const getNewGridMovedStart = (grid, row, col, current) => {
  const newGrid = grid.slice();
  for (let i = 0; i < newGrid.length && current; i++) {
    for (let j = 0; j < newGrid[i].length; j++) {
      if (newGrid[i][j].isStart) {
        newGrid[i][j].isStart = false;
      }
    }
  }
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isStart: current,
  };
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
