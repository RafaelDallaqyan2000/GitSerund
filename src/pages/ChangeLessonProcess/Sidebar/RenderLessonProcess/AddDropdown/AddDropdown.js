import React from "react";
import { connect } from "react-redux";
import {
  cleanForm,
  setSelectedAction,
  handleFormChange,
  initForm,
} from "../../../../../store";
import { defaultLessonAction } from "../../../MainContainer/MainContainer";
import { checkMainContainerInfo } from "../../../../../store/lessonProcess/actions/checkMainContainerInfo";
import { actionOrderAndPreviousOrder } from "../../../../../store/lessonProcess/actions/actionOrderAndPreviousOrder";
import "./addDropdown.css";
import { rightSidebarBoardImages } from "../../../../../store/lessonProcess/actions/rightSidebarBoardImages";
import { pdfFilesInAction } from "../../../../../store/lessonProcess/actions/pdfFilesInAction";

const AddDropdown = ({
  methodIndex,
  actionIndex,
  setSelectedAction,
  initForm,
  handleFormChange,
  methodOrder,
  methodId,
  order,
  previousOrder,
  checkMainContainer,
  actionOrderAndPreviousOrder,
  boardImages,
  pdfFileArr,
  t = () => {},
}) => {
  const createAction = () => {
    defaultLessonAction.methodOrder = methodOrder;
    defaultLessonAction.methodId = methodId;
    defaultLessonAction.previousOrder = previousOrder;
    defaultLessonAction.order = order;
    initForm(defaultLessonAction);
    // cleanForm()
    handleFormChange("teacherActionTextFiles", []);
    handleFormChange("guideFiles", []);
    handleFormChange("procImages", []);
    setSelectedAction(methodIndex, actionIndex);
  };

  return (
    <div>
      <img
        alt="plus"
        title={t("Add Action")}
        onClick={() => {
          actionOrderAndPreviousOrder(
            null,
            order - 1 > 0 ? order - 1 : previousOrder
          );
          checkMainContainer(true);
          createAction();
          window.scrollTo(0, 0);
          boardImages(true);
          pdfFileArr(true);
        }}
        style={{ cursor: "pointer" }}
        src={require("../../../../../img/plusIcon.svg").default}
      />
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    confirmValue: state.lessonProcessReducer.openConfirmValue,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    cleanForm: () => dispatch(cleanForm()),
    initForm: (form) => dispatch(initForm(form)),
    setSelectedAction: (procId, procType) =>
      dispatch(setSelectedAction(procId, procType)),
    handleFormChange: (key, value) => dispatch(handleFormChange(key, value)),
    checkMainContainer: (value) => dispatch(checkMainContainerInfo(value)),
    actionOrderAndPreviousOrder: (order, prevOrder) =>
      dispatch(actionOrderAndPreviousOrder(order, prevOrder)),
    boardImages: (clearArr) => dispatch(rightSidebarBoardImages(clearArr)),
    pdfFileArr: (clearArr) => dispatch(pdfFilesInAction(clearArr)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddDropdown);
