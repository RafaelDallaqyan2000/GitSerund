import React, { useEffect, useRef } from "react";
import "../Data.css";
import "../PersonalDetails/PersonalDetails.css";
import { connect } from "react-redux";
import store, {
  handleFormChange,
  editPassword,
  fetchProfileDetails,
} from "../../../../store";
import Button from "../../../../components/Button/Button";
import PasswordInput from "../../../../components/Form/PasswordInput/PasswordInput";
import "./PasswordDetails.css";
import { useTranslation } from "react-i18next";

const PasswordDetails = ({
  editPassword,
  handleFormChange,
  fetchProfileDetails,
}) => {
  const wrongPassword = useRef();
  const { t, i18n } = useTranslation();

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

      handleFormChange("oldPassword", undefined);
      handleFormChange("newPassword", undefined);
      handleFormChange("confirmPassword", undefined);
    } else {
      wrongPassword.current.style.display = "block";
    }
  };

  useEffect(() => {
    fetchProfileDetails(i18n?.language);
  }, []);
  return (
    <div className="password-details-content">
      <div className="popup-password-header">{t("Change password")}</div>
      <div style={{ marginTop: "10vw" }}>
        <div className="change-password-input">
          <PasswordInput
            label={t("Old password")}
            type="password"
            //   name="anun"
            placeholder=""
            id="oldPassword"
            eye={true}
            className="select-input select-input-personal-details"
            classNameForLabel="select-label-personal-details"
          />
        </div>
        <div className="change-password-input">
          <PasswordInput
            label={t("New password")}
            type="password"
            //   name="anun"
            placeholder=""
            id="newPassword"
            eye={true}
            className="select-input select-input-personal-details"
            classNameForLabel="select-label-personal-details"
          />
        </div>
        <div className="change-password-input">
          <PasswordInput
            label={t("Repeat password")}
            type="password"
            //   name="anun"
            placeholder=""
            id="confirmPassword"
            eye={true}
            className="select-input select-input-personal-details"
            classNameForLabel="select-label-personal-details"
          />
        </div>
        <div
          ref={wrongPassword}
          style={{ display: "none" }}
          className="wrong-password"
        >
          {t("Password repetition is incorrect")}
        </div>
        <div className="save-data-div-mobile">
          <Button
            onClick={togglePopup}
            title={t("Confirm")}
            className="save-password-popup"
          />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    newPassword: state.formReducer.newPassword,
    confirmPassword: state.formReducer.confirmPassword,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleFormChange: (key, name) => dispatch(handleFormChange(key, name)),
    editPassword: (pass) => dispatch(editPassword(pass)),
    fetchProfileDetails: (language) => dispatch(fetchProfileDetails(language)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(PasswordDetails);
