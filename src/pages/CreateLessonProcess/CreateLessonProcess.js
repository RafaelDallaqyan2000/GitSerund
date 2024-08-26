import React, { useCallback, useEffect } from "react";
import "./CreateLessonProcess.css";
import { connect } from "react-redux";
import {
  showLessonPlanCreate,
  showChangePage,
  addMethodName,
  cleanProcessReducer,
  createLessonMethod,
  fetchMethodData,
} from "../../store";
import Input from "../../components/Form/Input/Input";
import HeaderLsnProc from "./HeaderLsnProc/HeaderLsnProc";
import Button from "../../components/Button/Button";
import Sidebar from "./Sidebar/Sidebar";
import MainContainer from "./MainContainer/MainContainer";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import { handleLsnProcChange } from "../../store/lessonProcess/actions/handleLsnProcChange";
import { MessagePopUp } from "../../components/MessagePopUp/MessagePopUp";
import { useTranslation } from "react-i18next";

const CreateLessonProcess = ({
  showCreate,
  cleanProcess,
  showChangePage,
  methodNameFromStore,
  methodName,
  addMethodName,
  createLessonMethod,
  fetchMethodData,
  handleLsnProcChange,
  popupDetails,
}) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { lessonPlanId } = useParams();
  useEffect(() => {
    showChangePage(true);
    cleanProcess();
    showCreate(true);
    if (lessonPlanId) {
      fetchMethodData(lessonPlanId);
    }
  }, []);

  const callback = (id, name) => {
    navigate(`/lesson-process/create-new-lesson-process/${id}?name=${name}`);
    addMethodName(id, name);
  };

  const handleClosePopup = useCallback(() => {
    handleLsnProcChange("popupDetails", {
      type: "fail",
      title: "",
      text: "",
    });
  }, []);

  return (
    <div className="">
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

      <HeaderLsnProc />

      {methodNameFromStore || lessonPlanId ? (
        <div className="create-new-lesson-process-container">
          <div className="create-new-lesson-process-sidebar-container">
            <Sidebar />
          </div>
          <div className="create-new-lesson-process-main-container">
            <MainContainer />
          </div>
        </div>
      ) : (
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div>
              <Input
                id="methodName"
                placeholder={t("Method name")}
                className="process-name-input"
              />
            </div>

            <div
              className="method-name-create-btn-container"
              onClick={() => createLessonMethod(methodName, callback)}
            >
              <Button
                title={t("Create")}
                disabled={methodName ? false : true}
                className={
                  methodName
                    ? "btn-save-lsn-process enable-save"
                    : "btn-save-lsn-process"
                }
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    methodNameFromStore: state.lessonProcessReducer.methodName,
    popupDetails: state.lessonProcessReducer.popupDetails,
    methodName: state.formReducer?.methodName,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    handleLsnProcChange: (key, value) =>
      dispatch(handleLsnProcChange(key, value)),
    fetchMethodData: (id) => dispatch(fetchMethodData(id)),
    cleanProcess: () => dispatch(cleanProcessReducer()),
    showCreate: (show) => dispatch(showLessonPlanCreate(show)),
    showChangePage: (show) => dispatch(showChangePage(show)),
    addMethodName: (id, name) => dispatch(addMethodName(id, name)),
    createLessonMethod: (name, callback) =>
      dispatch(createLessonMethod(name, callback)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateLessonProcess);
