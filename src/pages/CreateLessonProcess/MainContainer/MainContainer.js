import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import "./mainContainer.css";
import Button from "../../../components/Button/Button";
import { addNewLessonProcess } from "../../../store/lessonProcess/actions/addLessonProcess";
import { cleanForm } from "../../../store";
import {
  showMethodDetails,
  createMethodDetails,
  editMethodDetails,
} from "../../../store";
import StudentAction from "./StudentAction/StudentAction";
import TeacherAction from "./TeacherAction/TeacherAction";
import { useTranslation } from "react-i18next";

const MainContainer = ({
  actionId,
  addNewLessonProcess,
  lessonProcess,
  teacherAction,
  studentAction,
  studentActionDesc,
  teacherActionDesc,
  addedLessonProcessId,
  cleanForm,
  showMethodDetails,
  methodId,
  createMethodDetails,
  editMethodDetails,
  guide,
  textPlaceholder,
  userTypeId,
}) => {
  const { t } = useTranslation();
  const [disabledBtn, setDisabledBtn] = useState(false);

  useEffect(() => {
    if (lessonProcess[addedLessonProcessId]) {
      showMethodDetails(addedLessonProcessId);
    }
  }, [addedLessonProcessId]);

  const handleCreateMethod = () => {
    cleanForm();
    setDisabledBtn(false);
  };

  const handleEditMethod = () => {
    setDisabledBtn(false);
    let lessonPlanMinute = +localStorage.getItem("lessonPlanMinute");

    if (lessonPlanMinute < 45) {
      localStorage.setItem("lessonPlanMinuteFlag", "false");
    }
  };

  const createOrEditLessonProcess = () => {
    if (actionId) {
      editMethodDetails(handleEditMethod);
    }

    if (addedLessonProcessId === null) {
      const process = [
        ...lessonProcess,
        {
          methodid: methodId,
          studentAction: studentAction ?? null,
          teacherAction: teacherAction ?? null,
          studentActionDesc: studentActionDesc ?? null,
          teacherActionDesc: teacherActionDesc ?? null,
          guide: guide ?? "",
          textPlaceholder: textPlaceholder ?? "",
        },
      ];

      addNewLessonProcess(process);
      createMethodDetails(handleCreateMethod);
    }
    setDisabledBtn(true);
  };

  return (
    <div>
      <StudentAction />
      <div className="method-action-devider-component" />

      <TeacherAction />

      <div className="method-action-devider-component" />

      {userTypeId === 6 && (
        <div
          className="method-save-btn-container d-flex justify-content-end"
          onClick={createOrEditLessonProcess}
        >
          <Button
            title={t("Save")}
            disabled={!(studentAction || teacherAction) || disabledBtn}
            className={
              studentAction || teacherAction
                ? "btn-save-lsn-process enable-save"
                : "btn-save-lsn-process"
            }
          />
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    addedLessonProcessId: state.lessonProcessReducer.addedLessonProcessId,
    actionId: state.formReducer?.id,
    lessonProcess: state.lessonProcessReducer.lessonProcess,
    studentAction: state.formReducer?.studentAction,
    teacherAction: state.formReducer?.teacherAction,
    studentActionDesc: state.formReducer?.studentActionDesc,
    teacherActionDesc: state.formReducer?.teacherActionDesc,
    guide: state.formReducer?.guide,
    textPlaceholder: state.formReducer?.textPlaceholder,
    duration: state.formReducer?.duration,
    methodId: state.lessonProcessReducer.methodId,
    formReducer: state.formReducer,
    userTypeId: state.authReducer.typeId,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addNewLessonProcess: (lessonProcess) =>
      dispatch(addNewLessonProcess(lessonProcess)),
    cleanForm: () => dispatch(cleanForm()),
    showMethodDetails: (index) => dispatch(showMethodDetails(index)),
    createMethodDetails: (callback) => dispatch(createMethodDetails(callback)),
    editMethodDetails: (callback) => dispatch(editMethodDetails(callback)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);
