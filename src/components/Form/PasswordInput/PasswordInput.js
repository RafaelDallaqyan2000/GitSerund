import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { handleFormChange } from "../../../store";
import "./passwordInput.css";
import { PasswordEye } from "../PasswordEye";
import { useTranslation } from "react-i18next";

function PasswordInput({
  type = "text",
  name = "",
  placeholder = "",
  className = "",
  id,
  formOnChange,
  onInput = () => {},
  label = "",
  eye = false,
  maxLength = "100",
  classNameForLabel = "",
  containerStyle,
}) {
  const [showPassword, setShowPassword] = useState(false);
  const { t } = useTranslation();

  const inputRef = useRef();
  const handleOnChange = (e) => {
    formOnChange(id, e.target.value);
    if (!e.target.value) {
      e.target.title = t("This field is required");
    } else if (e.target.type === "email" && !e.target.value.includes("@")) {
      e.target.title = t("Incorrect Email address");
    } else {
      e.target.title = "";
    }
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
  return (
    <div className="password-container" style={containerStyle}>
      <div>
        <label className={`input_label ${classNameForLabel}`}>{label}</label>
      </div>
      <div style={{ position: "relative" }}>
        {eye ? (
          <PasswordEye show={showPassword} onClick={togglePassword} />
        ) : null}

        <input
          ref={inputRef}
          type={!showPassword ? type : "text"}
          className={`input_component ${className} mobile_fields_focus`}
          id={id}
          onInvalid={handleOnInvalid}
          title={t("This field is required")}
          onInput={onInput}
          name={name}
          onChange={handleOnChange}
          placeholder={placeholder}
          autoComplete="off"
          maxLength={maxLength}
          required
        />
      </div>
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
    formOnChange: (key, value) => dispatch(handleFormChange(key, value)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(PasswordInput);
