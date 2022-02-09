import React, { useContext, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

import Button from "./Button";
import Dropdown from "./Dropdown";
import ModalStuktos from "./QuestionsSegment/ModalStuktos";
import DndQuestion from "./QuestionsSegment/DndQuestion";
import Quize from "./Quize/Quize";
import { GridContext } from "../contexts/GridContext.js";
import DropdownQuestion from "./DropDownQuestions/DropdownQuestion";
import "react-toastify/dist/ReactToastify.css";
import "../index.css";
import { QuestionContext } from "../contexts/QuestionsContext";

const NavBar = ({ algorithm, setAlgorithm }) => {
  const optionsAlgorithms = ["Astar", "Dijkstra", "BFS", "DFS"];
  const optionsMazes = ["Recursive Division", "Iterativ", "Valami"];
  const optionsSpeed = ["Fast", "Normal", "Slow"];
  const optionsType = ["Empty [0]", "Grass [10]", "Water [20]", "Stone [30]"];
  const optionDistance = [
    "Euclidean",
    "Manhattan",
    "Chebyshev",
    "Euclidean-mine",
  ];

  const [maze, setMaze] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const [speed, setSpeed] = useState(10);
  const [distanceFormula, setDistanceFormula] = useState("Euclidean");
  const [showModal, setShowModal] = useState(false);
  const [grid, setGrid, type, setType, dispatchGridEvent] =
    useContext(GridContext);
  const [questionState, dispatchQuestion] = useContext(QuestionContext);

  const handleClearBoard = () => {
    dispatchGridEvent("CLEAR_BOARD", {
      conditions: ["node-start", "node-finish"],
    });
  };

  const handleVisualizeMaze = (maze) => {
    setIsDisabled(true);
    dispatchGridEvent("VISUALIZE_MAZE", {
      maze: maze,
      conditions: ["node-start", "node-finish"],
    });
    setTimeout(() => {
      // ezt mindenképpen meg kellene csinálni mindengyik elemre is
      setIsDisabled(false);
    }, ((0 + 10 * 15) * 93) / 2); // a probléma az hogy nem férek hozzá az order.lenght-hez ezért nem tudom a képlettel kiszámítani, erre kell egy ötlet.. statekkel vagy átrendezni a függvényhívásokat
  };

  const handleDistanceFormula = (distanceFormula) => {
    axios.post("http://localhost:8000/api/changeDistance", {
      distance: distanceFormula,
    });
  };

  const warningMessage = () => {
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
  };

  const handleVisualize = () => {
    if (!algorithm) {
      warningMessage();
    } else {
      axios
        .get(`http://localhost:8000/api/${algorithm}`)
        .then((res) => {
          setIsDisabled(true);
          dispatchGridEvent("VISUALIZE_ALGORITHM", {
            path: res.data.path,
            shortestPath: res.data.shortestPath,
            speed: speed,
            conditions: ["node-start", "node-finish", "node-wall", "node-type"],
          });
          setTimeout(() => {
            // ezt mindenképpen meg kellene csinálni mindengyik elemre is
            setIsDisabled(false);
          }, speed * res.data.path.length + 50 * res.data.shortestPath.length);
        })
        .catch((err) => {
          console.log(err);
          console.log(algorithm);
        });
    }
  };

  // const handleGetQuestions = () => {
  //   dispatchQuestion({ type: "GET_QUESTIONS", payload: algorithm });
  //   setShowModal(true);
  // };

  const handleGetQuestions = async (algorithm) => {
    const questions = await axios.get(
      `http://localhost:8000/api/questions/${algorithm}`
    );
    // .then(function (
    //   // resolve promise
    //   result
    // ) {
    //   return result;
    // })
    // .catch((err) => {
    //   console.log(err);
    // });

    console.log("handle", questions.data);

    dispatchQuestion({
      type: "SET_QUESTIONS",
      payload: { algorithm, questions: questions.data },
    });
    setShowModal(true);
  };

  return (
    <nav
      className="flex justify-center items-center mx-auto bg-slate-800 p-4"
      style={isDisabled ? { pointerEvents: "none" } : {}}
    >
      <ToastContainer />

      {/* {console.log(
        "questions in nav",
        Promise.resolve(questionState).then((result) => {
          console.log("questions in nav2", result);
        }) */}
      {/* )} */}
      {/* {console.log("promise?", questionState)} */}
      {/* {questionState.questions && ( */}

      <ModalStuktos showModal={showModal} setShowModal={setShowModal}>
        {/* {console.log("hehe")} */}
        {/* {console.log(questionState)} */}
        {/* {Promise.resolve(questionState)?.then(function (result) {
          console.log("cica");
          console.log("result", result.questions);
          for (const [key, value] of Object.entries(result.questions.dnd)) {
            console.log(key, value);
            console.log("value", value.answers);
            value.answers.map((answer) => {
              console.log(answer);
              <p>answer</p>;
            });
          }
        })} */}

        {/* EZ IT TA LEGJOBB CUCC EDDIG */}
        {/* <p>{questionState.questions.algorithm}</p>
        {questionState.questions.dnd &&
          Object.keys(questionState.questions.dnd).map((id) => (
            <p>{questionState.questions.dnd[id].answers.join(" ")}</p>
          ))} */}
        {/* EZ IT TA LEGJOBB CUCC EDDIG */}

        {/* {questionState.questions.length &&
          questionState?.questions.map((question) => <p>{question}</p>)} */}
        {/* <DndQuestion
          idx={optionsAlgorithms.indexOf(algorithm)}
          algorithm={algorithm}
        /> */}
        {questionState.currentQuestionType === "quize" && <Quize />}
        {questionState.currentQuestionType === "dropdown" && (
          <DropdownQuestion />
        )}
        {questionState.currentQuestionType === "dnd" && <DndQuestion />}

        {/* <Quize /> */}
        {/* {questionState.currentQuestionType === "dnd" ? (
         
        ) : questionState.currentQuestionType === "dropdown" ? (
          <Dropdown /> // itt akkor megy a submit ha van kattinás gombra
        ) : (
          <Quize /> // itt egyből megy a submit ha rákattolt az adott kérdésre
        )} */}

        {/* {questionState.currentQuestionType === "quize" ? (
          questionState.isSubmitted ? (
            <button
              className="px-4 py-3 leading-none font-semibold rounded-lg bg-gray-300 text-gray-900 hover:bg-gray-400"
              onClick={() => {
                dispatchQuestion({
                  type: "SEND_ANSWERS",
                  payload: ["answers..."], // vagy megváltoztatom a választ a stateban, questionState.answers = [] és ezt küldöm majd tovább, és akkor az adott komponensen belül mehet a dolog
                });
              }}
            >
              Submit
            </button>
          ) : (
            <button
              className="px-4 py-3 leading-none font-semibold rounded-lg bg-gray-300 text-gray-900 hover:bg-gray-400"
              onClick={() => {
                dispatchQuestion({ type: "NEXT_QUESTION" });
              }}
            >
              Next
            </button>
          )
        ) : null} */}
      </ModalStuktos>
      {/* )} */}
      <Button name="Valami" />
      <Dropdown
        name="Distance Formula"
        options={optionDistance}
        setVariable={setDistanceFormula}
        function={handleDistanceFormula}
        distanceFormula={distanceFormula}
      />
      <Button name="Clear Board" function={handleClearBoard} />
      <Button
        name="Questions"
        function={() => {
          !algorithm ? warningMessage() : handleGetQuestions(algorithm);
        }}
      />
      <Button
        name="Visualize"
        isVisualize="true"
        algorithmName={algorithm}
        function={handleVisualize}
        isDisabled={isDisabled}
        id="visualize"
      />
      <Dropdown
        name="Algorithms"
        options={optionsAlgorithms}
        setVariable={setAlgorithm}
      ></Dropdown>
      <Dropdown
        name="Maze"
        options={optionsMazes}
        maze={maze}
        setVariable={setMaze}
        function={handleVisualizeMaze}
      />
      <Dropdown
        name="Speed"
        options={optionsSpeed}
        speed={speed}
        setVariable={setSpeed}
      />
      <Dropdown
        name="Type"
        options={optionsType}
        type={type}
        setVariable={setType}
      />
    </nav>
  );
};

export default NavBar;
