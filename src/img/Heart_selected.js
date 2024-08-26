import React from "react";

function Heart_selected({ className = "" }) {
  return (
    <svg
      className={`heart ${className}`}
      style={{ cursor: "pointer" }}
      width="20"
      height="20"
      viewBox="0 0 19 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.21751 16.3781C7.40867 15.2649 5.72593 13.9547 4.19941 12.471C3.1262 11.4025 2.30917 10.0998 1.81091 8.66282C0.914286 5.87525 1.96161 2.68402 4.8926 1.7396C6.43301 1.2437 8.11537 1.52713 9.41341 2.50123C10.7119 1.52831 12.3937 1.24498 13.9342 1.7396C16.8652 2.68402 17.9201 5.87525 17.0234 8.66282C16.5252 10.0998 15.7082 11.4025 14.6349 12.471C13.1084 13.9547 11.4257 15.2649 9.61685 16.3781L9.42095 16.5L9.21751 16.3781Z"
        fill="url(#paint0_linear_4193:4190)"
        stroke="url(#paint1_linear_4193:4190)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient
          id="paint0_linear_4193:4190"
          x1="1.27053"
          y1="16.5"
          x2="18.1816"
          y2="15.4734"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#6AB1FE" />
          <stop offset="1" stopColor="#2B89EF" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_4193:4190"
          x1="1.27053"
          y1="16.5"
          x2="18.1816"
          y2="15.4734"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#6AB1FE" />
          <stop offset="1" stopColor="#2B89EF" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default Heart_selected;
