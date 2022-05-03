import PropTypes from "prop-types";
import React from "react";
import PickAlgoGif from "../images/algorithms.gif";
import WallWeight from "../images/wallWeight.gif";
import Types from "../images/types.gif";
import Questions from "../images/questions.gif";
// An element from the modal
const Card = (props) => {
  return (
    <div>
      {props.data[props.cardIdx].map((item) => (
        <div key={item.title + item.subtitle}>
          <h1 className="text-position-tutorial title" key={item.title}>
            {item.title}
          </h1>
          <h3 className="text-position-tutorial subtitle" key={item.subtitle}>
            {item.subtitle}
          </h3>
          {item.text.map((text) => (
            <p className="text-tutorial" key={text}>
              {text}
            </p>
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
          {props.cardIdx === 5 && (
            <img
              src={Types}
              alt="Types"
              className=" inset-x-0 bottom-0 m-auto"
            />
          )}
          {props.cardIdx === 6 && (
            <img
              src={Questions}
              alt="Questions"
              className=" inset-x-0 bottom-0 m-auto"
            />
          )}
        </div>
      ))}
    </div>
  );
};

Card.propTypes = {
  data: PropTypes.array.isRequired,
  cardIdx: PropTypes.number.isRequired,
};

export default Card;
