import React, { useRef, useState, useEffect } from "react";
import { connect } from "react-redux";
import store, { handleFormChange } from "../../../store";
import "./multiselectWithCheck.css";
import { useOutsideClick } from "../../../hooks/useOutsideClick";
import Marked from "../../../pages/Home/OpenLayout/SuggestedNotes/Marked/Marked";
import littleCross from "../../../img/littleCross.svg";
import multiselectCross from "../../../img/multiselectCross.svg";

const MultiselectWithCheck = ({
  id = "",
  formOnChange,
  placeholder,
  name,
  value,
  type = "text",
  items = [],
  label = "",
  className = "",
  inputClassName = "",
}) => {
  const ref = useRef();
  const ul = useRef();

  const [show, setShow] = useState(false);
  const [arry, setArry] = useState([]);

  useEffect(() => {
    formOnChange(id, []);
  }, []);

  const handleSelect = () => {
    setShow(false);
  };

  const handleClick = (item) => {
    if (!arry.some((i) => i.id === item.id)) {
      arry.push(item);
    } else {
      const index = arry.indexOf(item);
      arry.splice(index, 1);
    }
    formOnChange(id, [...arry]);
  };

  const deleteItem = (index) => {
    arry.splice(index, 1);
    formOnChange(id, [...arry]);
  };
  useOutsideClick(ref, handleSelect);

  return (
    <div ref={ref} className="select_container">
      <label className="select-label">{label}</label>
      <div style={{ position: "relative" }}>
        <div
          className="multiselect-with-check-input"
          onClick={() => {
            setShow(true);
          }}
        >
          <div className="selected-item-wrapper">
            {arry.length > 0
              ? arry.map((item, index) => {
                  return (
                    // <div>
                    <div className="selected-item-container">
                      <p className="selected-item-title">{item.name}</p>
                      <div>
                        <img
                          src={multiselectCross}
                          className="multiselect-item-cross"
                          onClick={() => deleteItem(index)}
                        />
                      </div>
                    </div>
                  );
                })
              : null}
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
        <ul className={`ul multiselect-with-check-list ${className} `}>
          {items.map((item) => (
            <li  title={item.name} id={item.id} key={item.id}>
              <div
                onClick={() => {
                  handleClick(item);
                }}
                className="select-item-container"
              >
                <input
                  type="checkbox"
                  id={item.id}
                  className="multiselect-checkbox-input"
                  onChange={() => {}}
                  checked={arry?.some((s) => s.id === item.id)}
                />
                <label
                  className="select-item-title multiselect-checkbox-label"
                  htmlFor={item.id}
                >
                  {item.name}
                </label>
              </div>
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
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    formOnChange: (key, value) => dispatch(handleFormChange(key, value)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MultiselectWithCheck);
