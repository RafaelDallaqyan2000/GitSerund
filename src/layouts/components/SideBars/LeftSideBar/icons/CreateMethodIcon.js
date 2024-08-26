import React from "react";

export function CreateMethodIcon( props) {
  const {className} = props
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="21"
      viewBox="0 0 20 21"
      fill="none"
      {...props}
    >
      <path
        d="M19.5 17C19.5 18.8977 17.8273 20.5 15.6818 20.5C13.5364 20.5 11.8636 18.8977 11.8636 17C11.8636 15.1024 13.5364 13.5 15.6818 13.5C17.8273 13.5 19.5 15.1024 19.5 17Z"
        fill="#DDDDDD"
        stroke="#8C8E92"
      />
      <path
        d="M16.0273 15.4004H15.3363V16.6804H13.9545V17.3204H15.3363V18.6004H16.0273V17.3204H17.4091V16.6804H16.0273V15.4004Z"
        fill="#8C8E92"
      />
      <path
        d="M12.0878 18.6H2C1.44772 18.6 1 18.1523 1 17.6V2C1 1.44772 1.44772 1 2 1H15.5455C16.0978 1 16.5455 1.44772 16.5455 2V13.4V13.0421"
        stroke="#8C8E92"
      />
      <rect
        x="6.18182"
        y="4.20117"
        width="7.77273"
        height="0.800001"
        fill="#8C8E92"
      />
      <rect
        x="6.18182"
        y="8.19971"
        width="7.77273"
        height="0.800001"
        fill="#8C8E92"
      />
      <rect
        x="6.18182"
        y="12.2012"
        width="7.77273"
        height="0.800001"
        fill="#8C8E92"
      />
      <rect
        x="3.22729"
        y="3.90039"
        width="1.59091"
        height="1.4"
        stroke="#8C8E92"
      />
      <rect
        x="3.22729"
        y="7.89893"
        width="1.59091"
        height="1.4"
        stroke="#8C8E92"
      />
      <rect
        x="3.22729"
        y="11.9004"
        width="1.59091"
        height="1.4"
        stroke="#8C8E92"
      />
    </svg>
  );
}
