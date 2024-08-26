import React from "react";
import { useTranslation } from "react-i18next";

export const UserAndTeacherActions = () => {
  const { t } = useTranslation();
  return (
    <div className="lesson-process-actions-name-container">
      <div className="lesson-process-action-container">
        <p className="lesson-process-action-name">{t("Student Activity")}</p>
      </div>
      <div className="lesson-process-action-container">
        <p className="lesson-process-action-name">{t("Teacher Activity")}</p>
      </div>
    </div>
  );
};
