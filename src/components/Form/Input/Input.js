import React, { useState, useEffect, useRef, useCallback } from "react";
import { connect } from "react-redux";
import { handleFormChange } from "../../../store";
import "./Input.css";
import { MessagePopUp } from "../../MessagePopUp/MessagePopUp";
import { PasswordEye } from "../PasswordEye";
import { useTranslation } from "react-i18next";

function Input({
  type = "text",
  name = "",
  placeholder = "",
  className = "",
  id,
  value = "",
  onFocus,
  formOnChange,
  onInput = () => {},
  label = "",
  eye = false,
  defaultValue = "",
  maxLength = "100",
  onChange = () => {},
  classNameForLabel = "",
  classInputContent = "",
  lessonProcess,
  disabled,
  title,
}) {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!value) {
      formOnChange(id, defaultValue);
    }
  }, []);

  const inputRef = useRef();

  const handleOnChange = (e) => {
    if (id === "duration") {
      let m = 0;

      lessonProcess?.map((proc) => {
        proc?.actions.map((i) => {
          if (
            !i.isMethodDeleted &&
            (i.teacherActionActive || i.studentActionActive)
          ) {
            m += Number(i?.duration);
          }
        });
      });
    }

    formOnChange(id, e.target.value);
    if (!e.target.value) {
      e.target.title = t("This field is required");
    } else if (e.target.type === "email" && !e.target.value.includes("@")) {
      e.target.title = t("Incorrect Email address");
    } else {
      e.target.title = "";
    }
    onChange({ [id]: e.target.value });
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    inputRef.current.style.border = "1.5px solid #93c7ff";
  }, [id]);

  const handleOnInvalid = (e) => {
    if (!e.target.value) {
      e.target.setCustomValidity(t("This field is required"));
    } else if (e.target.type === "email" && !e.target.value.includes("@")) {
      e.target.setCustomValidity(t("Incorrect Email address"));
    } else {
      e.target.setCustomValidity("");
    }
  };

  const handleClosePopup = useCallback(() => {
    setErrorMessage("");
  }, []);

  return (
    <>
      <MessagePopUp
        onClosePopup={handleClosePopup}
        open={!!errorMessage}
        title={t("Error")}
        text={errorMessage}
        closeBtnTitle={t("Close")}
        onAlertCancelClick={handleClosePopup}
        styleText={{ textAlign: "center" }}
        popUpContainerStyles={{ top: "50%" }}
        styleTitle={{
          color: "#EA6670",
        }}
        styleCancelBtn={{
          background: "#EA6670",
          color: "#FFF",
        }}
      />

      <div className={`${classInputContent}`}>
        <label className={`input_label ${classNameForLabel}`}>{label}</label>
      </div>
      <div style={{ position: "relative" }}>
        {eye ? (
          <PasswordEye show={showPassword} onClick={togglePassword} />
        ) : null}

        <input
          ref={inputRef}
          type={!showPassword ? type : "text"}
          className={`input_component ${className}`}
          id={id}
          onInvalid={handleOnInvalid}
          title={title}
          onInput={onInput}
          onFocus={onFocus}
          name={name}
          onChange={handleOnChange}
          disabled={disabled}
          placeholder={placeholder}
          autoComplete="on"
          value={value ?? ""}
          maxLength={maxLength}
          required
        />
      </div>
    </>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    value: state.formReducer[ownProps.id],
    lessonProcess: state.lessonProcessReducer.lessonProcess,
    minuteForAction: state.lessonProcessReducer.minuteForAction,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    formOnChange: (key, value) => dispatch(handleFormChange(key, value)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Input);
