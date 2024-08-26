import React, {useCallback, useRef, useState} from "react";
import { useOutsideClick } from "../../../hooks/useOutsideClick";
import "./SelectWithSearch.css";
import downIcon from "../../../img/caretDown.svg";

const SelectWithSearch = ({
  label,
  placeholder,
  inputValue,
  children,
  inputStyle,
  labelStyle,
  onKeyDown = () => {},
  onChange = () => {},
  onSelectScroll = () => {},
  onClick = () => {},
  onFocus = () => {},
  onBlur = () => {},
  onOutSideClick = () => {},
  onClose = () => {},
  disabledBackground = "#ECEEF0",
  disabled = false,
  readOnly = false,
  errorMessage = "",
  readOnlyStyle,
  labelClassName = '',
  inputClassName = '',
  showWindowAfterClick = false
}) => {
  const [show, setShow] = useState(false);
  const ref = useRef();

  const handleOutsideClick = () => {
    setShow(false);
    onClose();
    onOutSideClick();
  };

  const handleClickLabel = useCallback(
    (e) => {
      if (disabled || show) return;
      setShow(true);
      onClick(e);
    },
    [disabled, show]
  );

  const handleKeyDown = useCallback((e) => {
    onKeyDown(e);
    if(e.keyCode === 13) setShow(false);
  }, [onKeyDown]);

  const downIconStyle = {
    rotate: show && "180deg",
    background: disabled ? disabledBackground : "#ffffff",
    cursor: !disabled && "pointer",
  };

  useOutsideClick(ref, handleOutsideClick);

  return (
    <div
      ref={ref}
      className={`select_container select_container_mobile `}
      style={labelStyle}
      onKeyDown={handleKeyDown}
    >
      <label className={`label_on_input ${labelClassName}`} onClick={handleClickLabel}>
        {label}
        <input
          readOnly={readOnly}
          className={`input_and_select ${errorMessage && "obligatory_input"} ${inputClassName} mobile_fields_focus`}
          type="text"
          placeholder={placeholder}
          value={inputValue ?? ''}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          disabled={disabled}
          style={{...inputStyle, cursor: readOnly && 'pointer'}}
        />
        <img
          style={{ ...downIconStyle }}
          src={downIcon}
          className="caret_down_icon"
        />
      </label>
      {errorMessage && <p className="obligatory_text">{errorMessage}</p>}
        <div
          className={`option_container ${readOnly && "read_only"}`}
          style={{ display: show? undefined: "none", ...readOnlyStyle}}
          onScroll={onSelectScroll}
          onClick={() =>  setShow(showWindowAfterClick)}
        >
          {children}
        </div>
      </div>
  );
};

export default SelectWithSearch;
