import React, { useState, useEffect, useCallback } from "react";
import { connect } from "react-redux";
import {
  fetchMethodDetails,
  fetchUserMethod,
  cleanProcessReducer,
  fetchDeleteUserMethodApi,
  fetchRecoverMethodApi,
  initForm,
  removeActionByIndex,
  setSelectedAction,
  addLessonProcess,
  fetchMethods,
  handleFormChange,
} from "../../../store";
import { useParams } from "react-router";
import { deleteLessonProcessMethod } from "../../../store/lessonProcess/actions/addLessonProcess";
import { PopUp } from "../../../layouts/components/PopUp";
import Select from "../../../components/Form/Select/Select";
import "./sidebar.css";
import { RenderLessonProcess } from "./RenderLessonProcess/RenderLessonProcess";
import { UserAndTeacherActions } from "./UserAndTeacherActions/UserAndTeacherActions";
import SelectWithSearch from "../../../components/Form/SelectWithSearch";
import { useTranslation } from "react-i18next";

const Sidebar = ({
  lessonProcess,
  cleanProcess,
  id,
  fetchUserMethod,
  methods,
  fetchMethods,
  handleFormChange,
  selectedMethod1Name,
}) => {
  const { t } = useTranslation();
  const { lessonProcId } = useParams();
  const [localLessonProcess, setLocalLessonProcess] = useState(lessonProcess);
  const [methodOrderAndId, setMethodOrderAndId] = useState({});
  const [editMethodName, setEditMethodName] = useState();
  const [isOpenPopUpAddMethod, setIsOpenPopUpAddMethod] = useState(false);
  const [selectedMethodId, setSelectedMethodId] = useState(null);
  const [previousMethodId, setPreviousMethodId] = useState(null);
  const [previousOrder, setPreviousOrder] = useState(null);
  const [deleteProcAction, setDeleteProcAction] = useState(null);
  useEffect(() => {
    setLocalLessonProcess(lessonProcess);
  }, [lessonProcess]);
  useEffect(() => {
    cleanProcess();
    fetchUserMethod(lessonProcId);
    fetchMethods();
  }, []);

  const deleteUserMethod = () => {
    fetchDeleteUserMethodApi(
      lessonProcId,
      methodOrderAndId.methodId,
      methodOrderAndId.methodOrder,
      fetchUserMethod
    );
  };

  const recoverUserMethod = (methodId, methodOrder) => {
    fetchRecoverMethodApi(lessonProcId, methodId, methodOrder, fetchUserMethod);
  };

  const toggleEditName = () => {
    setEditMethodName((prev) => !prev);
  };

  const handleClosedModal = (e) => {
    e.stopPropagation();
  };

  const onAddNewMethod = (
    previousMethodId,
    methodIndex,
    openPupUp,
    previousOrder
  ) => {
    setPreviousMethodId(previousMethodId);
    setIsOpenPopUpAddMethod(openPupUp);
    setSelectedMethodId(null);
    setPreviousOrder(previousOrder);
  };

  const closePopUpOrSuccessCall = () => {
    handleFormChange("selectedMethod1", null);
    handleFormChange("selectedMethod1Name", "");
  };

  return (
    <>
      <UserAndTeacherActions t={t} />
      <PopUp
        open={isOpenPopUpAddMethod}
        lessonPlanId={lessonProcId}
        previousMethodId={previousMethodId}
        previousOrder={previousOrder}
        methodId={selectedMethodId}
        setOpen={setIsOpenPopUpAddMethod}
        lessonProc={localLessonProcess}
        setLessonProc={setLocalLessonProcess}
        callbackFunction={closePopUpOrSuccessCall}
      >
        <div className="selectInPopUp">
          <p style={{ textAlign: "center" }}>{t("Select the method")}</p>
          <SelectWithSearch
            readOnly={true}
            inputStyle={{ width: "100%", fontSize: "12px" }}
            inputValue={selectedMethod1Name}
            placeholder={t("Selected methods")}
            readOnlyStyle={{
              filter: "inherit",
              boxShadow: "0 3px 7px -1px #bababa",
              borderRadius: "5px",
            }}
          >
            {methods.map((method) => {
              return (
                <div
                  style={{ fontSize: "12px" }}
                  onClick={() => {
                    handleFormChange("selectedMethod1", method.id);
                    handleFormChange("selectedMethod1Name", method.name);
                  }}
                >
                  {method.name}
                </div>
              );
            })}
          </SelectWithSearch>
        </div>
      </PopUp>

      {localLessonProcess && localLessonProcess.length > 0
        ? localLessonProcess?.map((method, methodIndex) => {
            const previousMethod = localLessonProcess[methodIndex - 1];
            return (
              <RenderLessonProcess
                onAddNewMethod={onAddNewMethod}
                localLessonProcess={localLessonProcess}
                toggleEditName={toggleEditName}
                deleteUserMethod={deleteUserMethod}
                recoverUserMethod={recoverUserMethod}
                setDeleteProcAction={setDeleteProcAction}
                deleteProcAction={deleteProcAction}
                setMethodOrderAndId={setMethodOrderAndId}
                lessonProcId={lessonProcId}
                id={id}
                method={method}
                methodIndex={methodIndex}
                previousMethod={previousMethod}
              />
            );
          })
        : null}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    methods: state.lessonPlanReducer.allMethods,
    lessonProcess: state.lessonProcessReducer.lessonProcess,
    ready: state.lessonProcessReducer.ready,
    id: state.formReducer?.id,
    selectedMethod1: state.formReducer.selectedMethod1,
    selectedMethod1Name: state.formReducer.selectedMethod1Name,
    methodIndex: state.lessonProcessReducer.methodIndex,
    actionIndex: state.lessonProcessReducer.actionIndex,
    userDefined: state.formReducer.userDefined,
    studentAction: state.formReducer?.studentAction ?? "",
    teacherAction: state.formReducer?.teacherAction ?? "",
    guide: state.formReducer?.guide,
    studentActionDesc: state.formReducer?.studentActionDesc,
    teacherActionDesc: state.formReducer?.teacherActionDesc,
    studentActionText: state.formReducer?.studentActionText,
    teacherActionText: state.formReducer?.teacherActionText ?? "",
    isNewAction: state.formReducer.isNew,
    teacherActionTextFiles: state.formReducer.teacherActionTextFiles ?? [],
    studentActionTextFiles: state.formReducer.studentActionTextFiles ?? [],
    guideFiles: state.formReducer.guideFiles ?? [],
    minuteForAction: state.lessonProcessReducer.minuteForAction,
    lessonProcessId: state.formReducer?.id,
    duration: state.formReducer?.duration ?? 0,
    count: state.lessonProcessReducer.count,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchMethods: () => dispatch(fetchMethods()),
    deleteLessonProcessMethod: (methodId) =>
      dispatch(deleteLessonProcessMethod(methodId)),
    cleanProcess: () => dispatch(cleanProcessReducer()),
    removeActionByIndex: (methodIndex, actionIndex, type) =>
      dispatch(removeActionByIndex(methodIndex, actionIndex, type)),
    initForm: (form) => dispatch(initForm(form)),
    showMethodDetails: (proc) => dispatch(fetchMethodDetails(proc)),
    setSelectedAction: (methodIndex, actionIndex) =>
      dispatch(setSelectedAction(methodIndex, actionIndex)),
    fetchUserMethod: (index) => dispatch(fetchUserMethod(index)),
    addNewLessonProcess: (lessonProcess) =>
      dispatch(addLessonProcess(lessonProcess)),
    handleFormChange: (key, value) => dispatch(handleFormChange(key, value)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
