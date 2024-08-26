import React, { useState } from "react";
import { connect } from "react-redux";
import {
  fetchMethodDetails,
  fetchUserMethod,
  setSelectedAction,
  fetchDeleteTeacherAction,
  fetchRecoverTeacherAction,
  fetchRecoverStudentAction,
  fetchDeleteStudentAction,
  handleFormChange,
} from "../../../../../store";
import AddDropdown from "../AddDropdown/AddDropdown";
import { openConfirm } from "../../../../../store/lessonProcess/actions/openConfirm";
import { methodAndActionIndex } from "../../../../../store/lessonProcess/actions/methodAndActionIndex";
import { deleteOrRecoverActionIfNext } from "../../../../../store/lessonProcess/actions/deleteOrRecoverActionIfNext";
import { setActionAndMethodId } from "../../../../../store/lessonProcess/actions/setActionAndMethodId";
import { actionOrderAndPreviousOrder } from "../../../../../store/lessonProcess/actions/actionOrderAndPreviousOrder";
import { rightSidebarBoardImages } from "../../../../../store/lessonProcess/actions/rightSidebarBoardImages";
import { pdfFilesInAction } from "../../../../../store/lessonProcess/actions/pdfFilesInAction";
import { handleLsnProcChange } from "../../../../../store/lessonProcess/actions/handleLsnProcChange";
import { MessagePopUp } from "../../../../../components/MessagePopUp/MessagePopUp";
import { useTranslation } from "react-i18next";

function RenderActions({
  actions,
  methodIndex,
  id,
  methodId,
  lessonProcId,
  fetchUserMethod,
  setSelectedAction,
  showMethodDetails,
  openConfirm,
  isSavedAction,
  methodAndActionIndex,
  deleteOrRecoverActionIfNext,
  actionAndMethodId,
  handleFormChange,
  actionOrderAndPreviousOrder,
  boardImages,
  pdfFileArr,
}) {
  const { t } = useTranslation();
  const handleActionClick = (proc, actionIndex) => {
    actionOrderAndPreviousOrder(
      proc.order,
      proc.order > 0 ? proc.order - 1 : null
    );

    if (!isSavedAction) {
      openConfirm(true);
    }

    actionAndMethodId(proc.id, methodId, proc.order);

    if (
      !proc.isMethodDeleted &&
      isSavedAction &&
      (proc.teacherActionActive || proc.studentActionActive)
    ) {
      showMethodDetails(proc);
      setSelectedAction(methodIndex, actionIndex);
    } else {
      methodAndActionIndex(proc, methodIndex, actionIndex);
    }

    boardImages(true);
    pdfFileArr(true);

    let lessonPlanMinuteFlag = localStorage.getItem("lessonPlanMinuteFlag");
    let lessonPlanMinute = localStorage.getItem("lessonPlanMinute");

    if (lessonPlanMinute >= 45 && lessonPlanMinuteFlag === "false") {
      localStorage.setItem("lessonPlanMinuteFlag", "true");

      handleFormChange("popUpDetails", {
        title: t("Reminder"),
        text: t("45 minutes is up"),
        type: "warning",
        cancelText: t("Close"),
        styleTitle: { color: "#EA6670" },
        cancelBtnStyle: {
          background: "#EA6670",
          color: "#FFF",
        },
      });
    }
  };

  return actions?.map((proc, actionIndex) => {
    if (
      (!proc.studentAction &&
        !proc.teacherAction &&
        !proc.studentActionDesc &&
        !proc.teacherActionDesc) ||
      !proc.id
    ) {
      return null;
    }

    return (
      <div key={`${+proc.studentActionId}${proc.id}${proc.order}`}>
        <div className="lesson-process-add-between-container">
          {!proc.isMethodDeleted && methodId ? (
            <AddDropdown
              t={t}
              methodId={methodId}
              order={proc.order}
              previousOrder={proc.order > 0 && proc.order - 1}
              methodOrder={proc.methodOrder}
              methodIndex={methodIndex}
              actionIndex={actionIndex}
              addBetweenActions={true}
            />
          ) : (
            <div style={{ padding: "15px 0" }}></div>
          )}
        </div>
        <div
          className="added-lesson-process-container"
          style={{
            backgroundColor: `${proc.id === id ? "#ccd2e3" : ""}`,
          }}
          onClick={() => handleActionClick(proc, actionIndex)}
        >
          {proc.studentAction ||
          (!proc.teacherActionActive && proc.fromTemplate) ? (
            <div
              className={`saved-process ${
                proc.studentActionActive
                  ? !proc.id
                    ? "added-new-process-student"
                    : "saved-process-student"
                  : "recover-student-process"
              } `}
            >
              <p className="saved-process-text">{proc.studentAction}</p>
              {!proc.isMethodDeleted && proc.studentActionId ? (
                proc.studentActionActive ? (
                  <span
                    onClickCapture={() => {
                      handleFormChange("studentActionActive", false);
                      if (isSavedAction) {
                        fetchDeleteStudentAction(
                          proc.studentActionId,
                          fetchUserMethod,
                          lessonProcId,
                          proc.teacherAction
                        );
                      } else {
                        deleteOrRecoverActionIfNext(
                          proc.studentActionId,
                          lessonProcId,
                          "deleteStudentAction"
                        );
                      }
                    }}
                    className="method-delete-icon"
                    title={t("Delete student action")}
                  />
                ) : (
                  <span
                    onClickCapture={(e) => {
                      handleFormChange("studentActionActive", true);
                      if (isSavedAction) {
                        fetchRecoverStudentAction(
                          proc.studentActionId,
                          fetchUserMethod,
                          lessonProcId
                        );
                      } else {
                        deleteOrRecoverActionIfNext(
                          proc.studentActionId,
                          fetchUserMethod,
                          "recoverStudentAction"
                        );
                      }
                    }}
                    className="method-recover-icon"
                    title={t("Recover student action")}
                  />
                )
              ) : null}
            </div>
          ) : (
            <div className="saved-process " />
          )}

          {proc.teacherAction ||
          (!proc.studentActionActive && proc.fromTemplate) ? (
            <div
              key={proc.id}
              className={`saved-process ${
                proc.teacherActionActive
                  ? !proc.id
                    ? "added-new-process-teacher"
                    : "saved-process-teacher"
                  : "recover-teacher-process"
              } `}
            >
              <p className="saved-process-text">{proc.teacherAction}</p>

              {!proc.isMethodDeleted && proc.teacherActionId ? (
                proc.teacherActionActive ? (
                  <span
                    onClickCapture={() => {
                      handleFormChange("teacherActionActive", false);
                      if (isSavedAction) {
                        fetchDeleteTeacherAction(
                          proc.teacherActionId,
                          fetchUserMethod,
                          lessonProcId,
                          proc.studentAction
                        );
                      } else {
                        deleteOrRecoverActionIfNext(
                          proc.studentActionId,
                          lessonProcId,
                          "deleteTeacherAction"
                        );
                      }
                    }}
                    className="method-delete-icon"
                    title={t("Delete teacher action")}
                  ></span>
                ) : (
                  <span
                    onClickCapture={() => {
                      handleFormChange("teacherActionActive", true);
                      if (isSavedAction) {
                        fetchRecoverTeacherAction(
                          proc.teacherActionId,
                          fetchUserMethod,
                          lessonProcId,
                          proc.teacherActionActive
                        );
                      } else {
                        deleteOrRecoverActionIfNext(
                          proc.studentActionId,
                          lessonProcId,
                          "recoverTeacherAction"
                        );
                      }
                    }}
                    className="method-recover-icon"
                    title={t("Recover teacher action")}
                  />
                )
              ) : null}
            </div>
          ) : (
            <div className="saved-process" />
          )}
        </div>
        <div className="lesson-process-time-line-container">
          <div className="number-line"></div>
          <div className="duration-container">
            {proc.duration ? `${proc.duration}${t(" m")}` : `0${t(" m")}`}
          </div>
        </div>
      </div>
    );
  });
}

const mapStateToProps = (state) => {
  return {
    isSavedAction: state.lessonProcessReducer.actionSavedValue,
    teacherActionActive: state.formReducer?.teacherActionActive,
    studentActionActive: state.formReducer?.studentActionActive,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    showMethodDetails: (proc) => dispatch(fetchMethodDetails(proc)),
    setSelectedAction: (methodIndex, actionIndex) =>
      dispatch(setSelectedAction(methodIndex, actionIndex)),
    fetchUserMethod: (index) => dispatch(fetchUserMethod(index)),
    openConfirm: (value) => dispatch(openConfirm(value)),
    methodAndActionIndex: (methodIndex, actionIndex) =>
      dispatch(methodAndActionIndex(methodIndex, actionIndex)),
    actionAndMethodId: (actionId, methodId, order) =>
      dispatch(setActionAndMethodId(actionId, methodId, order)),
    deleteOrRecoverActionIfNext: (
      actionId,
      fetchUserMethod,
      lessonProcId
      // actionActive
    ) =>
      dispatch(
        deleteOrRecoverActionIfNext(
          actionId,
          fetchUserMethod,
          lessonProcId
          // actionActive
        )
      ),
    handleFormChange: (key, value) => dispatch(handleFormChange(key, value)),
    handleLsnProcChange: (key, value) =>
      dispatch(handleLsnProcChange(key, value)),
    actionOrderAndPreviousOrder: (order, prevOrder) =>
      dispatch(actionOrderAndPreviousOrder(order, prevOrder)),
    boardImages: (clearArr) => dispatch(rightSidebarBoardImages(clearArr)),
    pdfFileArr: (clearArr) => dispatch(pdfFilesInAction(clearArr)),
  };
};

export const Actions = connect(
  mapStateToProps,
  mapDispatchToProps
)(RenderActions);
