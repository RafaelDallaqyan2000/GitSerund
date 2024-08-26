import React, { useRef, useState, useEffect } from "react";
import { connect } from "react-redux";
import { handleFormChange, getClassesBySubject } from "../../../store";
import "./multiselectWithMultiselect.css";
import { useOutsideClick } from "../../../hooks/useOutsideClick";
import multiselectCross from "../../../img/multiselectCross.svg";
import { handleFormOnChangeArray } from "../../../store/form/actions";
import { useForceRender } from "../../../hooks/useForceRender";

const MultiselectWithMultiselect = ({
  id = "",
  formOnChange,
  placeholder,
  name,
  value,
  type = "text",
  items = [],
  label = "",
  labelClassName="",
  className="",
  setEditInfo= () => {}
}) => {
  const ref = useRef();
  const forceRender = useForceRender();

  const [show, setShow] = useState(false);
  const [selectedArrayId, setSelectedArrayId] = useState(null);


  const handleSelect = () => {
    setShow(false);
  };

  const openParent = (item) => {
    item.id === selectedArrayId
      ? setSelectedArrayId(null)
      : setSelectedArrayId(item.id);
  };


  const selectFromSubArray = (item, subArrayValue) => {
    const indexOfParent = value.findIndex((parent) => parent.id === item.id);
    if (indexOfParent === -1) {
      // if parent does not exist, then add it
      let newItem = { id: item.id, name: item.name, subArray: [subArrayValue] };
      value.push(newItem);
    } else {
      // if parent exist, then change it
      let indexOfChild = value[indexOfParent].subArray.findIndex(
        (c) => c === subArrayValue
      );
      if (indexOfChild === -1) {
        // if child does not exist, then add it
        value[indexOfParent].subArray.push(subArrayValue);
        value[indexOfParent].subArray.sort((a, b) => a - b);
      } else {
        // if child exists then remove it
        value[indexOfParent].subArray.splice(indexOfChild, 1);
        if (value[indexOfParent].subArray.length === 0) {
          // check if subArray is empty then remove parent too
          value.splice(indexOfParent, 1);
        }
      }
      // sorting the childs
    }
    formOnChange(id, value);
    setEditInfo(true)
    forceRender();
  };

  const toggleParent = (item) => {
    const index = value.findIndex((i) => i.id === item.id);
    if (index === -1) {
      const newItem = { id: item.id, name: item.name };
      newItem.subArray = [...item.subArray];
      value.push(newItem);
    } else {
      value.splice(index, 1);
    }
    formOnChange(id, value);
    setEditInfo(true)
    forceRender();
  };
  useOutsideClick(ref, handleSelect);

  return (
    <div ref={ref} className="select_container">
      <label className={`select-label ${labelClassName}`}>{label}</label>
      <div style={{ position: "relative" }}>
        <div
          className="multiselect-with-check-input multiselect-with-check-input-mobile"
          onClick={() => {
            setShow(true);
          }}
        >
          {value && !value.length ? (
            <p className={`select-placeholder ${className}`}>{placeholder}</p>
          ) : null}
          <div className="selected-item-wrapper">
            {value.map((item) => {
              return (
                <div key={item.id} className="selected-item-container">
                  <p className={`selected-item-title ${className}`}>
                    {item.name}&nbsp;
                    {item.subArray?.toString()}
                  </p>
                  <div>
                    <img
                      src={multiselectCross}
                      className="multiselect-item-cross"
                      onClick={() => toggleParent(item)}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div
          className="multiselect-with-check-arrow"
          onClick={() => setShow(!show)}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              opacity="0.6"
              d="M8.41421 9C7.52331 9 7.07714 10.0771 7.70711 10.7071L11.2929 14.2929C11.6834 14.6834 12.3166 14.6834 12.7071 14.2929L16.2929 10.7071C16.9229 10.0771 16.4767 9 15.5858 9L8.41421 9Z"
              fill="#6C6C6C"
            />
          </svg>
        </div>
      </div>

      {show && (
        <ul className={`ul multiselect-with-multiselect multiselect-with-multiselect-desktop`}>
          {items.map((item) => (
            <li title={item.name} id={item.id} key={item.id}>
              <div className="select-item-container">
                <input
                  type="checkbox"
                  id={item.id}
                  onChange={() => {}}
                  className="multiselect-checkbox-input"
                  checked={value?.some((s) => s.id === item.id)}
                />
                <span
                  onClick={() => toggleParent(item)}
                  className="multiselect-checkbox-label"
                ></span>
                <label
                  onClick={() => openParent(item)}
                  className={`select-item-title ${className}`}
                >
                  {item.name}
                </label>
              </div>

              {selectedArrayId === item.id &&
                item.subArray?.map((c) => {
                  return (
                    <div
                      id={`${item.id}${c}`}
                      key={`${item.id}${c}`}
                      style={{ paddingLeft: "20px" }}
                    >
                      {/* <div>{c}</div> */}
                      <ul className="ul">
                        <li title={item.name}>
                          <div
                            onClick={() => selectFromSubArray(item, c)}
                            className="select-item-container"
                          >
                            <input
                              type="checkbox"
                              className="multiselect-checkbox-input"
                              onChange={() => {}}
                              checked={value?.some(
                                (parent) =>
                                  item?.id === parent?.id &&
                                  parent?.subArray.some((i) => i === c)
                              )}
                            />
                            <label className="select-item-title multiselect-checkbox-label">
                              {c}
                            </label>
                          </div>
                        </li>
                      </ul>
                    </div>
                  );
                })}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    value: state.formReducer[ownProps.id] ?? [],
    classesBySubject: state.changePageReducer.classesBySubject,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    formOnChange: (key, value) => dispatch(handleFormChange(key, value)),
    getClassesBySubject: (id) => dispatch(getClassesBySubject(id)),
    handleFormOnChangeArray: (firstKey, secondKey, value) =>
      dispatch(handleFormOnChangeArray(firstKey, secondKey, value)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MultiselectWithMultiselect);
