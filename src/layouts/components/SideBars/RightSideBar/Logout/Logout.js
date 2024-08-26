import React, { useCallback, useRef, useState } from "react";
import "./Logout.css";
import { connect } from "react-redux";
import editPage from "../../../../../img/editPage.svg";
import logout from "../../../../../img/logout.svg";
import { useNavigate } from "react-router-dom";
import { handleLogout } from "../../../../../store";
import { useOutsideClick } from "../../../../../hooks/useOutsideClick";
import { handleAuthChange } from "../../../../../store/auth/actions/handleAuthChange";
import { MessagePopUp } from "../../../../../components/MessagePopUp/MessagePopUp";
import { useTranslation } from "react-i18next";
import { LanguagePopUp } from "./components/LanguagePopUp";

function Logout({ handleLogout, setOpen, handleAuthChange, popupDetails }) {
  const navigate = useNavigate();
  const popupRef = useRef();
  const [openLanguagePopUp, setOpenLanguagePopUp] = useState(false);
  const { t } = useTranslation();

  useOutsideClick(popupRef, () => {
    setOpen(false);
  });

  const goToProfile = () => {
    navigate("/Profile/personalDetails");
    setOpen(false);
  };

  const handleClosePopup = useCallback(() => {
    handleAuthChange("popupDetails", {
      type: "fail",
      title: "",
      text: "",
    });
  }, []);

  const handleOpenChangeLanguage = () => {
    setOpenLanguagePopUp((prev) => !prev);
  };

  return (
    <div ref={popupRef} style={{ display: "flex", justifyContent: "end" }}>
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

      <div className="logout-layout">
        <div className="edit-page" onClick={goToProfile}>
          <div>
            <img src={editPage} />
          </div>
          <p style={{ paddingTop: "5px", paddingLeft: "14px" }}>
            {t("Edit page")}
          </p>
        </div>

        <div
          style={{ marginTop: 15 }}
          className="edit-page"
          onClick={handleOpenChangeLanguage}
        >
          <img src={require("../../../../../img/Group.svg").default} />
          <p style={{ paddingTop: "5px", paddingLeft: "14px" }}>
            {t("Language")}
          </p>
          {openLanguagePopUp ? <LanguagePopUp /> : null}
        </div>

        <div
          style={{ paddingTop: "15px" }}
          className="edit-page"
          onClick={handleLogout}
        >
          <div style={{ paddingLeft: "3px" }}>
            <img src={require("../../../../../img/logout.svg").default} />
          </div>
          <p style={{ paddingTop: "5px", paddingLeft: "12px" }}>
            {t("Log out")}
          </p>
        </div>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    openLogout: state.formReducer.openLogout,
    popupDetails: state.authReducer.popupDetails,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    handleLogout: () => dispatch(handleLogout()),
    handleAuthChange: (key, value) => dispatch(handleAuthChange(key, value)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Logout);
