import React from "react";

function Arrow({ className, containerClassName = "", fill, handleClick }) {
  return (
    <div className={containerClassName} onClick={handleClick}>
      <svg
        className={`arrow ${className}`}
        width="10"
        height="15"
        viewBox="0 0 10 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10 1.79057L4.1838 7.6194L10 13.4483L8.2094 15.2389L0.59 7.6194L8.2094 -7.82696e-08L10 1.79057Z"
          fill={fill}
        />
      </svg>
    </div>
  );
}

export default Arrow;
