import React from "react";

const Highlight = ({ color, children }) => (

  <span
    className="highlight"
    style={{ backgroundColor: color || "red" }}
    data-hl-color={color}
  >
    {children}
  </span>
);

export default Highlight;