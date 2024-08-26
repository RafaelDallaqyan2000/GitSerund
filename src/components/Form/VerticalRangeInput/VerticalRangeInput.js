import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { handleFormChange } from "../../../store";
import "./VerticalRangeInput.css";

function VerticalRangeInput({ id, name, value = 0, handleFormChange,padding }) {
  const [position, setPosition] = useState(0);

  useEffect(() => {
    setPosition((document.getElementById(id).offsetWidth * value) / 100);
  }, [value]);

  const handleChange = (e) => {
    handleFormChange(e.target.id, e.target.value);
    setPosition((e.target.offsetWidth * e.target.value) / 100);
  };

  return (
    <div className="range-wrap mb-3 form-group col-8" style={{transform:" rotate(90deg) ",}}>
     
      <input
        id={id}
        value={value}
        onChange={handleChange}
        min="0"
        max="100"
        type="range"
        className="range"
        
      />
      <output style={{ left: position + "px" }} className="bubble">
        
      </output>
      <output
        className="range-progress mb-2"
        style={{ width: value + "%" }}
      ></output>
    </div>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    value: state.formReducer[ownProps.id],
    padding:state.formReducer.padding
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleFormChange: (key, value) => dispatch(handleFormChange(key, value)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(VerticalRangeInput);