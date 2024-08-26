import "../login.css";
import React, { useState, useEffect, useCallback } from "react";
import { connect } from "react-redux";
import Button from "../../../components/Button/Button";
import Input from "../../../components/Form/Input";
import store, { recoverPassword, handleAuthChange } from "../../../store";
import { useParams, useNavigate } from "react-router-dom";
import { MessagePopUp } from "../../../components";
import { useTranslation } from "react-i18next";

export const RecoverPassword = ({
  recoverPassword,
  password,
  confirmPassword,
  popupDetails,
  handleAuthChange,
}) => {
  const { t } = useTranslation();
  const [text, setText] = useState("");
  const [className, setClassName] = useState("a");
  const [passwordMatch, setPasswordMatch] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    if (password) {
      progressBar(password);
    }
  }, [password]);
  useEffect(() => {
    if (confirmPassword) {
      if (confirmPassword === password) {
        setPasswordMatch(true);
      } else {
        setPasswordMatch(false);
      }
    }
  }, [confirmPassword, password]);

  useEffect(() => {
    if (passwordMatch) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [passwordMatch]);

  let { recoverToken } = useParams();
  const handleRecover = (e) => {
    e.preventDefault();
    const changePath = () => {
      navigate("/login");
    };
    let { password, confirmPassword } = store.getState().formReducer;
    recoverPassword(recoverToken, password, confirmPassword, changePath);
  };

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

  const handleClosePopup = useCallback(() => {
    handleAuthChange("popupDetails", {
      type: "fail",
      title: "",
      text: "",
    });
  }, []);

  return (
    <>
      <MessagePopUp
        onClosePopup={handleClosePopup}
        open={!!popupDetails?.text}
        title={popupDetails?.title}
        text={popupDetails?.text}
        closeBtnTitle={t("Close")}
        onAlertCancelClick={handleClosePopup}
        styleText={{ textAlign: "center" }}
        popUpContainerStyles={{ top: "50%" }}
        styleTitle={{
          color: popupDetails?.type === "success" ? "#1C1C1C" : "#EA6670",
        }}
        styleCancelBtn={{
          background:
            popupDetails?.type === "success"
              ? "linear-gradient(83.13deg, #6FD89C 0%, #46B776 100%)"
              : "#EA6670",
          color: "#FFF",
        }}
      />
      <div className="form">
        <form className="formplace formplace-for-mobile-recover">
          <div className="form_title ">
            <p>{t("New password")}</p>
          </div>
          <div className="recover-form">
            <Input
              label={t("New password")}
              type="password"
              placeholder=""
              id="password"
              eye={true}
              className="input_component-mobile"
              classNameForLabel="input_label-mobile"
            />
            {password ? (
              <div className="line_div">
                <div className={`checkBar  ${className}`}></div>
                <div>
                  <label className="linetext">{text}</label>
                </div>
              </div>
            ) : null}
            <div className="recover-confirm-password">
              <Input
                label={t("Repeat password")}
                type="password"
                placeholder=""
                id="confirmPassword"
                eye={true}
                className="input_component-mobile"
                classNameForLabel="input_label-mobile"
              />
              {confirmPassword ? (
                <div
                  style={{ padding: "5px 0", color: "red", fontSize: "10px" }}
                >
                  {passwordMatch ? "" : t("Passwords do not match")}
                </div>
              ) : null}
            </div>
          </div>
          <div onClick={(e) => handleRecover(e)} className="recover-save-btn">
            <Button disabled={!!disabled} title={t("Confirm")} />
          </div>
        </form>
      </div>
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    password: state.formReducer.password,
    popupDetails: state.authReducer.popupDetails,
    confirmPassword: state.formReducer.confirmPassword,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    recoverPassword: (recoverToken, password, confirmPassword, changePath) =>
      dispatch(
        recoverPassword(recoverToken, password, confirmPassword, changePath)
      ),
    handleAuthChange: (key, value) => dispatch(handleAuthChange(key, value)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RecoverPassword);
