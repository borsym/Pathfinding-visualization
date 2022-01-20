import axios from "axios";
import { createContext, useReducer } from "react";

const initialState = {
  questions: [],
  currentQuestionIndex: 0,
  showResults: false,
  correctAnswerCount: 0,
};

const handleGetQuestions = async (algorithm) => {
  const questions = await axios
    .get(`http://localhost:8000/questions/${algorithm}`)
    .then((res) => {
      console.log(res.data);
      // return res.data;

      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
  return questions;
};

const handleSendAnswers =  (answers) => {
  axios.post("http://localhost:8000/changeDistance", {
    answers: answers,
  });
};

const reducer = (state, action) => {
  console.log("itt", state);
  switch (action.type) {
    case "GET_QUESTIONS":
      console.log(action.payload);
      const questions = handleGetQuestions(action.payload);
      return {
        ...state,
        questions: questions,
      };
    case "SEND_ANSWERS":
      handleSendAnswers(action.payload);
      break;

    case "NEXT_QUESTION":
      break;
    // case "SELECT_ANSWER":
    // case "RESTART":
    //   return initialState;
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
