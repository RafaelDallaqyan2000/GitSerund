import { useEffect, useState } from "react";
import React from "react";
import { connect } from "react-redux";
import { handleFormChange } from "../../../store";

const CheckList = ({
  id,
  checkedArr = [],
  name,
  handleFormChange,
  items = [],
  className = "mb-1 form-check",
}) => {
  const handleChange = (itemId) => {
    handleFormChange(id, [...checkedArr, itemId]);
  };

  return (
    <>
      {items.map((item) => {
        return (
          <div key={item.id} className={`${className} `}>
            <input
              name={item.name}
              type="checkbox"
              onChange={() => {
                handleChange(item.id);
              }}
              checked={checkedArr.some((i) => i === item.id)}
              className="form-check-input"
              id={item.id + item.name}
            />
            <label className="form-check-label" htmlFor={item.id + item.name}>
              {item.name}
            </label>
          </div>
        );
      })}
    </>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    checkedArr: state.formReducer[ownProps.id],
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleFormChange: (key, value) => dispatch(handleFormChange(key, value)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CheckList);
