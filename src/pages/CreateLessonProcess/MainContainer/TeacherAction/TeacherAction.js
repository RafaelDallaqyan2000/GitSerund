import React from "react";
import { connect } from "react-redux";
import { CustomEditor } from "../../../../components";
import Textarea from "../../../../components/Form/Textarea/Textarea";
import "./teacherAction.css";
import { useTranslation } from "react-i18next";

const TeacherAction = ({ userTypeId, teacherAction }) => {
  const { t } = useTranslation();
  return (
    <div className="method-action-container">
      <div className="method-title-container teacher-method">
        <p className="method-title">{t("Teacher Activity")}</p>
      </div>
      <div className="lesson-process-description-textarea-container">
        <Textarea
          maxLength={100}
          label={t("Action summary title")}
          iconClassName="lesson-process-desc-icon"
          className="method-name "
          onlyRead={userTypeId !== 6}
          autoScrollToElement={false}
          id="teacherAction"
        />
      </div>
      <Textarea
        label={t("Activity description")}
        iconClassName="lesson-process-desc-icon"
        className="method-editor method-name"
        onlyRead={userTypeId !== 6}
        disabled={!teacherAction}
        autoScrollToElement={false}
        id="teacherActionDesc"
      />

      <p className="method-editor-label" style={{ marginTop: "25px" }}>
        {t("Clarifications, guidelines - Included in the lesson plan")}
      </p>
      <div style={{ borderRadius: "6px" }}>
        <CustomEditor
          id="guide"
          snippingTool={true}
          canAttachFile={true}
          placeholder={" "}
          containerClassName="method-editor-large"
          containerStyle={{ padding: 11 }}
          onlyRead={userTypeId !== 6}
          currentAction={`guide`}
        />
      </div>

      <p className="method-editor-label" style={{ marginTop: "25px" }}>
        {t(
          "Clarifications, guidelines - Methodical (Guidance for Authoring Teachers only)"
        )}
      </p>
      <div style={{ borderRadius: "6px" }}>
        <CustomEditor
          id="teacherActionDescNotInLessonPlan"
          snippingTool={true}
          canAttachFile={true}
          placeholder={" "}
          containerClassName="method-editor-large"
          containerStyle={{ padding: 11 }}
          onlyRead={userTypeId !== 6}
          currentAction={`teacherActionDescNotInLessonPlan`}
        />
      </div>

      <p className="method-editor-label" style={{ marginTop: "25px" }}>
        {t("Learner material")}
      </p>
      <div style={{ borderRadius: "6px" }}>
        <CustomEditor
          id="pupilWorkPart"
          snippingTool={true}
          canAttachFile={true}
          placeholder={" "}
          containerClassName="method-editor-large"
          containerStyle={{ padding: 11 }}
          onlyRead={userTypeId !== 6}
          currentAction={`pupilWorkPart`}
        />
      </div>

      <p className="method-editor-label" style={{ marginTop: "25px" }}>
        {t("Content wording, questions, ideas, etc")}
      </p>
      <div
        style={{
          borderRadius: "6px",
        }}
      >
        <CustomEditor
          id="textPlaceholder"
          snippingTool={true}
          canAttachFile={true}
          placeholder={" "}
          containerClassName="method-editor-large"
          containerStyle={{ padding: 11 }}
          onlyRead={userTypeId !== 6}
          currentAction={`textPlaceholder`}
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    userTypeId: state.authReducer.typeId,
    teacherAction: state.formReducer.teacherAction,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(TeacherAction);
