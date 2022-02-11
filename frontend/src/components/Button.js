import React from "react";

const Button = (props) => {
  let buttonDesing =
    props.isVisualize === "true"
      ? props.isDisabled
        ? `btn-navbar bg-red-600`
        : `btn-navbar bg-cyan-600 hover:bg-cyan-500 hover:text-blue-800`
      : `btn-navbar`;

  buttonDesing = props.questionSection
    ? "px-4 py-3 leading-none font-semibold rounded-lg bg-gray-300 text-gray-900 hover:bg-gray-400"
    : buttonDesing;
  return (
    <button
      className={buttonDesing}
      onClick={props.function}
      disabled={props.isDisabled}
      id={props.id}
    >
      {props.name} {props.algorithmName}
    </button>
  );
};

export default Button;
