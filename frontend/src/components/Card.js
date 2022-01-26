import React from "react";
import PickAlgoGif from "../images/algorithms.gif";
import WallWeight from "../images/wallWeight.gif";

const Card = (props) => {
  return (
    <div>
      {props.data[props.cardIdx].map((item) => (
        <>
          <h1 className="text-position-tutorial title">{item.title}</h1>
          <h3 className="text-position-tutorial subtitle">{item.subtitle}</h3>
          {item.text.map((text) => (
            <p className="text-tutorial">{text}</p>
          ))}
          {props.cardIdx === 3 && (
            <img
              src={PickAlgoGif}
              alt="algorithm"
              className=" inset-x-0 bottom-0 m-auto"
            />
          )}
          {props.cardIdx === 4 && (
            <img
              src={WallWeight}
              alt="wall-weight"
              className=" inset-x-0 bottom-0 m-auto"
            />
          )}
        </>
      ))}
    </div>
  );
};

export default Card;
