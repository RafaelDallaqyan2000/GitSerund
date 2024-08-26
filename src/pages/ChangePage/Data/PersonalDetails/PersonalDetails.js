import "../Data.css";
import "./PersonalDetails.css";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { connect } from "react-redux";
import store, {
  handleFormChange,
  fetchEducations,
  fetchSpecializations,
  editPassword,
  fetchNumberCodes,
  fetchProfileDetails,
  handleAuthChange,
} from "../../../../store";
import "../../../Home/RecentAdditions/RecentAdditions.css";
import Select from "../../../../components/Form/Select/Select";
import Input from "../../../../components/Form/Input";
import PopupPassword from "../PopupPassword/PopupPassword";
import Button from "../../../../components/Button/Button";
import PasswordInput from "../../../../components/Form/PasswordInput/PasswordInput";
import PhoneInput from "../../../../components/Form/PhoneInput";
import { Link, useLocation } from "react-router-dom";
import { SelectWithSearchHOC, MessagePopUp } from "../../../../components";
import { useTranslation } from "react-i18next";
const PersonalDetails = ({
  specializations,
  educations,
  fetchEducations,
  fetchSpecializations,
  newPassword,
  editPassword,
  handleFormChange,
  fetchNumberCodes,
  phoneCode,
  fetchProfileDetails,
  phone_code,
  confirmPassword,
  educationId,
  specializationId,
  oldPassword,
  handleAuthChange,
  popupDetails,
  setEditInfo = () => {},
  fullName,
  email,
  phone_number,
  inProfilePage,
  checkUpdateFixedInformationAboutUser,
}) => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const wrongPassword = useRef();
  const [text, setText] = useState("");
  const [className, setClassName] = useState("a");
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const fixedInformationAboutUser = useMemo(
    (e) => {
      return {
        fullName,
        email,
        educationId,
        specializationId,
        phoneCode: phone_code,
        phoneNumber: phone_number,
      };
    },
    [checkUpdateFixedInformationAboutUser, inProfilePage]
  );

  const screenInfo = {
    fullName,
    email,
    educationId,
    specializationId,
    phoneCode: phone_code,
    phoneNumber: phone_number,
  };

  useEffect(() => {
    setEditInfo(
      JSON.stringify(fixedInformationAboutUser) !== JSON.stringify(screenInfo)
    );

    for (let i = 0; i < Object.keys(screenInfo).length; i++) {
      if (!Object.values(screenInfo)[i]) {
        setEditInfo(false);
      }
    }
  }, [Object.values(screenInfo)]);

  useEffect(() => {
    fetchNumberCodes();
    fetchEducations(() => {});
    fetchSpecializations(() => {}, i18n.language);
    fetchProfileDetails(i18n?.language);

    function updateSize() {
      setScreenWidth(window.innerWidth);
    }

    window.addEventListener("resize", updateSize);

    return () => window.removeEventListener("resize", updateSize);
  }, []);

  useEffect(() => {
    if (newPassword) {
      progressBar(newPassword);
    }
  }, [newPassword]);

  const togglePopup = () => {
    let {
      oldPassword = "",
      newPassword = "",
      confirmPassword,
    } = store.getState().formReducer;

    let passwords = {
      oldPassword,
      newPassword,
      confirmPassword,
    };

    if (!!oldPassword && !!newPassword && newPassword === confirmPassword) {
      editPassword(passwords);
      setIsOpen(!isOpen);
      handleFormChange("oldPassword", null);
      handleFormChange("newPassword", null);
      handleFormChange("confirmPassword", null);
    } else {
      wrongPassword.current.style.display = "block";
    }
  };

  const close = () => {
    setIsOpen(false);
    handleFormChange("oldPassword", null);
    handleFormChange("newPassword", null);
    handleFormChange("confirmPassword", null);
  };

  const progressBar = (e) => {
    let count = 0;
    if (hasLength(e) || hasCase(e) || hasUppercase(e) || hasSymbol(e)) {
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

  const hasLength = (str) => str.length >= 8;

  const hasCase = (str) => {
    let lettersCount = 0;
    for (const element in str) {
      if (/[a-zA-Z]/.test(str[element])) {
        lettersCount++;
      }
    }

    return lettersCount >= 2;
  };

  const hasUppercase = (str) => {
    return /[A-Z]/.test(str);
  };

  const hasSymbol = (str) => {
    const format = /[\!\@\#\$\%\^\&\*\)\(\+\=\.\<\>\{\}\[\]\:\;\'\"\|\~\`\_\-]/;
    return format.test(str);
  };

  const handleClosePopup = useCallback(() => {
    handleAuthChange("popupDetails", {
      type: "fail",
      title: "",
      text: "",
    });
  }, []);

  const handleClickSpecializationOption = useCallback((specialization) => {
    handleFormChange("specializationId", specialization.id);
  }, []);

  const handleClickPhoneCode = useCallback((code) => {
    handleFormChange("phone_code", code.name);
  }, []);

  return (
    <div className="padding-top-persn-det">
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
        <Input
          label={t("Name Surname")}
          type="text"
          placeholder={t("Your details")}
          id="fullName"
          onChange={() => setEditInfo(true)}
          className="select-input  personal-data-texts select-input-personal-details"
          classNameForLabel="select-label-personal-details"
        />
      </div>
      <div>
        <SelectWithSearchHOC
          optionLabelKey="name"
          optionUniqueKey="id"
          options={specializations}
          onOptionClick={handleClickSpecializationOption}
          loading={false}
          placeholder={t("Specialiasation")}
          inputValue={
            specializations.find(
              (specialization) => specialization.id === specializationId
            )?.name
          }
          label={t("Specialiasation")}
          inputStyle={{ width: "100%", border: "1px solid #93c7ff" }}
          labelStyle={{ width: "100%", margin: "8px 0 0" }}
        />
      </div>
      <div>
        <Select
          dropDownIconClassName={"openDropdownIcon"}
          placeholder={t("Higher")}
          id="educationId"
          label={t("Education")}
          className="select-input  select-input-personal-details"
          labelClassName="select-label-personal-details"
          classNamePhoneSelect="select-content"
          items={educations}
        />
      </div>

      <div className="mt-20 mt-20-persn-det">
        <Input
          label={t("Email")}
          type="email"
          //   name="anun"
          placeholder={t("Enter your email")}
          id="email"
          onChange={(e) => {
            if (e.email?.indexOf("@") !== -1) {
              setEditInfo(true);
            }
          }}
          className="select-input select-input-personal-details"
          classNameForLabel="select-label-personal-details"
          classInputContent="select-content"
        />
      </div>
      <div className="phone-content">
        <div>
          <label className="input_label select-label-personal-details">
            {t("Mobile number")}
          </label>
        </div>
        <div style={{ display: "flex", width: "100%" }}>
          <SelectWithSearchHOC
            optionLabelKey="name"
            optionUniqueKey="id"
            options={phoneCode}
            onOptionClick={handleClickPhoneCode}
            loading={false}
            placeholder="096"
            inputValue={
              phoneCode?.find((code) => code?.name === phone_code)?.name
            }
            inputStyle={{
              width: "100%",
              border: "1px solid #93c7ff",
              height: "49px",
            }}
            labelStyle={{ width: "11vw !important", margin: "8px 0 0" }}
            readOnlyStyle={{ top: "50px" }}
            onChange={() => setEditInfo(true)}
          />

          <PhoneInput
            label=" "
            type="tel"
            style={{ width: "330px" }}
            maxLength="6"
            placeholder="--- ---"
            id="phone_number"
            inputClassname="phone_input-persn-det select-input-personal-details"
            className="phone-input-div-reg"
            callbackFunctionChange={(e) => {
              if (e.target.value.length === 6) {
                setEditInfo(true);
              } else {
                setEditInfo(false);
              }
            }}
          />
        </div>
        {/*<Select*/}
      </div>

      <div
        className="change-password gradient popup-password-deskt"
        onClick={() => setIsOpen(true)}
      >
        <p>
          <u> {t("Change password")} </u>
        </p>
      </div>
      <div className="change-password gradient popup-password-mobile">
        <p>
          <Link to="/Profile/passwordDetails"> {t("Change password")} </Link>
        </p>
      </div>
      <div className="popup-password-deskt">
        {isOpen && (
          <PopupPassword
            func={close}
            content={
              <>
                <div className="popup-password-header">
                  {t("Change password")}
                </div>
                <div style={{ marginTop: "43px" }}>
                  <div className="change-password-input">
                    <PasswordInput
                      label={t("Old password")}
                      type="password"
                      placeholder=""
                      id="oldPassword"
                      eye={true}
                      containerStyle={{ width: "344px" }}
                    />
                  </div>
                  <div className="change-password-input">
                    <PasswordInput
                      label={t("New password")}
                      type="password"
                      placeholder=""
                      id="newPassword"
                      eye={true}
                      containerStyle={{ width: "344px" }}
                    />
                  </div>
                  {newPassword ? (
                    <div className="line_div">
                      <div className={`checkBar  ${className}`}></div>
                      <div>
                        <label className="linetext">{text}</label>
                      </div>
                    </div>
                  ) : null}
                  <div className="change-password-input">
                    <PasswordInput
                      label={t("Repeat password")}
                      type="password"
                      placeholder=""
                      id="confirmPassword"
                      eye={true}
                      containerStyle={{ width: "344px" }}
                    />
                  </div>
                  <div
                    ref={wrongPassword}
                    style={{ display: "none" }}
                    className="wrong-password"
                  >
                    {t("Password repetition is incorrect")}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      marginTop: "50px",
                      marginBottom: "25px",
                    }}
                  >
                    <Button
                      onClick={togglePopup}
                      title={t("Confirm")}
                      className={`save-password-popup ${
                        !(newPassword && confirmPassword && oldPassword) &&
                        "disabled"
                      }`}
                      disabled={
                        !(newPassword && confirmPassword && oldPassword)
                      }
                    />
                  </div>
                </div>
              </>
            }
            handleClose={close}
          />
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    specializations: state.educationReducer.specializations,
    educations: state.educationReducer.educations,
    oldPassword: state.formReducer.oldPassword,
    newPassword: state.formReducer.newPassword,
    confirmPassword: state.formReducer.confirmPassword,
    phone_code: state.formReducer.phone_code,
    phone_number: state.formReducer.phone_number,
    educationId: state.formReducer.educationId,
    specializationId: state.formReducer.specializationId,
    phone: state.formReducer.phone,
    phoneCode: state.authReducer.phoneCode,
    code: state.formReducer.code,
    fullName: state.formReducer.fullName ?? "",
    email: state.formReducer.email ?? "",
    checkUpdateFixedInformationAboutUser:
      state.formReducer.checkUpdateFixedInformationAboutUser ?? 0,
    inProfilePage: state.formReducer.inProfilePage ?? false,
    popupDetails: state.authReducer.popupDetails,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleFormChange: (key, name) => dispatch(handleFormChange(key, name)),
    fetchEducations: (callback) => dispatch(fetchEducations(callback)),
    fetchSpecializations: (callback, language) =>
      dispatch(fetchSpecializations(callback, language)),
    editPassword: (pass) => dispatch(editPassword(pass)),
    fetchNumberCodes: () => dispatch(fetchNumberCodes()),
    fetchProfileDetails: (language) => dispatch(fetchProfileDetails(language)),
    handleAuthChange: (key, value) => dispatch(handleAuthChange(key, value)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(PersonalDetails);
