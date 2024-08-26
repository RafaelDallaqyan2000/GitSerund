import React, { useState, useEffect, useCallback, useRef } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/Button/Button";
import Input from "../../../components/Form/Input";
import PhoneInput from "../../../components/Form/PhoneInput";
import ReCAPTCHA from "react-google-recaptcha";
import PasswordInput from "../../../components/Form/PasswordInput/PasswordInput";
import store, {
  handleFormChange,
  cleanForm,
  fetchNumberCodes,
  onRegister,
  onRegisterDone,
  handleAuthChange,
} from "../../../store";
import { MessagePopUp, SelectWithSearchHOC } from "../../../components";
import { useTranslation } from "react-i18next";

export const PersonRegister = ({
  onRegister,
  onRegisterDone,
  password,
  confirmPassword,
  email,
  phone_number,
  phone_code,
  loading,
  fetchNumberCodes,
  phoneCode,
  handleFormChange,
  handleAuthChange,
  popupDetails,
}) => {
  const navigate = useNavigate();

  const [text, setText] = useState("");
  const [className, setClassName] = useState("a");
  const [passwordMatch, setPasswordMatch] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const reRef = useRef();
  const { t } = useTranslation();

  const handleClosePopup = useCallback(() => {
    handleAuthChange("popupDetails", {
      type: "fail",
      title: "",
      text: "",
    });
  }, []);

  useEffect(() => {
    fetchNumberCodes();
    return () => {
      onRegisterDone();
    };
  }, []);

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
    if (
      email &&
      phone_number &&
      phone_number.length === 6 &&
      phone_code &&
      passwordMatch
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [email, phone_number, phone_code, passwordMatch]);

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
      case 0 || 1:
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
        break;
    }
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
    const format =
      /[\!\@\#\$\%\^\&\*\)\(\+\=\.\/\?\<\>\{\}\[\]\:\;\'\"\|\~\`\_\-]/;
    if (format.test(str)) {
      return true;
    } else {
      return false;
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const recaptchaValue = await reRef?.current?.executeAsync();
    reRef.current.reset();

    let {
      selectedSchool,
      fullName,
      specializationId,
      educationId,
      email,
      phone_code,
      phone_number,
      password,
      confirmPassword,
      image,
      subjects,
    } = store.getState().formReducer;

    const found = phoneCode.find((code) => code.id === phone_code);

    if (!phone_number || phone_number.length < 6) {
      handleAuthChange("popupDetails", {
        type: "fail",
        title: t("Error"),
        text: t("Wrong phone number"),
      });
      return;
    }

    let subjectIds = [];
    subjects?.forEach((e) => {
      subjectIds.push(e.id);
    });

    let reg = {
      schoolId: selectedSchool?.id,
      fullName,
      specializationId,
      educationId,
      email,
      phone: found.name + phone_number,
      subjectsIds: subjectIds,
      password,
      confirmPassword,
      image,
      captcha: recaptchaValue,
    };
    const changePath = () => {
      navigate("/check-mail");
    };

    onRegister(reg, changePath);
  };

  return (
    <div>
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

      <div className="register_form register_form-mobile password-register-page-height">
        <form className="formplace">
          <div className="form_title form_title-mobile-register">
            <p>{t("Sign Up")}</p>
          </div>

          <div className="form_subtitle">
            <p>{t("Personal information")}</p>
          </div>

          <div>
            <Input
              label={t("Email")}
              type="email"
              placeholder={t("Enter your email")}
              id="email"
              className="select-width select-input-for-mobile mobile_fields_focus"
              classNameForLabel="select-label-for-mobile"
            />
          </div>
          <div className="phone-content">
            <div>
              <label className="input_label phone-label-mobile">
                {t("Phone number")}
              </label>
            </div>
            <div style={{ display: "flex" }}>
              <SelectWithSearchHOC
                readOnly={true}
                optionLabelKey="name"
                optionUniqueKey="id"
                options={phoneCode}
                onOptionClick={(code) =>
                  handleFormChange("phone_code", code.id)
                }
                loading={false}
                placeholder="096"
                inputValue={
                  phoneCode.find((code) => code.id === phone_code)?.name
                }
                readOnlyStyle={{ marginTop: "-30px" }}
                inputStyle={{
                  width: "100%",
                  border: "1.5px solid #93c7ff",
                  height: "50px",
                }}
                labelStyle={{ width: "9vw !important", margin: "7.5px 0 0" }}
              />

              <PhoneInput
                label=" "
                type="tel"
                maxLength="6"
                placeholder="--- ---"
                id="phone_number"
                inputClassname="phone_input select-input-for-mobile"
                className="phone-input-div-reg "
              />
            </div>
          </div>
          <div>
            <PasswordInput
              label={t("Password")}
              type="password"
              placeholder=""
              id="password"
              eye={true}
              className="select-width select-input-for-mobile"
              classNameForLabel="select-label-for-mobile"
            />
            {password ? (
              <div className="line_div">
                <div className={`checkBar  ${className}`}></div>
                <div>
                  <label className="linetext">{text}</label>
                </div>
              </div>
            ) : null}
          </div>
          <div>
            <PasswordInput
              label={t("Repeat Password")}
              type="password"
              placeholder=""
              id="confirmPassword"
              eye={true}
              className="select-width select-input-for-mobile"
              classNameForLabel="select-label-for-mobile"
            />
            {confirmPassword ? (
              <div style={{ padding: "5px 0", color: "red", fontSize: "10px" }}>
                {passwordMatch ? "" : t("Passwords do not match")}
              </div>
            ) : null}
          </div>

          <ReCAPTCHA
            sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
            size={"invisible"}
            ref={reRef}
          />
          <div>
            <Button
              onClick={(e) => handleRegister(e)}
              className="mt-20 done-btn-register"
              loading={loading}
              disabled={disabled}
              title={t("Complete")}
            />
          </div>

          <div className="btn_div"></div>
          <div className="reg_page">
            <p className="register-pages">
              <span className="register-current-page">3</span>
              /3
            </p>
          </div>
        </form>
        <div className="bottom-text-register-mobile">
          <p className="">© 2020-2021 AUA.am</p>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    password: state.formReducer.password,
    confirmPassword: state.formReducer.confirmPassword,
    email: state.formReducer.email,
    phone_code: state.formReducer.phone_code,
    phone_number: state.formReducer.phone_number,
    subjects: state.formReducer.subjects,
    loading: state.authReducer.regLoading,
    phoneCode: state.authReducer.phoneCode,
    submitEmail: state.authReducer.submitEmail,
    popupDetails: state.authReducer.popupDetails,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    cleanForm: () => dispatch(cleanForm()),
    onRegisterDone: () => dispatch(onRegisterDone()),
    onRegister: (reg, changePatch) => dispatch(onRegister(reg, changePatch)),
    fetchNumberCodes: () => dispatch(fetchNumberCodes()),
    handleFormChange: (key, value) => dispatch(handleFormChange(key, value)),
    handleAuthChange: (key, value) => dispatch(handleAuthChange(key, value)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PersonRegister);
