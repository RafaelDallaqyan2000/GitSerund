import React, { useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  getClassesBySubjectId,
  handleFormChange,
  handleShortDescription,
} from "../../../../store";
import { SelectWithSearchHOC } from "../../../../components";
import { useTranslation } from "react-i18next";



function SubjectAndClassComponent({
  subjects,
  classes,
  subjectAndClassId,
  subjectError,
  classError,
  handleShortDescription,
  handleFormChange,
  subjectName,
  className,
  semester,
  getClassesBySubjectId,
  subjectId,
  classId,
  onChangeError,
}) {
  const { t } = useTranslation();
  const semesters = [
    { id: 1, name: `I ${t("semester")}` },
    { id: 2, name: `II ${t("semester")}` },
  ];
  const handleClickSubjectOption = useCallback((subject) => {
    handleFormChange("subjectName", subject.name);
    handleFormChange("subjectForLsnPlan", subject.id);
    handleFormChange("className", "");
    handleFormChange("subjectAndClassId", 0);

    onChangeError((prevState) => {
      return {
        ...prevState,
        [subjectId]: subjectError && subject.id ? "" : subjectError,
      };
    });

    setTimeout(() => {
      getClassesBySubjectId(subject.id);
    }, 100);
  }, []);

  const handleClickClassOption = useCallback((classItem) => {
    handleFormChange("className", classItem.name);
    handleFormChange("subjectAndClassId", classItem.id);

    onChangeError((prevState) => {
      return {
        ...prevState,
        [classId]: classError && classItem.id ? "" : classError,
      };
    });
  }, []);

  const handleClickSemesterOption = useCallback((semester) => {
    handleFormChange("semester", semester.id);
  }, []);

  useEffect(() => {
    if (subjectAndClassId) {
      handleShortDescription({
        id: "subjectAndClassId",
        index: 10,
      });
    }
  }, [subjectAndClassId]);

  return (
    <>
      <div className="title_container">
        <p className="title">{t("Subject/Grade")}</p>
        {!!classError && <p className="required_text">{classError}</p>}
      </div>

      <div className="subject_classes_container">
        <SelectWithSearchHOC
          optionLabelKey="name"
          optionUniqueKey="id"
          options={subjects}
          onOptionClick={handleClickSubjectOption}
          loading={false}
          id="subjectForLsnPlan"
          placeholder={t("Subject")}
          inputValue={subjectName}
          readOnly={true}
          inputStyle={{ cursor: "pointer" }}
          errorMessage={subjectError ? subjectError : ""}
          disabled={!subjects?.length}
          readOnlyStyle={{ top: "53px" }}
          onFocus={(e) => {
            e.target.scrollIntoView({ behavior: "smooth", block: "center" });
          }}
        />

        <SelectWithSearchHOC
          optionLabelKey="name"
          optionUniqueKey="id"
          options={classes}
          onOptionClick={handleClickClassOption}
          loading={false}
          id="subjectAndClassId"
          placeholder={t("Grade")}
          inputValue={className}
          readOnly={true}
          inputStyle={{ cursor: "pointer" }}
          errorMessage={classError ? classError : ""}
          disabled={!subjectName}
          readOnlyStyle={{ top: "53px" }}
          onFocus={(e) => {
            e.target.scrollIntoView({ behavior: "smooth", block: "center" });
          }}
        />

        <SelectWithSearchHOC
          optionLabelKey="name"
          optionUniqueKey="id"
          options={semesters}
          onOptionClick={handleClickSemesterOption}
          loading={false}
          id="semester"
          placeholder={t("Semester")}
          inputValue={
            semester === 1 ? `I ${t("semester")}` : semester === 2 ? `II ${t("semester")}` : ""
          }
          readOnly={true}
          inputStyle={{ cursor: "pointer" }}
          disabled={!subjectName || !className}
          readOnlyStyle={{ top: "53px" }}
          onFocus={(e) => {
            e.target.scrollIntoView({ behavior: "smooth", block: "center" });
          }}
        />
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    subjects: state.lessonPlanReducer.subjects,
    subjectAndClassId: state.formReducer?.subjectAndClassId,
    classes: state.lessonPlanReducer.classes,
    teacherName: state.formReducer?.teacherName,
    subjectName: state.formReducer?.subjectName,
    className: state.formReducer?.className,
    semester: state.formReducer?.semester,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleShortDescription: (data) => dispatch(handleShortDescription(data)),
    handleFormChange: (key, value) => dispatch(handleFormChange(key, value)),
    getClassesBySubjectId: (id) => dispatch(getClassesBySubjectId(id)),
  };
};
export const SubjectAndClass = connect(
  mapStateToProps,
  mapDispatchToProps
)(SubjectAndClassComponent);
