import "./login.css";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import PasswordInput from "../../components/Form/PasswordInput/PasswordInput";
import {
  cleanForm,
  handleFormChange,
  onLogin,
  navigateToEmis,
  signInWithEmis,
  handleAuthChange,
} from "../../store";
import { MessagePopUp } from "../../components";
import emisLogo from "../../img/emisLogo.svg";
import ReCAPTCHA from "react-google-recaptcha";
import { isLoadingScreen } from "../../store/auth/actions/isLoadingScreen";
import { useTranslation } from "react-i18next";

function Login({
  onLogin,
  loading,
  errorMsg,
  handleFormChange,
  handleAuthChange,
  popupDetails,
  navigateToEmis,
  signInWithEmis,
  loadingForEmisBtn,
  isLoading,
  emailValue,
  passwordValue,
}) {
  const [remember, setRemember] = useState(false);
  let navigate = useNavigate();
  const location = useLocation();
  const reRef = useRef();

  const { t } = useTranslation();
  const prevPath = localStorage.getItem("prevPath");

  useEffect(() => {
    if (
      !prevPath &&
      location.pathname !== "/home" &&
      location.pathname !== "/login" &&
      location.pathname !== "/null" &&
      location.pathname !== "/undefined" &&
      location.pathname !== "/home"
    ) {
      localStorage.setItem("prevPath", location.pathname);
    }

    handleFormChange("email", undefined);
    handleFormChange("password", undefined);
    return () => {
      handleFormChange("email", "");
      handleFormChange("password", "");
    };
  }, []);

  const callbackLogin = () => {
    navigate(prevPath);
    window.location.reload();
  };

  function toForgotPage() {
    navigate(`/forgot-password`);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const recaptchaValue = await reRef?.current?.executeAsync();

    onLogin({
      email: emailValue,
      password: passwordValue,
      remember,
      captcha: recaptchaValue,
      callback: callbackLogin,
    });
  };

  const handleClosePopup = useCallback(() => {
    handleAuthChange("popupDetails", {
      type: "fail",
      title: "",
      text: "",
    });
  }, []);

  const navigation = (path = "") => {
    return navigate(path);
  };

  const handleEmisSignIn = (e) => {
    e.preventDefault();
    e.stopPropagation();
    handleFormChange("loadingForEmisBtn", true);
    navigateToEmis();
  };

  useEffect(() => {
    if (location.search.indexOf("?_is=") !== -1) {
      isLoading(true);
      const emisKey = location.search.split("?_is=")[1];
      signInWithEmis(emisKey, navigation);
    }
  }, []);

  return (
    <div className="form">
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

      <div>
        <form className="formplace formplace-fot-label" onSubmit={handleSubmit}>
          {/* <ReCAPTCHA
            sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
            size={"invisible"}
            ref={reRef}
          /> */}
          <div className="form_title_container">
            <p className="form_title">{t("Sign in")}</p>
          </div>

          <div className="input_container">
            <label className="input_label-mobile">{t("Email")}</label>
            <input
              type="email"
              className="input_component-mobile mobile_fields_focus"
              value={emailValue}
              onChange={(e) => handleFormChange("email", e.target.value)}
              required
            />
          </div>

          <PasswordInput
            label={t("Password")}
            type="password"
            id="password"
            eye={true}
            className="input_component-mobile passwordInLogin mobile_fields_focus"
            classNameForLabel="input_label-mobile"
          />
          <div
            className="errorMessageInLogin"
            style={{
              display: errorMsg ? "block" : "none",
              wordBreak: "break-word",
            }}
          >
            <span className="error">{errorMsg}</span>
          </div>

          <div className="check_div">
            {/* onClick={() => setRemember(!remember)} */}
            <div className="checkbox_div">
              <input
                onChange={() => setRemember(!remember)}
                type="checkbox"
                className="check mobile_fields_focus mobile_fields_focus"
                id="remember"
              />
              <label htmlFor="remember" className="checktext">
                {t("Remember me")}
              </label>
            </div>

            <div onClick={() => toForgotPage()} className="forgotpsw">
              {t("Forgot password?")}
            </div>
          </div>

          <div className="login_btn_container"></div>

          <Button
            loading={!!loading}
            title={t("Sign in")}
            className="enterbtn-login"
          />

          <div className="line-between-two-btns">
            <span>{t("or")}</span>
          </div>

          <Button
            title={t("Sign in with EMIS")}
            onClick={handleEmisSignIn}
            className="enterbtn-login-emis"
            loading={!!loadingForEmisBtn}
          >
            <img src={emisLogo} />
          </Button>
        </form>

        <div className="bottom-text">
          <p className="login-bottom-text">© 2020-2021 AUA.am</p>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    error: state.authReducer.error,
    loading: state.authReducer.regLoading,
    loadingForEmisBtn: state.formReducer.loadingForEmisBtn ?? false,
    errorMsg: state.formReducer.errorMsg,
    popupDetails: state.authReducer.popupDetails,
    authLoading: state.authReducer.authLoading,
    emailValue: state.formReducer.email,
    passwordValue: state.formReducer.password,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    cleanForm: () => dispatch(cleanForm()),
    onLogin: ({ email, password, remember, captcha, navigate, callback }) =>
      dispatch(
        onLogin({ email, password, remember, captcha, navigate, callback })
      ),
    handleFormChange: (key, value) => dispatch(handleFormChange(key, value)),
    handleAuthChange: (key, value) => dispatch(handleAuthChange(key, value)),
    navigateToEmis: (navigation) => dispatch(navigateToEmis(navigation)),
    signInWithEmis: (key, navigate) => dispatch(signInWithEmis(key, navigate)),
    isLoading: (loading) => dispatch(isLoadingScreen(loading)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
