import "./Select.css";
import React, { useRef, useState, useEffect } from "react";
import { connect } from "react-redux";
import { handleFormChange } from "../../../store";
import { useOutsideClick } from "../../../hooks/useOutsideClick";
import downIcon from "../../../img/caretDown.svg";
import { useTranslation } from "react-i18next";

const Select = ({
  labelStyle,
  readOnly = true,
  subjectForLsnPlan,
  value,
  formOnChange,
  setItemId,
  className = "",
  required,
  id = "",
  items = [],
  placeholder,
  form_eye_div,
  label = "",
  labelClassName = "",
  classNamePhoneSelect = "",
  inputClassName = "",
  callbackClickItem = () => {},
  dropDownIconClassName,
}) => {
  const ref = useRef();
  const [show, setShow] = useState(false);
  const [text, setText] = useState("");
  const { t } = useTranslation();

  useEffect(() => {
    if (items.length > 0) {
      let item = items.find((i) => i.id === value);
      if (id === "selectedMethod2" || id === "selectedMethod3") {
        if (value === 0) {
          setText(t("Select"));
        } else {
          setText(item?.name);
        }
      } else {
        setText(item?.name || item?.fullName);
      }
    }

    if (id === "phone_code") {
      items.map((code) => {
        if (value === code.name) {
          handleFormChange("phone_code", code.id);
          setText(code.name);
        }
      });
    }
  }, [items, value]);

  // useEffect(() => {
  //   if (items.length === 0 && !value) {
  //     setText("");
  //     formOnChange(id, 0);
  //   }
  // }, [items]);

  // useEffect(() => {
  //   if (items.length && value) {
  //     let item = items.find((i) => i.id === value);
  //     if (item) {
  //       if (setItemId) {
  //         setItemId(item.id);
  //       }
  //       handleClick(item);
  //     }
  //   }
  // }, [value]);

  const handleClose = () => setShow(false);

  const handleClick = (item) => {
    formOnChange(id, item.id);
    setTimeout(() => setShow(false), 0);

    if (id === "subjectForLsnPlan" && subjectForLsnPlan !== item.id) {
      formOnChange("subjectAndClassId", undefined);
    }
  };

  useOutsideClick(ref, handleClose);

  return (
    <div
      ref={ref}
      className={`select_container select_container_mobile ${classNamePhoneSelect}`}
    >
      <label className={`select-label ${labelClassName}`} style={labelStyle}>
        {label}
      </label>
      <div style={{ position: "relative" }}>
        <div
          style={{ cursor: "pointer" }}
          className={form_eye_div ? form_eye_div : "form_eye_div"}
          onClick={() => {
            if (items.length > 0) setShow(true);
          }}
        >
          <img
            src={downIcon}
            className={`caret_down_icon ${dropDownIconClassName}`}
          />
        </div>
        <input
          readOnly={readOnly}
          autoComplete="off"
          id={id}
          className={`${
            required ? "requiredField" : "select_input_component"
          }  ${inputClassName} ${className}`}
          onFocus={(e) => {
            if (items.length > 0) setShow(true);
          }}
          type="text"
          value={text}
          placeholder={placeholder}
          onChange={formOnChange}
        />
      </div>

      {show && (
        <ul className={`ul select ${className}`}>
          {id === "selectedMethod2" || id === "selectedMethod3" ? (
            <li
              key={0}
              onClick={() => {
                handleClick({
                  id: 0,
                  name: t("Select"),
                });
              }}
            >
              {t("Select")}
            </li>
          ) : null}
          {items.map((item) => {
            return (
              <li
                key={item.id}
                onClick={() => {
                  callbackClickItem();
                  handleClick(item);
                  if (setItemId) {
                    setItemId(item.id);
                  }
                }}
              >
                {item.fullName || item.name}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    value: state.formReducer[ownProps.id],
    subjectForLsnPlan: state.formReducer.subjectForLsnPlan,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    formOnChange: (key, value) => dispatch(handleFormChange(key, value)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Select);
