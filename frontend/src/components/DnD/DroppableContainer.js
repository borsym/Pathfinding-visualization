/* eslint-disable no-unused-vars */
import PropTypes from "prop-types";
import React from "react";
import { useDroppable } from "@dnd-kit/core";

const DroppableContainer = (props) => {
  const { setNodeRef, id } = useDroppable({
    id: props.id,
  });

  return (
    <div id={props.id} ref={setNodeRef} className={`blank-style bg-slate-600`}>
      {props.children ? (
        props.children
      ) : (
        <div className="flex content-center h-full">&nbsp;</div>
      )}
    </div>
  );
};

DroppableContainer.propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.node,
};

export default DroppableContainer;
