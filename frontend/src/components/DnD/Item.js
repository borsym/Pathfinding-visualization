import PropTypes from "prop-types";
import React, { forwardRef } from "react";

export const Item = forwardRef(({ label, style, ...props }, ref) => {
  return (
    <div className="p-1" style={{ ...style }} {...props} ref={ref}>
      <p className="p-1 border rounded-lg bg-slate-200 text-black">{label}</p>
    </div>
  );
});

Item.propTypes = {
  label: PropTypes.string.isRequired,
  style: PropTypes.object,
};

Item.displayName = "Item";
