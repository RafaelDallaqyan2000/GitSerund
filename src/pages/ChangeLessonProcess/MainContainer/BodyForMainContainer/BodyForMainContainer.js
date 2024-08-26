import Textarea from "../../../../components/Form/Textarea/Textarea";
import { CustomEditor } from "../../../../components/CutomEditor";
import Input from "../../../../components/Form/Input/Input";
import Button from "../../../../components/Button/Button";
import React, { useState } from "react";
import { connect, useDispatch } from "react-redux";
import { addNewLessonProcess } from "../../../../store/lessonProcess/actions/addLessonProcess";
import {
  editUserAction,
  fetchAddUserAction,
  fetchUserMethod,
  handleFormChange,
} from "../../../../store";
import { actionSaved } from "../../../../store/lessonProcess/actions";
import { rightSidebarBoardImages } from "../../../../store/lessonProcess/actions/rightSidebarBoardImages";
import { pdfFilesInAction } from "../../../../store/lessonProcess/actions/pdfFilesInAction";
import { checkMainContainerInfo } from "../../../../store/lessonProcess/actions/checkMainContainerInfo";
import { useParams } from "react-router";
import { UPLOAD_FILE_SUCCESS } from "../../../../store/form/types";
import { useTranslation } from "react-i18next";

function BodyForMainContainerComponent({
  fromTemplate,
  userDefined,
  studentAction,
  studentActionId,
  studentActionActive,
  studentActionDesc,
  studentActionText,
  lessonProcessId,
  guide,
  guideFiles,
  isSavedAction,
  teacherAction,
  teacherActionDesc,
  teacherActionText,
  teacherActionActive,
  teacherActionTextFiles,
  teacherActionId,
  lessonProcess,
  duration,
  textPlaceholder,
  methodOrder,
  userMethodActive,
  isMethodDeleted,
  methodId,
  procImages,
  methodIndex,
  isNewAction,
  actionIndex,
  actionId,
  teacherActionDescNotInLessonPlan,
  setShowSuccessMessage = () => {},
  order,
  handleFormChange,
  actionSaved,
  boardImages,
  pdfFileArr,
  fetchUserMethod,
  checkMainContainer,
  pupilWorkPart,
}) {
  const { t } = useTranslation();
  const [cleanState, setCleanState] = useState(false);
  const { lessonProcId } = useParams();

  const createNewLessonProcess = (changedProperty = {}) => {
    const newLessonPlan = {
      id: lessonProcessId,
      guide,
      guideFiles,
      isSavedAction,
      userDefined,
      studentAction,
      studentActionDesc,
      studentActionText,
      studentActionActive,
      teacherAction,
      teacherActionDesc,
      teacherActionText,
      teacherActionActive,
      methodOrder,
      textPlaceholder,
      duration,
      userMethodActive,
      isMethodDeleted,
      teacherActionTextFiles,
      methodId,
      studentActionId,
      teacherActionId,
      fromTemplate,
      procImages,
      pupilWorkPart,
      ...changedProperty,
    };
    if (
      lessonProcess[methodIndex]?.actions.some(
        (item) =>
          item.id === lessonProcessId &&
          item.userDefined === newLessonPlan.userDefined
      )
    ) {
      return;
    } else {
      if (isNewAction) {
        handleFormChange("isNew", false);

        lessonProcess[methodIndex]?.actions.splice(
          actionIndex,
          0,
          newLessonPlan
        );
      } else if (lessonProcess != null && lessonProcess.length > 0) {
        lessonProcess[methodIndex].actions[actionIndex] = newLessonPlan;
      } else {
        if (lessonProcess[methodIndex]) {
          lessonProcess[methodIndex].actions[actionIndex] = newLessonPlan;
        }
      }

      addNewLessonProcess([...lessonProcess]);
      if (userDefined) {
        setCleanState((prev) => !prev);
      }
    }
  };

  const callbackEditUserAction = () => {
    setShowSuccessMessage({
      title: t("Done"),
      text: t("Changes are saved"),
      type: "success",
      closeBtnTitle: t("Close"),
      submitBtnTitle: "",
      titleStyle: {},
      cancelBtnStyle: {
        background: "linear-gradient(83.13deg, #6FD89C 0%, #46B776 100%)",
        color: "#FFF",
      },
    });
    fetchUserMethod(lessonProcId);
    actionSaved(true);
  };

  const callbackAddUserAction = (data) => {
    setShowSuccessMessage({
      title: t("Done"),
      text: t("Action added"),
      type: "success",
      closeBtnTitle: t("Close"),
      submitBtnTitle: "",
      titleStyle: {},
      cancelBtnStyle: {
        background: "linear-gradient(83.13deg, #6FD89C 0%, #46B776 100%)",
        color: "#FFF",
      },
    });
    fetchUserMethod(lessonProcId);
    handleFormChange("actionId", data.data.actionId);
    actionSaved(true);
    boardImages(true);
    pdfFileArr(true);
  };

  const addOrEditAction = () => {
    if (actionId) {
      return editUserAction(
        teacherActionId,
        teacherAction,
        teacherActionDesc,
        teacherActionText,
        guide,
        studentActionId,
        studentAction,
        studentActionDesc,
        studentActionText,
        duration,
        teacherActionDescNotInLessonPlan,
        pupilWorkPart,
        callbackEditUserAction
      );
    } else {
      checkMainContainer(false);
      return fetchAddUserAction(
        lessonProcId,
        methodId,
        methodOrder,
        studentAction,
        studentActionDesc,
        teacherAction,
        teacherActionDesc,
        studentActionText,
        teacherActionText,
        duration,
        order - 1,
        guide,
        teacherActionDescNotInLessonPlan,
        pupilWorkPart,
        callbackAddUserAction
      );
    }
  };

  return (
    <div style={{ padding: 30 }}>
      {fromTemplate || userDefined || studentAction || !studentActionId ? (
        <div
          className="method-title-container"
          style={{
            background:
              !studentActionActive &&
              "linear-gradient(83.13deg, #9f9e9e 0%, #696767 100%)",
          }}
        >
          <img
            src={require("../../../../img/schoolHat.svg").default}
            style={{ marginRight: 8 }}
          />
          <p className="method-title"> {t("Student Activity")}</p>
        </div>
      ) : null}

      {fromTemplate || userDefined ? (
        <div className="create-new-lesson-process-inputs-container">
          <div className="lesson-process-description-textarea-container">
            <Textarea
              iconClassName="lesson-process-desc-icon"
              label={t("Action summary title")}
              maxLength={100}
              onFocus={() => actionSaved(false)}
              className="method-name"
              placeholder={t("Action summary title")}
              id="studentAction"
              readOnly={false}
              autoScrollToElement={false}
              onchange={createNewLessonProcess}
              disabled={!studentActionActive}
            />
          </div>
          <Textarea
            iconClassName="lesson-process-desc-icon"
            label={t("Activity description")}
            className="method-name"
            onFocus={() => actionSaved(false)}
            placeholder={t("Activity description")}
            id="studentActionDesc"
            readOnly={false}
            autoScrollToElement={false}
            onchange={createNewLessonProcess}
            disabled={
              !studentActionActive ||
              !studentAction ||
              (!fromTemplate && !userDefined)
            }
          />
        </div>
      ) : (
        <div
          className="pl-20 py-10 f-mardoto-22 editor-state-response"
          dangerouslySetInnerHTML={{ __html: studentActionDesc }}
        />
      )}
      {(fromTemplate || userDefined || teacherAction) && (
        <div
          className="method-title-container "
          style={{
            background: teacherActionActive
              ? "linear-gradient(74.09deg, #fbb86b 0%, #e38d2a 100%)"
              : "linear-gradient(83.13deg, #9f9e9e 0%, #696767 100%)",
          }}
        >
          <img
            src={require("../../../../img/teacherGlasses.svg").default}
            style={{ marginRight: 8 }}
          />
          <p className="method-title"> {t("Teacher Activity")}</p>
        </div>
      )}
      <div className="create-new-lesson-process-inputs-container">
        <div className="lesson-process-description-textarea-container">
          {fromTemplate || userDefined ? (
            <Textarea
              iconClassName="lesson-process-desc-icon"
              maxLength={100}
              label={t("Action summary title")}
              className="method-name"
              onFocus={() => actionSaved(false)}
              placeholder={t("Action summary title")}
              id="teacherAction"
              readOnly={false}
              onchange={createNewLessonProcess}
              autoScrollToElement={false}
              disabled={!teacherActionActive}
            />
          ) : null}
        </div>

        {fromTemplate || userDefined ? (
          <Textarea
            iconClassName="lesson-process-desc-icon"
            label={t("Activity description")}
            className="method-name"
            onFocus={() => actionSaved(false)}
            placeholder={t("Activity description")}
            id="teacherActionDesc"
            readOnly={false}
            onchange={createNewLessonProcess}
            autoScrollToElement={false}
            disabled={
              !teacherActionActive ||
              !teacherAction ||
              (!fromTemplate && !userDefined)
            }
          />
        ) : (
          <div
            className="pl-20 pb-50 f-mardoto-22 editor-state-response"
            dangerouslySetInnerHTML={{ __html: teacherActionDesc }}
          />
        )}

        {/*{(textPlaceholder !== "" || textPlaceholder) && (*/}
        <>
          {fromTemplate || userDefined ? (
            <>
              <p className="textarea-label">
                {t("Clarifications, guidelines - Included in the lesson plan")}
              </p>
              <div className="method-editor-large">
                <CustomEditor
                  actionId={actionId}
                  id="guide"
                  index={`${methodIndex}${actionIndex}`}
                  cleanState={cleanState}
                  filePath={`${userDefined}${lessonProcessId}/`}
                  setCleanState={setCleanState}
                  onFocus={() => actionSaved(false)}
                  currentAction={"guide"}
                  onchange={createNewLessonProcess}
                />
              </div>
            </>
          ) : (
            guide && (
              <>
                <p className="guide-text-title">
                  {t(
                    "Clarifications, guidelines - Included in the lesson plan"
                  )}
                </p>
                <p
                  className={"guide-text"}
                  dangerouslySetInnerHTML={{ __html: guide }}
                />
              </>
            )
          )}
          {!(fromTemplate || userDefined) &&
            teacherActionDescNotInLessonPlan && (
              <>
                <p className="guide-text-title">
                  {t(
                    "Clarifications, guidelines - Methodical (Guidance for Authoring Teachers only)"
                  )}
                </p>
                <p
                  className="guide-text"
                  dangerouslySetInnerHTML={{
                    __html: teacherActionDescNotInLessonPlan,
                  }}
                />
              </>
            )}
          <div className="action-description-container">
            <p className="textarea-label">{t("Learner material")}</p>
            <div className="method-editor-large">
              <CustomEditor
                id="pupilWorkPart"
                index={`${methodIndex}${actionIndex}`}
                cleanState={cleanState}
                setCleanState={setCleanState}
                placeholder={
                  !(fromTemplate || userDefined) ? pupilWorkPart : " "
                }
                onFocus={() => actionSaved(false)}
                currentAction={`pupilWorkPart`}
                onchange={createNewLessonProcess}
              />
            </div>
          </div>
          <div className="action-description-container">
            <p className="textarea-label">
              {t("Content wording, questions, ideas, etc")}
            </p>
            <div className="method-editor-large">
              <CustomEditor
                id="teacherActionText"
                index={`${methodIndex}${actionIndex}`}
                cleanState={cleanState}
                setCleanState={setCleanState}
                placeholder={
                  !(fromTemplate || userDefined) ? textPlaceholder : " "
                }
                onFocus={() => actionSaved(false)}
                currentAction={`teacherActionText`}
                onchange={createNewLessonProcess}
              />
            </div>
          </div>
        </>
        {/*)}*/}
      </div>
      <div>
        <div>
          <div className="lesson-process-duration-input-time-icon">
            <img
              src={require("../../../../img/minute.svg").default}
              alt={"image about minute"}
            />
          </div>
          <Input
            type="number"
            title=""
            placeholder={t("Time/Duration")}
            className="input-timer"
            maxLength="2"
            defaultValue={null}
            id="duration"
            onFocus={() => actionSaved(false)}
            onChange={createNewLessonProcess}
          />
          <div
            style={{
              borderBottom: "1px solid lightgray",
              paddingBottom: "5px",
            }}
            className="d-flex justify-content-end"
          >
            <Button
              onClick={() => {
                addOrEditAction(
                  methodId,
                  methodOrder,
                  studentAction,
                  studentActionDesc,
                  teacherAction,
                  teacherActionDesc,
                  studentActionText,
                  teacherActionText,
                  duration,
                  handleFormChange,
                  teacherActionDescNotInLessonPlan
                );
              }}
              title={actionId ? t("EdIt") : t("Save")}
              disabled={
                !(
                  (studentActionActive &&
                    studentAction &&
                    studentAction.trim()) ||
                  (teacherActionActive && teacherAction && teacherAction.trim())
                )
              }
              className={
                studentAction || teacherAction
                  ? "btn-save-lsn-process enable-save"
                  : "btn-save-lsn-process"
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    lessonProcessId: state.formReducer?.id,
    studentAction: state.formReducer?.studentAction,
    studentActionId: state.formReducer?.studentActionId,
    studentActionActive: state.formReducer?.studentActionActive,
    studentActionText: state.formReducer?.studentActionText,
    studentActionDesc: state.formReducer?.studentActionDesc,
    pupilWorkPart: state.formReducer?.pupilWorkPart,
    fromTemplate: state.formReducer.fromTemplate,
    userDefined: state.formReducer.userDefined,
    guide: state.formReducer?.guide,
    guideFiles: state.formReducer.guideFiles ?? [],
    isSavedAction: state.lessonProcessReducer.actionSavedValue,
    teacherActionId: state.formReducer.teacherActionId ?? null,
    teacherAction: state.formReducer?.teacherAction,
    teacherActionDesc: state.formReducer?.teacherActionDesc,
    teacherActionActive: state.formReducer?.teacherActionActive,
    teacherActionText: state.formReducer?.teacherActionText,
    lessonProcess: state.lessonProcessReducer.lessonProcess,
    textPlaceholder: state.formReducer?.textPlaceholder,
    teacherActionTextFiles: state.formReducer.teacherActionTextFiles ?? [],
    duration: state.formReducer?.duration ?? 0,
    isMethodDeleted: state.formReducer?.isMethodDeleted,
    userMethodActive: state.formReducer?.userMethodActive,
    methodOrder: state.formReducer?.methodOrder,
    methodId: state.formReducer.methodId ?? null,
    procImages: state.formReducer.procImages ?? [],
    methodIndex: state.lessonProcessReducer.methodIndex,
    isNewAction: state.formReducer.isNew,
    actionIndex: state.lessonProcessReducer.actionIndex,
    actionId: state.formReducer?.id,
    teacherActionDescNotInLessonPlan:
      state.formReducer?.teacherActionDescNotInLessonPlan ?? "",
    order: state.formReducer?.order,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleFormChange: (key, value) => dispatch(handleFormChange(key, value)),
    actionSaved: (value) => dispatch(actionSaved(value)),
    boardImages: (clearArr) => dispatch(rightSidebarBoardImages(clearArr)),
    pdfFileArr: (clearArr) => dispatch(pdfFilesInAction(clearArr)),
    fetchUserMethod: (index) => dispatch(fetchUserMethod(index)),
    checkMainContainer: (value) => dispatch(checkMainContainerInfo(value)),
  };
};

export const BodyForMainContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(BodyForMainContainerComponent);
