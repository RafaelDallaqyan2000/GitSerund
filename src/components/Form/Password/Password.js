import React, { useState,useEffect } from "react";
import { connect } from "react-redux";
import { handleFormChange } from "../../../store";
import "./Password.css";
import { useTranslation } from "react-i18next";

function Password({
  type = "text",
  name = "",
  placeholder = "",
  classname = "",
  id,
  value = "",
  formOnChange,
  label = "",
  eye = false,
  maxLength = "100",
}) {
  const [showPassword, setShowPassword] = useState(false);
  const { t } = useTranslation();
  const [text, setText] = useState("");
  const [className, setClassName] = useState("a");

  const progressBar = (e) => {
    let count = 0;
    if (hasLength(e)) {
      count++;
    }

    if (hasCase(e)) {
      count++;
    }

    if (hasUppercase(e)) {
      count++;
    }

    if (hasSymbol(e)) {
      count++;
    }

    switch (count) {
      case 0:
        setText(t("Very weak"));
        setClassName("red");
        break;
      case 1:
        setText(t("Very weak"));
        setClassName("red");
        break;
      case 2:
        setText(t("Weak"));
        setClassName("yellow");
        break;
      case 3:
        setText(t("Average"));
        setClassName("orange");
        break;
      case 4:
        setText(t("Hard"));
        setClassName("green");
    }

  
    count = 0;
  };

  const hasLength = (str) => {
    if (str.length >= 8) {
      return true;
    } else {
      return false;
    }
  };

  const hasCase = (str) => {
    let lettersCount = 0;
    for (const element in str) {
      if (/[a-zA-Z]/.test(str[element])) {
        lettersCount++;
      }
    }
    if (lettersCount >= 2) {
      return true;
    } else {
      return false;
    }
  };

  const hasUppercase = (str) => {
    if (/[A-Z]/.test(str)) {
      return true;
    } else {
      return false;
    }
  };

  const hasSymbol = (str) => {
    const format = /[\!\@\#\$\%\^\&\*\)\(\+\=\.\<\>\{\}\[\]\:\;\'\"\|\~\`\_\-]/;
    if (format.test(str)) {
      return true;
    } else {
      return false;
    }
  };

  const handleOnChange = (e) => {
    formOnChange(id, e.target.value);
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div style={{ margin: "20px 0" }}>
      <div>
        <label className="input_label">{label}</label>
      </div>
      <div style={{ position: "relative" }}>
        {eye ? (
          <div className="form_eye_div" onClick={togglePassword}>
            <svg
              width="20"
              height="18"
              viewBox="0 0 20 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {!showPassword ? (
                <path
                  d="M18.7399 5.15454C18.5306 4.79706 18.0712 4.6769 17.7137 4.88615C17.3563 5.0954 17.2361 5.55482 17.4453 5.91229L18.7399 5.15454ZM18.0926 12.2307L17.4453 11.8519L18.0926 12.2307ZM7.16464 15.6596C6.77298 15.5248 6.34619 15.733 6.21137 16.1247C6.07656 16.5164 6.28478 16.9432 6.67645 17.078L7.16464 15.6596ZM1.9074 12.2307L2.55466 11.8519L1.9074 12.2307ZM1.9074 5.53341L2.55466 5.91229L1.9074 5.53341ZM11.9162 6.85039C12.216 7.13626 12.6907 7.12501 12.9766 6.82526C13.2624 6.52551 13.2512 6.05077 12.9514 5.7649L11.9162 6.85039ZM6.7432 11.7978C7.01234 12.1126 7.48577 12.1497 7.80062 11.8805C8.11548 11.6114 8.15254 11.138 7.8834 10.8231L6.7432 11.7978ZM14.3067 8.94278C14.3067 8.52857 13.9709 8.19278 13.5567 8.19278C13.1425 8.19278 12.8067 8.52857 12.8067 8.94278H14.3067ZM9.99944 11.8054C9.58523 11.8054 9.24944 12.1411 9.24944 12.5554C9.24944 12.9696 9.58523 13.3054 9.99944 13.3054V11.8054ZM18.4095 1.40822C18.7001 1.11303 18.6963 0.638169 18.4011 0.347591C18.1059 0.0570128 17.6311 0.0607518 17.3405 0.355942L18.4095 1.40822ZM2.15301 15.7845C1.86243 16.0797 1.86617 16.5546 2.16136 16.8451C2.45655 17.1357 2.93141 17.132 3.22199 16.8368L2.15301 15.7845ZM17.4453 5.91229C18.5182 7.74518 18.5182 10.019 17.4453 11.8519L18.7399 12.6096C20.0867 10.3087 20.0867 7.45545 18.7399 5.15454L17.4453 5.91229ZM17.4453 11.8519C15.2217 15.6507 10.8404 16.9248 7.16464 15.6596L6.67645 17.078C10.9744 18.5573 16.1274 17.0728 18.7399 12.6096L17.4453 11.8519ZM2.55466 11.8519C1.48178 10.019 1.48178 7.74518 2.55466 5.91229L1.26013 5.15454C-0.086711 7.45545 -0.0867115 10.3087 1.26013 12.6096L2.55466 11.8519ZM4.45255 14.1209C3.72734 13.5078 3.08181 12.7524 2.55466 11.8519L1.26013 12.6096C1.87315 13.6569 2.62893 14.5434 3.48415 15.2664L4.45255 14.1209ZM2.55466 5.91229C5.26824 1.27648 11.2017 0.402043 15.1232 3.30735L16.0162 2.10208C11.4173 -1.30499 4.44922 -0.293622 1.26013 5.15454L2.55466 5.91229ZM7.19331 8.94278C7.19331 7.34909 8.46065 6.07907 9.99944 6.07907V4.57907C7.60973 4.57907 5.69331 6.54333 5.69331 8.94278H7.19331ZM9.99944 6.07907C10.7392 6.07907 11.4126 6.3701 11.9162 6.85039L12.9514 5.7649C12.1822 5.03133 11.1429 4.57907 9.99944 4.57907V6.07907ZM7.8834 10.8231C7.45402 10.3208 7.19331 9.66455 7.19331 8.94278H5.69331C5.69331 10.0326 6.08864 11.032 6.7432 11.7978L7.8834 10.8231ZM12.8067 8.94278C12.8067 10.5349 11.5387 11.8054 9.99944 11.8054V13.3054C12.3887 13.3054 14.3067 11.3416 14.3067 8.94278H12.8067ZM17.3405 0.355942L2.15301 15.7845L3.22199 16.8368L18.4095 1.40822L17.3405 0.355942Z"
                  fill="#8C8E92"
                />
              ) : (
                <path
                  d="M1.9074 5.65134L1.26013 5.27246H1.26013L1.9074 5.65134ZM18.0926 5.65134L18.7399 5.27246V5.27246L18.0926 5.65134ZM18.0926 12.3487L17.4453 11.9698L18.0926 12.3487ZM1.9074 12.3487L2.55466 11.9698L1.9074 12.3487ZM2.55466 6.03021C5.89524 0.323262 14.1048 0.323262 17.4453 6.03021L18.7399 5.27246C14.82 -1.42415 5.18 -1.42415 1.26013 5.27246L2.55466 6.03021ZM17.4453 6.03021C18.5182 7.8631 18.5182 10.1369 17.4453 11.9698L18.7399 12.7275C20.0867 10.4266 20.0867 7.57338 18.7399 5.27246L17.4453 6.03021ZM17.4453 11.9698C14.1048 17.6767 5.89523 17.6767 2.55466 11.9698L1.26013 12.7275C5.18 19.4242 14.82 19.4242 18.7399 12.7275L17.4453 11.9698ZM2.55466 11.9698C1.48178 10.1369 1.48178 7.8631 2.55466 6.03021L1.26013 5.27246C-0.086711 7.57338 -0.0867115 10.4266 1.26013 12.7275L2.55466 11.9698ZM12.8067 9.0607C12.8067 10.6528 11.5387 11.9233 9.99944 11.9233V13.4233C12.3887 13.4233 14.3067 11.4595 14.3067 9.0607H12.8067ZM9.99944 11.9233C8.46049 11.9233 7.19331 10.6531 7.19331 9.0607H5.69331C5.69331 11.4592 7.60988 13.4233 9.99944 13.4233V11.9233ZM7.19331 9.0607C7.19331 7.46701 8.46065 6.19699 9.99944 6.19699V4.69699C7.60973 4.69699 5.69331 6.66125 5.69331 9.0607H7.19331ZM9.99944 6.19699C11.5385 6.19699 12.8067 7.46732 12.8067 9.0607H14.3067C14.3067 6.66094 12.3888 4.69699 9.99944 4.69699V6.19699Z"
                  fill="#8C8E92"
                />
              )}
            </svg>
          </div>
        ) : null}

        <input
        type={showPassword ? "text" : "password"}
        onChange={(e) => {
            handleOnChange(e);
          progressBar(e.target.value);
          // setClassName();
        }}
          className={ `input_component ${classname}`}
          id={id}
          name={name}
        //   onChange={handleOnChange}
          placeholder={placeholder}
          value={value}
          maxLength={maxLength}
          required
         
        />
      </div>
      <div className="line_div">
      {/* <div className={`line ${className}`}></div> */}
            <div className={className}></div>
            <label className="linetext">{text}</label>
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
export default connect(mapStateToProps, mapDispatchToProps)(Password);