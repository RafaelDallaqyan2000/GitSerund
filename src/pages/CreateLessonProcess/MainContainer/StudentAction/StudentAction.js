import React from "react";
import { connect } from "react-redux";
import Textarea from "../../../../components/Form/Textarea/Textarea";
import StudentEditorComponent from "./StudentEditorComponent";
import "./studentAction.css";
import { handleFormChange } from "../../../../store";
import { useTranslation } from "react-i18next";

const StudentAction = ({ userTypeId, studentAction }) => {
  const { t } = useTranslation();
  return (
    <div className="method-action-container ">
      <div className="method-title-container  student-method">
        <p className="method-title">{t("Student Activity")}</p>
      </div>
      <div className="lesson-process-description-textarea-container">
        <Textarea
          label={t("Action summary title")}
          maxLength={100}
          iconClassName="lesson-process-desc-icon"
          className="method-name"
          autoScrollToElement={false}
          onlyRead={userTypeId !== 6}
          id="studentAction"
        />
      </div>
      <Textarea
        label={t("Activity description")}
        iconClassName="lesson-process-desc-icon"
        className="method-editor method-name"
        onlyRead={userTypeId !== 6}
        disabled={!studentAction}
        autoScrollToElement={false}
        id="studentActionDesc"
      />
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    value: state.formReducer[ownProps.id] ?? "",
    studentAction: state.formReducer.studentAction ?? "",
    userTypeId: state.authReducer.typeId,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    handleFormChange: (key, value) => dispatch(handleFormChange(key, value)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StudentAction);
