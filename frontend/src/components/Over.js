import React, { useContext } from "react";
import { QuestionContext } from "../contexts/QuestionsContext";

const Over = () => {
  const [quizeState, dispatch] = useContext(QuestionContext);
  return <div>Congrat its over: </div>;
};

export default Over;
