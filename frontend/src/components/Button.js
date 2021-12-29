import React from "react";
export default function Button(props) {
  const buttonDesing =
    props.isVisualize === "true"
      ? props.isDisabled
        ? `btn-navbar bg-red-600`
        : `btn-navbar bg-cyan-600 hover:bg-cyan-500 hover:text-blue-800`
      : `btn-navbar`;

  return (
    <button
      className={buttonDesing}
      onClick={props.function}
      disabled={props.isDisabled}
    >
      {props.name} {props.algorithmName}
    </button>
  );
}
