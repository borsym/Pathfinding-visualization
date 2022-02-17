import axios from "axios";
import { createContext, useReducer } from "react";
import { firebase } from "../Firebase/firebase";
const initialState = {
  questions: {},
  currentQuestionIndex: 0,
  showResults: false,
  correctAnswerCount: 0,
  currentQuestionType: "quize", //"quize",
  questionTypeIndex: 0,
  currentQuestionId: "",
  algorithm: "",
  isSubmitted: false,
  answers: [],
  currentAnswer: "",
  correctAnswer: "",
};

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
  return questions.data;
};

const handleSendAnswers = async (state, answers) => {
  const results = await axios
    .post(
      `http://localhost:8000/sendAnswers/api/${state.algorithm}/${state.questionType}/${state.id}`,
      {
        answers: answers,
      }
    )
    .then(`http://localhost:8000/api/checkedAnswers`)
    .then((res) => {
      // a visszaküldött formátum legyen {id-{n} : true/false}, ...
      return res.data;
    });

  return results;
};

const handleSelectAnswer = (state, payload) => {
  const correctAnswer = axios
    .get(
      `http://localhost:8000/api/${state.algorithm}/${state.questionType}/${state.id}`
    )
    .then((res) => {
      return res.data;
    });

  return correctAnswer;
};

const db = firebase.firestore();

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_QUESTIONS":
      // const questions = await handleGetQuestions(action.payload);
      // console.log("questions: ", questions);
      console.log("questions: ", action.payload.questions);
      // db.collection("users")
      //   .doc(firebase.auth().currentUser.uid)
      //   .get()
      //   .then((doc) => {
      //     return db
      //       .collection("users")
      //       .doc(firebase.auth().currentUser.uid)
      //       .update({
      //         points: Number(10),
      //       });
      //   });
      return {
        ...state,
        algorithm: action.payload.algorithm,
        questions: action.payload.questions,
      };
    case "SEND_ANSWERS":
      console.log("payload", action.payload);
      // const checkedSelectedAnswer = handleSelectAnswer(state, action.payload);
      return { ...state };
    // const checkedSendAnswers = handleSendAnswers(state, action.payload);
    // // és itt kell pirossal meg zöldel jelezni a jókat sztm
    // break;
    case "SET_ANSWER":
      console.log("payload valasz", action.payload);
      // ezt szerintem backendben kéne lekezelni hogy jó választ adott e meg, leküldöm a választ és választ kapok rá hoyg jó e vagy sem
      const correctAnswerCount =
        action.payload.solution === action.payload.answer
          ? state.correctAnswerCount + 1
          : state.correctAnswerCount;
      console.log(
        "egyenloek?",
        action.payload.solution === action.payload.answer
      );
      console.log("corrent answerek", correctAnswerCount);
      return {
        ...state,
        correctAnswer: action.payload.solution,
        currentAnswer: action.payload.answer,
        correctAnswerCount: correctAnswerCount,
      };
    case "SET_CORRECT_ANSWERS_NUMBER":
      console.log("payload tmp", action.payload);
      const tmp = state.correctAnswerCount + action.payload;
      console.log("tmp", tmp);
      return {
        ...state,
        correctAnswerCount: tmp,
      };
    case "NEXT_QUESTION":
      // const showResults =
      //   state.currentQuestionIndex === state.questions.length - 1;
      // // const currentQuestionIndex = showResults
      // //   ? state.currentQuestionIndex
      // //   : state.currentQuestionIndex + 1;
      // const questionTypeIndex =
      //   state.currentQuestionIndex >= state.currentQuestionSegmentLength
      //     ? state.questionTypeIndex + 1
      //     : state.questionTypeIndex;
      // const currentQuestionType =
      //   state.questions[questionTypeIndex] !== state.currentQuestionType
      //     ? state.questions[questionTypeIndex]
      //     : state.currentQuestionType;
      console.log(state.questions);
      const currentQuestionIndex =
        state.currentQuestionIndex >=
        Object.keys(state.questions[state.currentQuestionType]).length - 1
          ? 0
          : state.currentQuestionIndex + 1;

      const currentQuestionType =
        currentQuestionIndex === 0
          ? state.currentQuestionType === "quize"
            ? "dropdown"
            : state.currentQuestionType === "dropdown"
            ? "dnd"
            : "over"
          : state.currentQuestionType;
      // console.log("current question index", currentQuestionIndex);
      // const currentQuestionId =
      //   state.questions[questionTypeIndex][currentQuestionIndex][0];

      // get the state.questions currentquestion type length
      // const val = state.currentQuestionType;
      // console.log(
      //   "next",
      //   Object.keys(state.questions[state.currentQuestionType]).length
      // );
      // const a =
      //   state.currentQuestionIndex +
      //   1 /
      //     Object.keys(`${state.questions}.${state.currentQuestionType}`).length;
      return {
        ...state,
        currentQuestionIndex,
        currentQuestionType,
        // showResults,
        // questionTypeIndex,
        // currentQuestionType,
        // currentQuestionId,
        // isSubmitted: false,
      };
    case "SET_CURRENT_QUESTION_ID":
      console.log("itt a payload", action.payload);
      return {
        ...state,
        currentQuestionId: action.payload,
      };

    case "RESTART":
      return initialState;
    default:
      return state;
  }
};

export const QuestionContext = createContext();

export const QuestionProvider = ({ children }) => {
  const value = useReducer(reducer, initialState);
  return (
    <QuestionContext.Provider value={value}>
      {children}
    </QuestionContext.Provider>
  );
};
