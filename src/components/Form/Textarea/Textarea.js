import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import { handleFormChange } from "../../../store";
import "./Textarea.css";

function Descriptions({
  id,
  value = "",
  handleFormChange,
  className = "",
  placeholder = "",
  onFocus = () => {},
  readOnly = false,
  maxLength,
  label = "",
  onchange = () => {},
  disabled,
  style,
  labelStyle,
  onlyRead,
  autoScrollToElement = true,
}) {
  const inputRef = useRef();

  useEffect(() => {
    if (inputRef.current) {
      auto_grow(inputRef.current);
      if (!value) {
        inputRef.current.style.height = "46px";
      }
    }
  }, [value]);

  const handleChange = (e) => {
    handleFormChange(id, e.target.value);
    onchange({ [id]: e.target.value });
  };

  const auto_grow = (element) => {
    element.style.height = element.scrollHeight + "px";
  };

  return (
    <>
      <div className={"text-area-style"} style={style}>
        <p htmlFor={id} style={labelStyle} className="textarea-label">
          {label}
        </p>

        {onlyRead ? (
          <div className={"only-read-text-container"}>
            <p>{value ? value : "________________________________________"}</p>
          </div>
        ) : (
          <textarea
            onFocus={(e) => {
              onFocus(e);
              if (autoScrollToElement) {
                e.target.scrollIntoView({
                  behavior: "smooth",
                  block: "center",
                });
              }
            }}
            ref={inputRef}
            value={value}
            maxLength={maxLength}
            onChange={handleChange}
            disabled={disabled}
            id={id}
            className={`${className} description`}
            placeholder={placeholder}
            readOnly={readOnly}
          />
        )}
      </div>
    </>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    value: state.formReducer[ownProps.id] ?? "",
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    handleFormChange: (key, value) => dispatch(handleFormChange(key, value)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Descriptions);
