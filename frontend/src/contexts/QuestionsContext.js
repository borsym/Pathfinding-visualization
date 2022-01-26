import axios from "axios";
import { createContext, useReducer } from "react";

const initialState = {
  questions: [],
  currentQuestionIndex: 0,
  showResults: false,
  correctAnswerCount: 0,
  currentQuestionType: "",
  questionTypeIndex: 0,
  currentQuestionId: "",
  algorithm: "",
  isSubmitted: false,
  answers: [],
};

const handleGetQuestions = async (algorithm) => {
  const questions = await axios
    .get(`http://localhost:8000/api/questions/${algorithm}`)
    .then((res) => {
      console.log("adatok:");
      console.log(res.data);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
  return questions;
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
    ) // ilyet lehet?
    .then((res) => {
      return res.data;
    });

  return correctAnswer;
};

const reducer = (state, action) => {
  switch (action.type) {
    case "GET_QUESTIONS":
      console.log(action.payload);
      const questions = handleGetQuestions(action.payload);
      return {
        ...state,
        algorithm: action.payload,
        questions: questions,
        // currentQuestionType: questions[questionTypeIndex],
        // currentQuestionId: questions[questionTypeIndex][0]
        // currentQuestionSegmentLength: questions[0].length,
      };
    case "SEND_ANSWERS":
      console.log("state", state);
      console.log("payload", action.payload);
      // const checkedSelectedAnswer = handleSelectAnswer(state, action.payload);
      return { ...state };
    // const checkedSendAnswers = handleSendAnswers(state, action.payload);
    // // és itt kell pirossal meg zöldel jelezni a jókat sztm
    // break;
    case "SELECT_ANSWER":
      console.log("payload", action.payload);
      // const checkedSelectedAnswer = handleSelectAnswer(state, action.payload);
      return { ...state, answers: action.payload };
    // return {
    //   ...state,
    //   correctAnswer: checkedSelectedAnswer,
    //   isSubmitted: true,
    // };
    case "NEXT_QUESTION":
      const showResults =
        state.currentQuestionIndex === state.questions.length - 1;
      // const currentQuestionIndex = showResults
      //   ? state.currentQuestionIndex
      //   : state.currentQuestionIndex + 1;
      const questionTypeIndex =
        state.currentQuestionIndex >= state.currentQuestionSegmentLength
          ? state.questionTypeIndex + 1
          : state.questionTypeIndex;
      const currentQuestionType =
        state.questions[questionTypeIndex] !== state.currentQuestionType
          ? state.questions[questionTypeIndex]
          : state.currentQuestionType;
      const currentQuestionIndex =
        state.currentQuestionIndex >= state.currentQuestionSegmentLength
          ? 0
          : state.currentQuestionIndex + 1;
      const currentQuestionId =
        state.questions[questionTypeIndex][currentQuestionIndex][0];

      return {
        ...state,
        currentQuestionIndex,
        showResults,
        questionTypeIndex,
        currentQuestionType,
        currentQuestionId,
        isSubmitted: false,
      };
    // case "SELECT_ANSWER":
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
