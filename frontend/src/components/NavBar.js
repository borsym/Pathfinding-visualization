/* eslint-disable no-unused-vars */
import axios from "axios";
import PropTypes from "prop-types";
import React, { useContext, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from "uuid";
import { GridContext } from "../contexts/GridContext.js";
import { QuestionContext } from "../contexts/QuestionsContext";
import { firebase } from "../Firebase/firebase";
import errorMessage from "../functions/ErrorMessage";
import warningMessage from "../functions/WarningMessage.js";
import "../index.css";
import Button from "./Button";
import Dropdown from "./Dropdown";
import DropdownQuestion from "./DropDownQuestions/DropdownQuestion";
import Over from "./Over";
import Profile from "./Profile/Profile";
import DndQuestion from "./QuestionsSegment/DndQuestion";
import ModalStuktos from "./QuestionsSegment/ModalStuktos";
import Quize from "./Quize/Quize";

const NavBar = ({
  algorithm,
  setAlgorithm,
  showModelTutorial,
  setShowModelTutorial,
}) => {
  const optionsAlgorithms = ["Astar", "Dijkstra", "BFS", "DFS"];
  const optionsMazes = ["Recursive Division", "Random"];
  const optionsSpeed = ["Fast", "Normal", "Slow"];
  const optionsType = ["Empty [0]", "Grass [10]", "Water [20]", "Stone [30]"];
  const optionDistance = ["Euclidean", "Manhattan", "Chebyshev"];
  const db = firebase.firestore();
  const [maze, setMaze] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const [speed, setSpeed] = useState(10);
  const [distanceFormula, setDistanceFormula] = useState("Euclidean");
  const [showModal, setShowModal] = useState(false);
  const [
    grid,
    setGrid,
    type,
    setType,
    dispatchGridEvent,
    isVisualize,
    setIsVisualize,
  ] = useContext(GridContext);
  const [questionState, dispatchQuestion] = useContext(QuestionContext);
  const [isOpenProfile, setIsOpenProfile] = useState(false);
  const [user, setUser] = useState(null);

  const handleClearBoard = () => {
    dispatchGridEvent("CLEAR_BOARD", {
      conditions: ["node-start", "node-finish"],
    });
  };

  const handleVisualizeMaze = async (maze) => {
    await axios
      .post("http://localhost:8000/api/clearForMaze", {
        // indicated the clear
        is_refreshed: true,
      })
      .catch(() => {
        errorMessage("A szerver nem elérhető!");
      });

    await axios
      .get(`http://localhost:8000/api/${maze}`)
      .then((res) => {
        setIsVisualize(true);
        setIsDisabled(true);
        dispatchGridEvent("VISUALIZE_MAZE", {
          maze: res.data.order,
          conditions: ["node-start", "node-finish"],
          speed: speed,
        });

        setTimeout(() => {
          // wait till the maze is visualized
          setIsDisabled(false);
          setIsVisualize(false);
        }, 20 * res.data.order.length);
      })
      .catch(() => {
        errorMessage("A szerver nem elérhető!");
      });
  };

  const openProfile = () => {
    const db = firebase.firestore();
    const user = db
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .get();
    user.then((user) => setUser(user.data()));
    setIsOpenProfile(true);
  };

  const handleDistanceFormula = (distanceFormula) => {
    // change the distance formula for the heuristic alogrithm
    axios.post("http://localhost:8000/api/changeDistance", {
      distance: distanceFormula,
    });
  };

  const handleVisualize = async () => {
    if (!algorithm) {
      warningMessage("You have to pick an algorithm!");
    } else {
      if (isVisualize) {
        dispatchGridEvent("STOP_VISUALIZE");
        return;
      }
      // I have to put back the weights if another algorithm is visited them
      await axios
        .get("http://localhost:8000/api/getTypes")
        .then((res) => {
          Object.values(res.data).map((key, value) => {
            Object.entries(key).map(([key, value]) => {
              switch (value) {
                case 10:
                  document.getElementById(key).className =
                    "node node-style node-type bg-green-900 animate-fillBox";
                  break;
                case 20:
                  document.getElementById(key).className =
                    "node node-style node-type bg-blue-900 animate-fillBox";
                  break;
                case 30:
                  document.getElementById(key).className =
                    "node node-style node-type bg-neutral-400 animate-fillBox";
                  break;
                default:
                  break;
              }
            });
          });
        })
        .catch(() => {
          errorMessage("A szerver nem elérhető!");
        });

      setIsVisualize(true);
      // and now visualize the algorithm
      await axios
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
            // after timeout everything is aviable again
            setIsDisabled(false);
            setIsVisualize(false);
          }, speed * res.data.path.length + 50 * res.data.shortestPath.length);
        })
        .catch(() => {
          errorMessage("A szerver nem elérhető!");
        });
    }
  };

  const handleGetQuestions = async (algorithm) => {
    // every time he starts a new quize we set the points to 0
    await axios
      .post(`http://localhost:8000/api/restartpoints`, {
        uid: firebase.auth().currentUser.uid,
      })
      .catch(() => {
        errorMessage("A szerver nem elérhető!");
      });

    const questions = await db // get the questions from the database related to the current algorithm
      .collection("questions")
      .doc(algorithm)
      .get()
      .then((doc) => {
        return doc;
      });

    dispatchQuestion({
      type: "SET_QUESTIONS",
      payload: { algorithm, questions: questions.data() },
    });

    setShowModal(true);
  };

  // for future myself, if you want to stop the algorithm you have to disable the dropdowns make a div around the menu and disable that with pointern event
  return (
    <nav
      className="flex justify-center items-center mx-auto bg-slate-800 p-4"
      style={isDisabled ? { pointerEvents: "none" } : {}}
    >
      <ToastContainer />

      <ModalStuktos showModal={showModal} setShowModal={setShowModal}>
        {questionState.currentQuestionType === "quize" && <Quize />}
        {questionState.currentQuestionType === "dropdown" && (
          <DropdownQuestion />
        )}
        {questionState.currentQuestionType === "dnd" && (
          <DndQuestion key={uuidv4()} />
        )}
        {questionState.currentQuestionType === "over" && <Over />}
      </ModalStuktos>
      <Profile
        isOpenProfile={isOpenProfile}
        setIsOpenProfile={setIsOpenProfile}
        showModelTutorial={showModelTutorial}
        setShowModelTutorial={setShowModelTutorial}
        user={user}
      />
      <Button name="Profile" function={openProfile} />
      <Dropdown
        name="Distance Formula"
        options={optionDistance}
        setVariable={setDistanceFormula}
        function={handleDistanceFormula}
        distanceFormula={distanceFormula}
        key="distanceFormulaKey"
      />
      <Button name="Clear Board" function={handleClearBoard} />
      <Button
        name="Questions"
        function={() => {
          !algorithm
            ? warningMessage("You have to pick an algorithm!")
            : handleGetQuestions(algorithm);
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
        key="Algorithms"
      />
      <Dropdown
        name="Maze"
        options={optionsMazes}
        maze={maze}
        setVariable={setMaze}
        function={handleVisualizeMaze}
        key="Maze"
      />
      <Dropdown
        name="Speed"
        options={optionsSpeed}
        speed={parseInt(speed)}
        setVariable={setSpeed}
        key="Speed"
      />
      <Dropdown
        name="Type"
        options={optionsType}
        type={parseInt(type)}
        setVariable={setType}
        key="Type"
      />
    </nav>
  );
};

NavBar.propTypes = {
  dispatchGridEvent: PropTypes.func,
  dispatchQuestion: PropTypes.func,
  questionState: PropTypes.object,
  algorithm: PropTypes.string.isRequired,
  maze: PropTypes.string,
  speed: PropTypes.number,
  type: PropTypes.string,
  distanceFormula: PropTypes.string,
  isDisabled: PropTypes.bool,
  isVisualize: PropTypes.bool,
  isOpenProfile: PropTypes.bool,
  showModelTutorial: PropTypes.bool.isRequired,
  setAlgorithm: PropTypes.func.isRequired,
  setShowModelTutorial: PropTypes.func.isRequired,
};

export default NavBar;
