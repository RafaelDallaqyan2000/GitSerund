import React, { useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import Button from "../../../components/Button/Button";
import {
  createMethodWithExisting,
  initForm,
  setSelectedAction,
  lessonProcessCount,
  fetchUserMethod,
  fetchMethodDetails,
  fetchDeleteStudentAction,
  fetchRecoverStudentAction,
  fetchRecoverTeacherAction,
  fetchDeleteTeacherAction,
} from "../../../store";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import { openConfirm } from "../../../store/lessonProcess/actions/openConfirm";
import { actionSaved } from "../../../store/lessonProcess/actions";
import { rightSidebarBoardImages } from "../../../store/lessonProcess/actions/rightSidebarBoardImages";
import { pdfFilesInAction } from "../../../store/lessonProcess/actions/pdfFilesInAction";
import { checkMainContainerInfo } from "../../../store/lessonProcess/actions/checkMainContainerInfo";
import { MessagePopUp } from "../../../components/MessagePopUp/MessagePopUp";
import { BodyForMainContainer } from "./BodyForMainContainer";
import "draft-js/dist/Draft.css";
import "./mainContainer.css";
import { useTranslation } from "react-i18next";

const MainContainer = ({
  lessonProcess,
  setSelectedAction,
  createMethodWithExisting,
  fetchUserMethod,
  actionSaved,
  isSavedAction,
  confirmValue,
  openConfirm,
  methodIndexInAction,
  proc,
  actionIndexInAction,
  showMethodDetails,
  nextConfirm,
  studentOrTeacherActionId,
  boardImages,
  pdfFileArr,
  checkMainContainer,
  actionId,
  teacherActionActive,
  studentActionActive,
  mainChecked,
  userTypeId,
}) => {
  const { t } = useTranslation();
  const [successStatusId, setSuccessStatusId] = useState(false);
  const [deleteOrRecoverText, setDeleteOrRecoverText] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState({
    title: "",
    text: "",
    type: "",
    closeBtnTitle: "",
    submitBtnTitle: "",
    titleStyle: {},
    cancelBtnStyle: {},
  });
  const [statusId, setStatusId] = useState(null);
  let { lessonProcId } = useParams();
  const navigate = useNavigate();
  const pathname = window.location.pathname.split("/");
  const createNewLessonPlan = pathname[pathname.length - 1] !== "new";

  useEffect(() => {
    if (confirmValue && !proc.isMethodDeleted) {
      setShowSuccessMessage({
        title: t("The operation is not modified"),
        text: t(
          "You have not saved the changes made. Continue without saving?"
        ),
        type: "fail",
        closeBtnTitle: t("No"),
        submitBtnTitle: t("Yes"),
        titleStyle: { color: "#1C1C1C" },
        cancelBtnStyle: {
          background: "#EEF1F6",
          color: "#8C8E92",
        },
      });
    }
  }, [confirmValue, proc.isMethodDeleted]);

  if (successStatusId) {
    navigate("/home");
    createMethodWithExisting(lessonProcId, statusId, createNewLessonPlan);
  }

  if (deleteOrRecoverText === "deleteStudentAction") {
    fetchDeleteStudentAction(
      studentOrTeacherActionId,
      fetchUserMethod,
      lessonProcId
    );
    setDeleteOrRecoverText("");
  } else if (deleteOrRecoverText === "recoverStudentAction") {
    fetchRecoverStudentAction(
      studentOrTeacherActionId,
      fetchUserMethod,
      lessonProcId
    );
    setDeleteOrRecoverText("");
  } else if (deleteOrRecoverText === "deleteTeacherAction") {
    fetchDeleteTeacherAction(
      studentOrTeacherActionId,
      fetchUserMethod,
      lessonProcId
    );
    setDeleteOrRecoverText("");
  } else if (deleteOrRecoverText === "recoverTeacherAction") {
    fetchRecoverTeacherAction(
      studentOrTeacherActionId,
      fetchUserMethod,
      lessonProcId
    );
    setDeleteOrRecoverText("");
  }
  const confirmSubmit_onClick = useCallback(() => {
    openConfirm(false);
    setDeleteOrRecoverText(nextConfirm);
    actionSaved(true);
    if (!proc.isMethodDeleted) {
      showMethodDetails(proc);
      setSelectedAction(methodIndexInAction, actionIndexInAction);
    }
    if (statusId) {
      setSuccessStatusId(statusId);
    }
    boardImages(true);
    pdfFileArr(true);
    checkMainContainer(false);
    setShowSuccessMessage({});
  }, [confirmValue]);

  const handleClosePopup = useCallback(() => {
    if (confirmValue) openConfirm(false);

    setShowSuccessMessage({});
  }, [confirmValue]);

  const handleConfirm = () => {
    if (!isSavedAction) {
      setStatusId(2);
      openConfirm(true);
    } else {
      navigate("/home");
      createMethodWithExisting(lessonProcId, 2, createNewLessonPlan);
    }
  };

  return (
    <>
      <MessagePopUp
        onClosePopup={handleClosePopup}
        title={showSuccessMessage.title}
        open={showSuccessMessage.text}
        closeBtnTitle={showSuccessMessage.closeBtnTitle}
        submitBtnTitle={showSuccessMessage.submitBtnTitle}
        onAlertCancelClick={handleClosePopup}
        onAlertSubmitClick={confirmSubmit_onClick}
        styleCancelBtn={showSuccessMessage.cancelBtnStyle}
        styleTitle={showSuccessMessage.titleStyle || {}}
        text={showSuccessMessage.text}
        styleText={{ textAlign: "left" }}
        popUpContainerStyles={{ top: "50%" }}
      />

      {(actionId || mainChecked) &&
        (studentActionActive || teacherActionActive) && (
          <>
            <BodyForMainContainer
              setShowSuccessMessage={setShowSuccessMessage}
            />

            <div className="send-lesson-process-container d-flex justify-content-end">
              <Button
                title={t("Save as draft")}
                onClick={() => {
                  if (!isSavedAction) {
                    setStatusId(1);
                    openConfirm(true);
                  } else {
                    navigate("/home");
                    createMethodWithExisting(
                      lessonProcId,
                      1,
                      createNewLessonPlan
                    );
                  }
                }}
                disabled={lessonProcess.length <= 0}
                className="send-lesson-process-button"
              />
              {userTypeId !== 1 ? (
                <Button
                  title={t("Publish")}
                  onClick={handleConfirm}
                  disabled={lessonProcess.length <= 0}
                  className="send-lesson-process-button"
                />
              ) : null}
            </div>
          </>
        )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    methodIndex: state.lessonProcessReducer.methodIndex,
    actionIndex: state.lessonProcessReducer.actionIndex,
    userDefined: state.formReducer.userDefined,
    lessonProcess: state.lessonProcessReducer.lessonProcess,
    textPlaceholder: state.formReducer?.textPlaceholder,
    studentAction: state.formReducer?.studentAction,
    teacherAction: state.formReducer?.teacherAction,
    guide: state.formReducer?.guide,
    userId: state.formReducer.userId,
    studentActionDesc: state.formReducer?.studentActionDesc,
    teacherActionDesc: state.formReducer?.teacherActionDesc,
    teacherActionActive: state.formReducer?.teacherActionActive,
    studentActionActive: state.formReducer?.studentActionActive,
    studentActionText: state.formReducer?.studentActionText,
    studentActionId: state.formReducer?.studentActionId,
    teacherActionId: state.formReducer?.teacherActionId,
    isMethodDeleted: state.formReducer?.isMethodDeleted,
    teacherActionText: state.formReducer?.teacherActionText ?? "",
    teacherActionDescNotInLessonPlan:
      state.formReducer?.teacherActionDescNotInLessonPlan ?? "",
    methodOrder: state.formReducer?.methodOrder,
    methodId: state.formReducer?.methodId,
    order: state.formReducer?.order,
    actionId: state.formReducer?.id,
    isNew: state.formReducer?.isNew,
    previousOrder: state.formReducer?.previousOrder,
    userMethodActive: state.formReducer?.userMethodActive,
    isNewAction: state.formReducer.isNew,
    minuteForAction: state.lessonProcessReducer.minuteForAction,
    lessonProcessId: state.formReducer?.id,
    duration: state.formReducer?.duration ?? 0,
    count: state.lessonProcessReducer.count,
    fromTemplate: state.formReducer.fromTemplate,
    isSavedAction: state.lessonProcessReducer.actionSavedValue,
    confirmValue: state.lessonProcessReducer.openConfirmValue,
    methodIndexInAction: state.lessonProcessReducer.methodIndexInAction,
    actionIndexInAction: state.lessonProcessReducer.actionIndexInAction,
    proc: state.lessonProcessReducer.proc,
    mainChecked: state.lessonProcessReducer.mainChecked,
    studentOrTeacherActionId:
      state.lessonProcessReducer.studentOrTeacherActionId,
    nextConfirm: state.lessonProcessReducer.nextConfirm,
    studOrTeachActionActive: state.lessonProcessReducer.studOrTeachActionActive,
    processActionId: state.lessonProcessReducer.actionId,
    processMethodId: state.lessonProcessReducer.methodId,
    value: state.formReducer.value,
    orderAction: state.lessonProcessReducer.order,
    previousOrderAction: state.lessonProcessReducer.previousOrder,
    userTypeId: state.authReducer.typeId,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setSelectedAction: (methodIndex, actionIndex) =>
      dispatch(setSelectedAction(methodIndex, actionIndex)),
    showMethodDetails: (proc) => dispatch(fetchMethodDetails(proc)),
    fetchUserMethod: (index) => dispatch(fetchUserMethod(index)),
    initForm: (data) => dispatch(initForm(data)),
    lessonProcessCount: (count) => dispatch(lessonProcessCount(count)),
    createMethodWithExisting: (id, statusId, isEdit) =>
      dispatch(createMethodWithExisting(id, statusId, isEdit)),
    openConfirm: (value) => dispatch(openConfirm(value)),
    actionSaved: (value) => dispatch(actionSaved(value)),
    boardImages: (clearArr) => dispatch(rightSidebarBoardImages(clearArr)),
    pdfFileArr: (clearArr) => dispatch(pdfFilesInAction(clearArr)),
    checkMainContainer: (value) => dispatch(checkMainContainerInfo(value)),
  };
};

export const defaultTeacherAction = {
  teacherAction: "",
  teacherActionActive: true,
  teacherActionDesc: "",
  teacherActionText: "",
  guide: "",
  teacherActionTextFiles: [],
};

export const defaultStudentAction = {
  studentAction: "",
  studentActionActive: true,
  studentActionDesc: "",
  studentActionText: "",
  guideFiles: [],
};

export const defaultLessonAction = {
  id: 0,
  userDefined: true,
  isNew: true,
  duration: "",
  methodOrder: 0,
  ...defaultTeacherAction,
  ...defaultStudentAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);
