import React from "react";
import "./HeaderLsnProc.css";
import { connect } from "react-redux";
import { useParams } from "react-router";
import Button from "../../../components/Button/Button";
import logo from "../../../img/logo.png";
import { cleanProcessReducer } from "../../../store";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const HeaderLsnProc = ({ lessonProcess, methodName, cleanProcessReducer }) => {
  const navigate = useNavigate();
  const { lessonPlanId } = useParams();
  const { t } = useTranslation();

  const goToHome = () => {
    navigate("/home");
    cleanProcessReducer();
  };
  return (
    <header className="header-lsn-process">
      <div style={{ display: "flex", alignItems: "center" }}>
        <Link to="/home">
          <img className="header-lsn-process-logo" src={logo} alt="logo" />
        </Link>
        <p className="header-lsn-process-title">
          {t("Create a method/technique")}
        </p>
      </div>

      <div
        style={{
          display: "flex",
        }}
      >
        {/*
        <div className="create-lesson-process-header-duration-container">
          <p>{duration}</p>
        </div> */}
        {methodName || lessonPlanId ? (
          <div onClick={() => goToHome()}>
            <Button
              title={t("Complete")}
              disabled={lessonProcess.length > 0 ? false : true}
              className="send-lesson-process-button"
            />
          </div>
        ) : null}
      </div>
    </header>
  );
};
const mapStateToProps = (state) => {
  return {
    lessonProcess: state.lessonProcessReducer.addedMethods,
    methodName: state.lessonProcessReducer.methodName,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    cleanProcessReducer: () => dispatch(cleanProcessReducer()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderLsnProc);
