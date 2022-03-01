import React, { createContext, useReducer } from "react";
import PropTypes from "prop-types";
const initialState = {
  questions: {},
  currentQuestionIndex: 0,
  showResults: false,
  correctAnswerCount: 0,
  currentQuestionType: "quize",
  questionTypeIndex: 0,
  currentQuestionId: "",
  algorithm: "",
  isSubmitted: false,
  answers: [],
  currentAnswer: "",
  correctAnswer: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_QUESTIONS":
      return {
        ...state,
        algorithm: action.payload.algorithm,
        questions: action.payload.questions,
      };

    case "SET_ANSWER": {
      const correctAnswerCount =
        action.payload.solution === action.payload.answer
          ? state.correctAnswerCount + 1
          : state.correctAnswerCount;
      return {
        ...state,
        correctAnswer: action.payload.solution,
        currentAnswer: action.payload.answer,
        correctAnswerCount: correctAnswerCount,
      };
    }

    case "SET_CORRECT_ANSWERS_NUMBER": {
      const tmp = state.correctAnswerCount + action.payload;
      return {
        ...state,
        correctAnswerCount: tmp,
      };
    }

    case "NEXT_QUESTION": {
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

      return {
        ...state,
        currentQuestionIndex,
        currentQuestionType,
      };
    }

    case "SET_CURRENT_QUESTION_ID":
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

QuestionProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
