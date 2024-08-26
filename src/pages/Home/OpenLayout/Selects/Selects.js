import React, { useState, useEffect } from "react";
import "./Selects.css";
import { connect } from "react-redux";

/* sa petq chi*/

const Selects = ({ id, handleFormChange, subjectId }) => {
  const [ararka, setArarka] = useState([
    { id: 1, name: "matem" },
    { id: 2, name: "angleren" },
    { id: 3, name: "lezu" },
    { id: 4, name: "matem" },
    { id: 5, name: "angleren" },
    { id: 6, name: "lezu" },
  ]);

  return (
    <div className="open-layout-container">
      <Select
        placeholder="Առարկայի անուն"
        id="subjectId"
        label="Առարկա"
        className="select-input"
        items={ararka}
      />
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {};
};
const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Selects);
