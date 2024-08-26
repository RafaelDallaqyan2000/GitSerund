import React from "react";
import { connect } from "react-redux";
import { handleFormChange } from "../../../store";

function Check({
  id,
  name,
  value = false,
  handleFormChange,
  className = "mb-1 form-check",
  checked = false,
}) {
  const handleChange = (e) => {
    handleFormChange(id, !value);
  };
  return (
    <div className={`${className}`}>
      <input
        name={name}
        type="checkbox"
        onChange={handleChange}
        value={value}
        className="form-check-input"
        id={id + name}
        checked={checked}
      />
      <label className="form-check-label" htmlFor={id + name}>
        {name}
      </label>
    </div>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    value: state.formReducer[ownProps.id],
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleFormChange: (key, value) => dispatch(handleFormChange(key, value)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Check);
