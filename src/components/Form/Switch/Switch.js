import React from "react";
import { connect } from "react-redux";
import { handleFormChange } from "../../../store";

function Switch({
  id,
  name,
  value = false,
  handleFormChange,
  className = " form-check",
  checked,
  labelValue,
}) {
  const handleChange = (e) => {
    handleFormChange(e.target.name, value);
  };

  return (
    <div className={`${className}`}>
      <input
        checked={value === checked}
        name={name}
        type="radio"
        onChange={handleChange}
        value={value}
        className="form-check-input"
        id={id}
      />
      <label className="form-check-label" htmlFor={id}>
        {labelValue}&nbsp;&nbsp;
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

export default connect(mapStateToProps, mapDispatchToProps)(Switch);
