import React from "react";
import { connect } from "react-redux";
import { handleFormChange } from "../../../store";

function Radio({
  id,
  name,
  value = false,
  checked,
  handleFormChange,
  className = " form-check",
}) {
  const handleChange = (e) => {
    handleFormChange(e.target.name, id);
  };

  return (
    <div className={`${className}`} >
      <input
        name={name}
        type="radio"
        onChange={handleChange}
        checked={checked === id}
        className="form-check-input"
        id={name + id}
      />
      <label className="form-check-label"
       htmlFor={name + id}
     // error er for={name + id}
       >
        {value}
      </label>
    </div>
  );
}
const mapStateToProps = (state, ownProps) => {
  return {
    checked: state.formReducer[ownProps.name],
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    handleFormChange: (key, value) => dispatch(handleFormChange(key, value)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Radio);
