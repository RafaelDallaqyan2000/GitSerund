import * as React from "react";
import "./Marked.css";
import littleCross from "../../../../../img/littleCross.svg";

const Marked = ({ item }) => {
  return (
    <div style={{ display: "flex",height:"28px" }}>
      <div className="marked">
        <p className="marked-subject-title">{item}</p>

        <img src={littleCross} style={{    width:' 11px',
    height: '20px'}}/>
      </div>
      <img
        className="left_arrow"
        src={require("../../../../../img/left_arrow.svg").default}
      />
    </div>
  );
};

export default Marked;
