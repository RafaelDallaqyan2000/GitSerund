import React, { useCallback, useState } from "react";
import { connect } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Input from "../../../components/Form/Input";
import store, { cleanForm, handleFormChange } from "../../../store";
import {
  deleteMethodDetails,
  lessonProcessIdAndType,
  showMethodDetails,
} from "../../../store";
import request from "../../../store/request";
import AddDropdown from "./AddDropdown/AddDropdown";
import "./sidebar.css";
import { handleLsnProcChange } from "../../../store/lessonProcess/actions/handleLsnProcChange";
import { MessagePopUp } from "../../../components/MessagePopUp/MessagePopUp";
import { useTranslation } from "react-i18next";

const Sidebar = ({
  showMethodDetails,
  lessonProcessIdAndType,
  cleanForm,
  methodNameFromStore,
  addedMethods,
  deleteMethodDetails,
  handleFormChange,
  handleLsnProcChange,
  popupDetails,
  userTypeId,
}) => {
  const query = new URLSearchParams(useLocation().search);
  const navigate = useNavigate();
  const { lessonPlanId } = useParams();
  const { t, i18n } = useTranslation();

  const [editName, setEditName] = useState(false);
  const showDetails = (index, type) => {
    lessonProcessIdAndType(index, type);
    showMethodDetails(index);
  };

  const deleteMethod = (e, id, action) => {
    deleteMethodDetails(id, action);
    cleanForm();
    e.stopPropagation();
  };

  const toggleEditName = () => {
    setEditName((prev) => !prev);
  };
  const submitNameChange = (e) => {
    e.preventDefault();
    const methodId = Number(lessonPlanId);
    const methodName = store.getState().formReducer.methodName;
    query.set("name", methodName);
    toggleEditName();
    navigate("?" + query);
    request("/api/method", "PUT", {
      methodId,
      methodName,
      language: i18n.language,
    });
  };

  const handleClosePopup = useCallback(() => {
    handleLsnProcChange("popupDetails", {
      type: "fail",
      title: "",
      text: "",
    });
  }, []);

  let name = query.get("name");
  return (
    <>
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

      <div className="lesson-process-actions-name-container">
        <div className="lesson-process-action-container">
          <p className="lesson-process-action-name">{t("Student Activity")}</p>
        </div>
        <div className="lesson-process-action-container">
          <p className="lesson-process-action-name">{t("Teacher Activity")}</p>
        </div>
      </div>
      <div className="added-lesson-process-wrapper">
        {editName ? (
          <form onSubmit={submitNameChange}>
            <Input
              className="sidebar-input"
              id="methodName"
              defaultValue={name}
            />
            <span onClick={submitNameChange} className="sidebar-submit-btn">
              ✓
            </span>
          </form>
        ) : (
          <div
            onClick={toggleEditName}
            className="added-lesson-method-name-container"
          >
            {name}
          </div>
        )}

        {addedMethods?.map((proc, index) => {
          return (
            <div key={index}>
              <div
                className="added-lesson-process-container"
                onClick={() => showDetails(index, "student")}
              >
                {proc.studentAction ? (
                  <div className="saved-process saved-process-student">
                    <p className="saved-process-text">{proc.studentAction}</p>
                    {userTypeId !== 3 ? (
                      <span
                        onClickCapture={(e) =>
                          deleteMethod(e, proc.id, "student")
                        }
                        className="method-delete-icon"
                      />
                    ) : null}
                  </div>
                ) : (
                  <div className="empty-methot-action" />
                )}
                {proc.teacherAction ? (
                  <div className="saved-process saved-process-teacher ">
                    <p className="saved-process-text">{proc.teacherAction}</p>
                    {userTypeId !== 3 ? (
                      <span
                        onClickCapture={(e) =>
                          deleteMethod(e, proc.id, "teacher")
                        }
                        className="method-delete-icon"
                      />
                    ) : null}
                  </div>
                ) : null}
              </div>
              <div className="lesson-process-time-line-container">
                <div className="number-line" />
              </div>
            </div>
          );
        })}

        <AddDropdown />
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    addedMethods: state.lessonProcessReducer.addedMethods,
    methodNameFromStore: state.lessonProcessReducer.methodName,
    popupDetails: state.lessonProcessReducer.popupDetails,
    userTypeId: state.authReducer.typeId,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    showMethodDetails: (index) => dispatch(showMethodDetails(index)),
    lessonProcessIdAndType: (id, type) =>
      dispatch(lessonProcessIdAndType(id, type)),
    deleteMethodDetails: (id, actionType) =>
      dispatch(deleteMethodDetails(id, actionType)),
    cleanForm: () => dispatch(cleanForm()),
    handleFormChange: (key, value) => dispatch(handleFormChange(key, value)),
    handleLsnProcChange: (key, value) =>
      dispatch(handleLsnProcChange(key, value)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
