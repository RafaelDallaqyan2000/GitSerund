import "./changeLessonProcess.css";
import React, { useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  showLessonPlanCreate,
  showChangePage,
  setActionAndMethodId,
} from "../../store";
import Sidebar from "./Sidebar/Sidebar";
import MainContainer from "./MainContainer/MainContainer";
import Header from "./Header/Header";
import RigthSideBar from "./RigthSideBar/RigthSideBar";
import { useNavigate } from "react-router-dom";
import { MessagePopUp } from "../../components";
import { useTranslation } from "react-i18next";

export const addTargetBlank = (guide) => {
  if (typeof guide === "string") {
    let tagA = guide.split("<a");
    let newValue = `${tagA[0]}`;

    for (let i = 1; i < tagA.length; i++) {
      newValue += `<a target='_blank' ${tagA[i]}`;
    }

    return newValue;
  }
  return guide;
};

const CreateLessonProcess = ({
  showCreate,
  showChangePage,
  actionAndMethodId,
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    showChangePage(true);
    showCreate(true);
  }, []);

  useEffect(() => {
    window.addEventListener("beforeunload", alertUser);
    return () => {
      window.removeEventListener("beforeunload", alertUser);
    };
  }, []);
  const alertUser = (e) => {
    e.preventDefault();
    e.returnValue = "";
  };

  const [finishStatus, setfinishStatus] = useState(false);
  const [isOpenErrorPopup, setIsOpenErrorPopup] = useState(false);

  const onBackButtonEvent = useCallback(
    (e) => {
      e.preventDefault();
      if (!finishStatus) setIsOpenErrorPopup(true);
    },
    [finishStatus]
  );

  const handleAccept = useCallback(() => {
    setfinishStatus(true);
    setIsOpenErrorPopup(false);
    // your logic
    navigate("/home");
  }, []);

  const handleCancel = useCallback(() => {
    window.history.pushState(null, null, window.location.pathname);
    setfinishStatus(false);
    setIsOpenErrorPopup(false);
  }, []);

  useEffect(() => {
    window.history.pushState(null, null, window.location.pathname);
    window.addEventListener("popstate", onBackButtonEvent);
    return () => {
      actionAndMethodId(null, null);
      window.removeEventListener("popstate", onBackButtonEvent);
    };
  }, []);

  return (
    <div className="">
      {isOpenErrorPopup && (
        <MessagePopUp
          onClosePopup={handleCancel}
          open={isOpenErrorPopup}
          title={t("Action not saved")}
          text={t("You want to exit this page without saving the course.")}
          closeBtnTitle={t("No")}
          submitBtnTitle={t("Yes")}
          onAlertCancelClick={handleCancel}
          onAlertSubmitClick={handleAccept}
          styleText={{ textAlign: "center" }}
          popUpContainerStyles={{ top: "50%" }}
          styleCancelBtn={{
            background: "#EEF1F6",
            color: "#8c8e92",
          }}
        />
      )}
      {/* <HeaderLsnProc /> */}
      {/* <showModal /> */}
      {/* {showModal()} */}
      <Header />

      <div className="create-new-lesson-process-container">
        <div className="create-new-lesson-process-sidebar-container">
          <Sidebar />
        </div>
        <div className="create-new-lesson-process-main-container">
          <MainContainer />
        </div>
        <RigthSideBar />
      </div>
    </div>
  );
};
const mapStateToProps = () => {
  return {};
};
const mapDispatchToProps = (dispatch) => {
  return {
    showCreate: (show) => dispatch(showLessonPlanCreate(show)),
    showChangePage: (show) => dispatch(showChangePage(show)),
    actionAndMethodId: (actionId, methodId) =>
      dispatch(setActionAndMethodId(actionId, methodId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateLessonProcess);
