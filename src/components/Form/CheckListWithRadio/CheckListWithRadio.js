import { useEffect, useState } from "react";
import React from "react";
import { connect } from "react-redux";
import { handleFormChange } from "../../../store";

const CheckListWithRadio = ({
  id,
  checkedArr = [],
  name,
  handleFormChange,
  items = [],
}) => {

  const handleChange = (thing) => {
    if (!checkedArr.some((s) => s.id === thing.id)) {
      handleFormChange(id, [
        ...checkedArr,
        {
          id: thing.id,
          levelId: thing.levels < 1 ? null : thing.levels[0].id,
        },
      ]);
    } else {
      handleFormChange(
        id,
        checkedArr.filter((s) => thing.id !== s.id),
      );
    }
  };

  const handleChangeRadio = (item, level) => {
    if (!checkedArr.some((s) => s.id === item.id)) {
      handleFormChange(id, [
        ...checkedArr,
        {
          id: item.id,
          levelId: level.id,
        },
      ]);
    } else {
      handleFormChange(
        id,
        checkedArr.map((s) => {
          if (s.id !== item.id) {
            return s;
          }
          return {
            id: item.id,
            levelId: level.id,
          };
        }),
      );
    }
  };

  return (
    <>
      {items.map((item,index) => {
        return (
          <div key={index}>
        {/* error er    <> */}
            <div key={item.id} className="mb-1 form-check">
              <input
                name={item.name}
                type="checkbox"
                onChange={() => {
                  handleChange(item);
                }}
                checked={checkedArr.some((i) => i.id === item.id)}
                className="form-check-input"
                id={item.id + item.name}
              />
              <label className="form-check-label" htmlFor={item.id + item.name}>
                {item.name}
              </label>
            </div>

            {item.levels.map((level) => {
              return (
                <div className="form-check">
                  <input
                    name={level.name}
                    type="radio"
                    onChange={() => {
                      handleChangeRadio(item, level);
                    }}
                    checked={checkedArr.some(
                      (i) => i.levelId === level.id && i.id === item.id,
                    )}
                    className="form-check-input"
                    id={level.name + level.id}
                  />
                  <label className="form-check-label" htmlFor={id}>
                    {level.name}
                  </label>
                </div>
              );
            })}
          </div>
      //error er    </>
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

export default connect(mapStateToProps, mapDispatchToProps)(CheckListWithRadio);
