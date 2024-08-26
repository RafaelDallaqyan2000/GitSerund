import React, { useCallback, useEffect } from "react";
import "./header.css";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import logo from "../../../img/logo.png";
import cycleWithCheck from "../../../img/cycleWithCheck.svg";
import shortLine from "../../../img/shortLine.svg";
import CircularProgressBar from "../../../components/CircularProgressBar/CircularProgressBar.js";
import { MessagePopUp } from "../../../components";
import { handleFormChange } from "../../../store";
import { useTranslation } from "react-i18next";

function Header({ minuteForAction, popUpDetails = {}, handleFormChange }) {
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    localStorage.setItem("lessonPlanMinuteFlag", "false");
    return () => {
      localStorage.removeItem("lessonPlanMinute");
      localStorage.removeItem("lessonPlanMinuteFlag");
    };
  }, []);

  const goToHome = () =>
    handleFormChange("popUpDetails", {
      title: t("The process is not saved"),
      text: t("You want to exit this page without saving the course."),
      successText: t("Yes"),
      cancelText: t("No"),
      cancelBtnStyle: {
        background: "#EEF1F6",
        color: "#8c8e92",
      },
    });

  const handleAccept = useCallback(() => navigate("/home"), []);

  const handleCancel = useCallback(
    () =>
      handleFormChange("popUpDetails", {
        title: "",
        text: "",
        successText: "",
        cancelText: "",
        cancelBtnStyle: {},
      }),
    []
  );

  return (
    <>
      <MessagePopUp
        onClosePopup={handleCancel}
        open={popUpDetails.text}
        title={popUpDetails.title}
        text={popUpDetails.text}
        closeBtnTitle={popUpDetails.cancelText}
        submitBtnTitle={popUpDetails.successText}
        onAlertCancelClick={handleCancel}
        styleText={{ textAlign: "center" }}
        styleTitle={popUpDetails.styleTitle}
        popUpContainerStyles={{ top: "50%" }}
        onAlertSubmitClick={handleAccept}
        styleCancelBtn={popUpDetails.cancelBtnStyle}
      />

      <header className="header-lsn-process">
        <div style={{ display: "flex" }}>
          <div onClick={goToHome}>
            <img className="header-lsn-process-logo" src={logo} alt="logo" />
          </div>
          <p className="header-lsn-process-title">
            {t("Create New Lesson Scenario")}
          </p>
        </div>

        <div
          style={{
            display: "flex",
          }}
        >
          <img
            className="header-lsn-process-cycle-icon"
            src={cycleWithCheck}
            alt="cycle with check icon"
            onClick={goToHome}
          />
          <p className="lesson_plan_regulations_text">{t("Lesson plan")}</p>
          <img
            className="header-lsn-process-short-line-icon"
            src={shortLine}
            alt="short line"
          />
          <CircularProgressBar
            text={minuteForAction}
            lessonPlansCount={{ length: minuteForAction }}
            count={45}
            truety={true}
          />

          <p className="lesson_plan_regulations_text">{t("Lesson scenario")}</p>
        </div>
      </header>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    minuteForAction: state.lessonProcessReducer.minuteForAction,
    popUpDetails: state.formReducer.popUpDetails,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    handleFormChange: (key, value) => dispatch(handleFormChange(key, value)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
