import * as React from "react";
import "./Class.css";

const Class = ({ onClick, selected, number }) => {
  return (
    <div onClick={onClick}>
      <button
        className={`number ${selected === number ? "selected-number" : ""}`}
      >
        {number}
      </button>
    </div>
  );
};

export default Class;
