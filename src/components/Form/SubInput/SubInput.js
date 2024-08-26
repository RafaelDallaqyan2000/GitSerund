import React from "react";
import { connect } from "react-redux";
import { handleFormChange } from "../../../store";

function SubInput({
  id,
  name,
  value = "",
  placeholder,
  type = "text",
  handleFormChange,
  className,
}) {
  const handleChange = (e) => {
    handleFormChange(id, e.target.value);
  };
  return (
    <div className={className}>
      <label className="required-field" htmlFor={id}>
        {name}
      </label>
      <input
        id={id}
        type={type}
        className="form-control mt-1 mb-3"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
      />
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

export default connect(mapStateToProps, mapDispatchToProps)(SubInput);
