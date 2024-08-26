import React, { useState, useEffect, useCallback } from "react";
import { connect } from "react-redux";
import Button from "../../../../components/Button/Button";
import Input from "../../../../components/Form/Input";
import store, { forgotPassword } from "../../../../store";
import { cleanForm } from "../../../../store/form/actions";
import "./ForgotPassword.css";
import { handleAuthChange } from "../../../../store/auth/actions/handleAuthChange";
import { MessagePopUp } from "../../../../components/MessagePopUp/MessagePopUp";
import { useTranslation } from "react-i18next";

export const ForgotPassword = ({
  forgotPassword,
  checkEmail,
  cleanForm,
  email,
  handleAuthChange,
  popupDetails,
}) => {
  const [disabled, setDisabled] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    if (email) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [email]);

  const handleForget = (e) => {
    e.preventDefault();
    let email = store.getState().formReducer.email;
    forgotPassword(email);
    cleanForm();
  };

  const handleClosePopup = useCallback(() => {
    handleAuthChange("popupDetails", {
      type: "fail",
      title: "",
      text: "",
    });
  }, []);

  if (checkEmail) {
    return (
      <div className="forgotSuccess">
        <p>
          {t(
            "A link has been sent to your email address, following which you can enter a new password."
          )}
        </p>
      </div>
    );
  }
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
        <form className="forgot_pass_formplace">
          <div className="form_title">
            <p className="forgot_pass_title">{t("Reset password")}</p>
          </div>

          <div className="forgot_form_subtitle">
            <p className="forgot_pass_text">
              {t("Forgot password? No worries.")}
            </p>
            <p className="forgot_pass_text">
              {t("Enter your email address and we will send it.")}
            </p>
          </div>
          <div className="input-and-label-forgot">
            <Input
              label={t("EMAIL")}
              type="email"
              placeholder={t("Enter your email")}
              id="email"
              className="input_component-mobile forgot_pass_input"
              classNameForLabel="input_label-mobile"
            />
          </div>
          <div
            onClick={(e) => handleForget(e)}
            className="forgot_pass_submit_wrapper"
          >
            <Button
              disabled={disabled ? true : false}
              title={t("Send")}
              className="enterbtn-forgot"
            />
          </div>
        </form>
      </div>
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    email: state.formReducer.email,
    checkEmail: state.authReducer.checkEmail,
    popupDetails: state.authReducer.popupDetails,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    forgotPassword: (email) => dispatch(forgotPassword(email)),
    cleanForm: () => dispatch(cleanForm()),
    handleAuthChange: (key, value) => dispatch(handleAuthChange(key, value)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
