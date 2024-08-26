import React from "react";
import "./button.css";

function Button({
  onClick,
  title,
  className = "",
  disabled = false,
  loading = false,
  children
}) {
  return (
    <button
      onClick={onClick}
      type="submit"
      className={`enterbtn ${className} ` + (disabled ? "disabled" : "")}
      disabled={disabled}
    >

      {loading ? <p className='loading_on_btn'/> : <>{children}{title}</>}
    </button>
  );
}

export default Button;
