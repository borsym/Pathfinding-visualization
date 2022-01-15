import React, { forwardRef } from "react";

export const Item = forwardRef(({ label, style, ...props }, ref) => {
  return (
    <div className="p-1" style={{ ...style }} {...props} ref={ref}>
      <p className="p-1 border rounded-lg bg-answer-background-grey text-black">
        {label}
      </p>
    </div>
  );
});