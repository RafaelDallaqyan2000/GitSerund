import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  addLessonProcess,
  changeFiles,
  cleanForm,
  fetchMethods,
  handleFormChange,
  fetchMethodDetails,
  fetchUserMethod,
  lessonProcessCount,
  lessonProcessId,
} from "../../../store";
import { useParams } from "react-router-dom";
import Textarea from "../../../components/Form/Textarea/Textarea";
import "../CreateNewLessonProcess.css";
import "../../CreateNewLessonPlan/LessonPlanComponents/LessonPlanComponents.css";
import Input from "../../../components/Form/Input";
import Button from "../../../components/Button/Button";
import StudentEditorComponent from "./StudentEditorComponent";
import TeacherEditorComponent from "./TeacherEditorComponent";
import "./LessonProcessComponent.css";
import { useTranslation } from "react-i18next";

function LessonProcessComponent({
  lessonProcessSummaryTeacher,
  lessonProcessSummaryStudent,
  addLessonProcess,
  studentMinute,
  teacherMinute,
  procOfLesson,
  count,
  lessonProcessId,
  actionType,
  fetchMethodDetails,
  fetchUserMethod,
  lessonId,
  teacherActionText,
  studentActionText,
  teacherActionDesc,
  studentActionDesc,
}) {
  const { action, lessonPlanId } = useParams();
  const { t } = useTranslation();

  useEffect(() => {
    if (procOfLesson) {
      // lessonProcessIdFunction(0, "edit");
      fetchMethodDetails(0);
    }
    // fetchMethodDetails(0);
  }, [procOfLesson]);

  useEffect(() => {
    fetchUserMethod();
    fetchMethodDetails(0);
    // lessonProcessIdFunction(0, "edit");
  }, [lessonPlanId]);

  const createLessonProcess = () => {
    if (lessonProcessId >= 0 && actionType === "student") {
      procOfLesson[lessonProcessId].studentAction = lessonProcessSummaryStudent;
      procOfLesson[lessonProcessId].studentActionDesc = studentActionDesc;

      const lessonProcess = [...procOfLesson];
      addLessonProcess(lessonProcess);
    }
    if (lessonProcessId >= 0 && actionType === "teacher") {
      procOfLesson[lessonProcessId].teacherAction = lessonProcessSummaryTeacher;
      procOfLesson[lessonProcessId].teacherActionDesc = teacherActionDesc;
      const lessonProcess = [...procOfLesson];
      addLessonProcess(lessonProcess);
    }
    if (actionType === "edit") {
      // let htmlTeacherActionText = stateToHTML(
      //   teacherActionText.getCurrentContent(),
      //   teacherActionText.getCurrentInlineStyle()
      // );

      if (teacherActionText) {
        procOfLesson[lessonProcessId].teacherAction =
          lessonProcessSummaryTeacher;
        procOfLesson[lessonProcessId].teacherActionText = teacherActionText;
        procOfLesson[lessonProcessId].teacherActionDesc = teacherActionDesc;
      }
      if (studentActionText) {
        procOfLesson[lessonProcessId].studentAction =
          lessonProcessSummaryStudent;
        procOfLesson[lessonProcessId].studentActionText = studentActionText;
        procOfLesson[lessonProcessId].studentActionDesc = studentActionDesc;
      }
      // handleFormChange("teacherActionText", "");
      // handleFormChange("studentActionText", "");
      // cleanForm();
    }
    if (lessonProcessId === undefined) {
      if (count === procOfLesson.length) {
        //verjm avelanalu hamar
        const lessonProcess = [
          ...procOfLesson,
          {
            // id: count,
            id: null,
            studentAction: lessonProcessSummaryStudent ?? "",
            teacherAction: lessonProcessSummaryTeacher ?? "",
            teacherMinute: teacherMinute ?? 0,
            studentMinute: studentMinute ?? 0,
          },
        ];
        addLessonProcess(lessonProcess);
      } else {
        //aranqic avelacoxy

        const lessonProces = {
          id: null,
          studentAction: lessonProcessSummaryStudent ?? "",
          teacherAction: lessonProcessSummaryTeacher ?? "",
          teacherActionDesc: teacherActionDesc ?? "",
          studentActionDesc: studentActionDesc ?? "",

          teacherMinute: teacherMinute ?? 0,
          studentMinute: studentMinute ?? 0,
        };

        procOfLesson.splice(count, 0, lessonProces);

        const lessonProcess = [...procOfLesson];
        addLessonProcess(lessonProcess);

        // addLessonProcess(procOfLesson);
      }
      // cleanForm();
    }
  };

  return (
    <div style={{ width: "100%" }}>
      <div className="components-for-proces">
        <p className="lesson-process-component-title">
          {action === "student" ? t("Student Activity") : t("Teacher Activity")}
        </p>

        {!lessonId ? (
          <div className="lesson-process-description-textarea-container">
            <Textarea
              iconClassName="lesson-process-desc-icon"
              className="desc"
              placeholder="Գործողության ամփոփ նկարագիր"
              id={action === "student" ? "studentAction" : "teacherAction"}
              readOnly={lessonId ? true : false}
            />
          </div>
        ) : null}

        <div>
          <div style={{ marginLeft: "10px" }}>
            <Textarea
              id={
                action === "student" ? "studentActionDesc" : "teacherActionDesc"
              }
              // id="lessonProcessTitle"
              className="proc-header "
              placeholder={t("Activity description")}
              readOnly={lessonId ? true : false}
            />
          </div>
          <div style={{ marginLeft: "30px" }}>
            {/* <div onClick={() => setPlusIcon(false)}> */}
            {/* <EditorContainer /> */}
            {action === "student" ? (
              <StudentEditorComponent />
            ) : (
              <TeacherEditorComponent />
            )}
            {/* </div> */}
          </div>
        </div>

        <div style={{ display: "flex" }} className="time-and-saveBtn">
          <div
            style={{
              position: "absolute",
              width: "18px",
              height: "18px",
              paddingTop: "42px",
              paddingLeft: "7px",
              zIndex: "1",
            }}
          >
            <img src={require("../../../img/minute.svg").default} />
          </div>
          <div
            style={{
              marginLeft: "140px",
              marginTop: "36px",
              zIndex: "1",
              position: "absolute",
            }}
          >
            <img src={require("../../../img/star.svg").default} />
          </div>
          <Input
            type="number"
            placeholder={t("Time(s)")}
            className="input-timer"
            id={`${action}Minute`}
          />

          <div
            // style={{ paddingTop: "30px", backgroundColor: "#a5e7c0" }}
            onClick={createLessonProcess}
          >
            <Button
              title={t("Save")}
              disabled={
                lessonProcessSummaryTeacher || lessonProcessSummaryStudent
                  ? false
                  : true
              }
              // className="btn-save-lsn-process"
              className={
                lessonProcessSummaryTeacher || lessonProcessSummaryStudent
                  ? "btn-save-lsn-process enable-save "
                  : "btn-save-lsn-process"
              }
            />
          </div>
        </div>
      </div>

      <div
        style={{
          height: "10px",
          background: "rgba(247, 248, 252, 1)",
          border: " 1px solid #DFE3E7",
        }}
      ></div>

      <div className="finish-process-container">
        <div style={{ paddingTop: "50px" }} onClick={createLessonProcess}>
          <Button
            title={t("Complete")}
            // className="btn-save-lsn-process"
            className={
              lessonProcessSummaryTeacher || lessonProcessSummaryStudent
                ? "btn-save-lsn-process enable-save"
                : "btn-save-lsn-process"
            }
          />
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    lessDescriptions: state.lessonPlanReducer.lessDescriptions,
    lessFiles: state.formReducer.lessFiles ?? [],
    methods: state.lessonPlanReducer.allMethods,
    lessonProcessSummaryTeacher: state.formReducer?.teacherAction,
    lessonProcessSummaryStudent: state.formReducer?.studentAction,
    teacherMinute: state.formReducer?.teacherMinute,
    studentMinute: state.formReducer?.studentMinute,
    procOfLesson: state.lessonProcessReducer?.procOfLesson,
    count: state.lessonProcessReducer.count,
    lessonProcessId: state.lessonProcessReducer.lessonProcessId,
    actionType: state.lessonProcessReducer.action,
    lessonId: state.formReducer.id,
    teacherActionText: state.formReducer?.teacherActionText,
    studentActionText: state.formReducer?.studentActionText,
    teacherActionDesc: state.formReducer?.teacherActionDesc,
    studentActionDesc: state.formReducer?.studentActionDesc,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchMethods: () => dispatch(fetchMethods()),
    changeFiles: (data) => dispatch(changeFiles(data)),
    handleFormChange: (key, value) => dispatch(handleFormChange(key, value)),
    addLessonProcess: (lesson) => dispatch(addLessonProcess(lesson)),
    cleanForm: () => dispatch(cleanForm()),
    lessonProcessCount: (count) => dispatch(lessonProcessCount(count)),
    fetchMethodDetails: (id) => dispatch(fetchMethodDetails(id)),
    fetchUserMethod: () => dispatch(fetchUserMethod()),
    lessonProcessIdFunction: (id, action) =>
      dispatch(lessonProcessId(id, action)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LessonProcessComponent);
