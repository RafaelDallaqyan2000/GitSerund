import React, { useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  changeLessonDescription,
  handleFormChange,
  handleShortDescription,
} from "../../../../store";
import "./Helpers.css";
import { getLessonPlanTeachers } from "../../../../store/lessonPlan/actions/getLessonPlanTeachers";
import { getLessonPlanExperts } from "../../../../store/lessonPlan/actions/getLessonPlanExperts";
import { getLessonPlanResearcher } from "../../../../store/lessonPlan/actions/getLessonPlanResearcher";
import { fetchClassesSuccess } from "../../../../store/lessonPlan/actions/getClassesBySubjectId";
import { useParams } from "react-router-dom";
import { SelectWithSearchHOC } from "../../../../components";

function HelpersComponent({
  t,
  errorText,
  handleShortDescription,
  teacherName,
  expertName,
  researcherName,
  teachers,
  experts,
  researchers,
  loadingResearchers,
  loadingTeachers,
  loadingExperts,
  userTypeId,
  adminName,
  adminUserId,
  handleFormChange,
  fetchClassesSuccess,
  onScroll,
  fieldId,
  onChangeError,
  lessDescriptions,
  changeLessonDescription,
}) {
  const [disableTeacher, setDisableTeacher] = useState(false);
  const { lessonPlanId } = useParams();
  const [teacherNameOnBlur, setTeacherNameOnBlur] = useState("");
  const [expertNameOnBlur, setExpertNameOnBlur] = useState("");
  const [researcherNameOnBlur, setResearcherNameOnBlur] = useState("");

  useEffect(() => {
    if (userTypeId && userTypeId !== 4 && userTypeId !== 6) {
      setDisableTeacher(true);
    }

    if (
      (userTypeId === 2 || userTypeId === 1 || userTypeId === 3) &&
      !lessonPlanId
    ) {
      setDisableTeacher(true);
      handleFormChange("teacherName", adminName);
      handleFormChange("teacherId", adminUserId);

      handleShortDescription({
        id: "teacherId",
        index: 11,
        itemId: adminUserId,
        text: adminName,
      });
    }

    if (userTypeId === 3 && !lessonPlanId) {
      handleFormChange("expertName", expertName);
      handleFormChange("expertId", adminUserId);
      handleShortDescription({
        id: "expertId",
        index: 12,
        itemId: adminUserId,
        text: adminName,
      });
    } else if (userTypeId === 4 && !lessonPlanId) {
      handleFormChange("researcherName", adminName);
      handleFormChange("researcherId", adminUserId);
      handleShortDescription({
        id: "researcherId",
        index: 13,
        itemId: adminUserId,
        text: adminName,
      });
    }

    if (lessonPlanId) {
      setTeacherNameOnBlur(teacherName);
      setExpertNameOnBlur(expertName);
      setResearcherNameOnBlur(researcherName);
    }
  }, [adminName, teacherName]);

  const handleClickAuthorOption = useCallback(
    (author) => {
      handleFormChange("teacherName", author.fullName);
      handleFormChange("teacherId", author.id);

      handleFormChange("subjectName", "");
      handleFormChange("subjectForLsnPlan", 0);

      handleFormChange("class", "");
      handleFormChange("subjectAndClassId", 0);
      handleFormChange("className", "");

      handleFormChange("semester", 0);
      fetchClassesSuccess([]);

      setTeacherNameOnBlur(author.fullName);

      const removedSubjectAndClass = lessDescriptions.filter(
        (field) => field.id !== "subjectAndClassId"
      );
      changeLessonDescription(removedSubjectAndClass);

      onChangeError((prevState) => {
        return {
          ...prevState,
          [fieldId]: errorText ? "" : errorText,
        };
      });
    },
    [lessDescriptions]
  );

  const handleClickExpertOption = useCallback((expert) => {
    handleFormChange("expertName", expert.fullName);
    handleFormChange("expertId", expert.id);
    setExpertNameOnBlur(expert.fullName);
  }, []);

  const handleClickResearcherOption = useCallback((researcher) => {
    handleFormChange("researcherName", researcher.fullName);
    handleFormChange("researcherId", researcher.id);
    setResearcherNameOnBlur(researcher.fullName);
  }, []);

  return (
    <>
      <div className="title_container">
        <p className="title">{t("Assistants")}</p>
        {!!errorText && <p className="required_text">{errorText}</p>}
      </div>

      <div className="subject_classes_container">
        <div className="title_container">
          <SelectWithSearchHOC
            id="teacherId"
            label={t("Author")}
            placeholder={t("Search")}
            inputValue={teacherName}
            disabled={disableTeacher}
            onClick={() => getLessonPlanTeachers("")}
            inputStyle={{ cursor: !disableTeacher ? "pointer" : "default" }}
            errorMessage={errorText ? errorText : ""}
            onSelectScroll={(e) =>
              onScroll(e.target, getLessonPlanTeachers, teachers)
            }
            options={teachers}
            optionLabelKey="fullName"
            optionUniqueKey="id"
            loading={loadingTeachers}
            onOptionClick={handleClickAuthorOption}
            onFocus={(e) => {
              e.target.scrollIntoView({ behavior: "smooth", block: "center" });
            }}
            onChange={(e) => {
              getLessonPlanTeachers(e.target.value);
              handleFormChange("teacherName", e.target.value);
            }}
            onBlur={(e) => {
              if (e.target.value !== "")
                handleFormChange("teacherName", teacherNameOnBlur);
            }}
          />
        </div>

        <div className="title_container">
          <SelectWithSearchHOC
            id="expertId"
            label={t("Expert Teacher")}
            placeholder={t("Search")}
            inputValue={expertName}
            onClick={() => getLessonPlanExperts("")}
            inputStyle={{ cursor: "pointer" }}
            onSelectScroll={(e) =>
              onScroll(e.target, getLessonPlanExperts, experts)
            }
            optionLabelKey="fullName"
            optionUniqueKey="id"
            options={experts}
            onOptionClick={handleClickExpertOption}
            loading={loadingExperts}
            onFocus={(e) => {
              e.target.scrollIntoView({ behavior: "smooth", block: "center" });
            }}
            onChange={(e) => {
              getLessonPlanExperts(e.target.value);
              handleFormChange("expertName", e.target.value);
            }}
            onBlur={(e) => {
              if (e.target.value !== "") {
                handleFormChange("expertName", expertNameOnBlur);
              }
            }}
          />
        </div>

        <div className="title_container">
          <SelectWithSearchHOC
            optionLabelKey="fullName"
            optionUniqueKey="id"
            options={researchers}
            onOptionClick={handleClickResearcherOption}
            loading={loadingResearchers}
            id="researcherId"
            label={t("Researcher")}
            placeholder={t("Search")}
            inputValue={researcherName}
            onClick={() => getLessonPlanResearcher("")}
            inputStyle={{ cursor: "pointer" }}
            onSelectScroll={(e) =>
              onScroll(e.target, getLessonPlanResearcher, researchers)
            }
            onFocus={(e) => {
              e.target.scrollIntoView({ behavior: "smooth", block: "center" });
            }}
            onChange={(e) => {
              getLessonPlanResearcher(e.target.value);
              handleFormChange("researcherName", e.target.value);
            }}
            onBlur={(e) => {
              if (e.target.value !== "") {
                handleFormChange("researcherName", researcherNameOnBlur);
              }
            }}
          />
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    lessDescriptions: state.lessonPlanReducer.lessDescriptions,
    teacherName: state.formReducer?.teacherName,
    teacherId: state.formReducer?.teacherId,
    expertName: state.formReducer?.expertName,
    researcherName: state.formReducer?.researcherName,
    researchers: state.formReducer?.researchers,
    teachers: state.formReducer?.teachers,
    experts: state.formReducer?.experts,
    userTypeId: state.authReducer.typeId,
    adminUserId: state.formReducer.userId,
    adminName: state.formReducer.fullName,
    loadingResearchers: state.formReducer.loadingResearchers,
    loadingTeachers: state.formReducer.loadingTeachers,
    loadingExperts: state.formReducer.loadingExperts,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleShortDescription: (data) => dispatch(handleShortDescription(data)),
    handleFormChange: (key, value) => dispatch(handleFormChange(key, value)),
    fetchClassesSuccess: (arr) => dispatch(fetchClassesSuccess(arr)),
    changeLessonDescription: (arr) => dispatch(changeLessonDescription(arr)),
  };
};

export const Helpers = connect(
  mapStateToProps,
  mapDispatchToProps
)(HelpersComponent);
