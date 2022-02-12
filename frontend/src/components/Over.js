import React, { useContext } from "react";
import { QuestionContext } from "../contexts/QuestionsContext";

const Over = () => {
  const [quizeState, dispatch] = useContext(QuestionContext);
  // itt majd backendből kell lekréni
  return <div>Congrat végére értel pontjaid száma: </div>;
};

export default Over;
