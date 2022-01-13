import React from "react";

const Card = (props) => {
  return (
    <div>
      {props.data[props.cardIdx].map((item) => (
        <>
          <h1 className="text-lg flex justify-center">{item.title}</h1>
          <h3 className="text-md flex justify-center">{item.subtitle}</h3>
          <p className="text-sm flex justify-center">{item.text}</p>
        </>
      ))}
    </div>
  );
};

export default Card;
