import "./ShowLsnPlan.css";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  handleFormChange,
  fetchLessonPlanDetails,
  fetchHomeDetails,
} from "../../../store";
import { LessonPlanDescription } from "./components";
import { getCommentTypesOfLocation } from "../../../store/detailsLsnPlanAndProc/actions/getCommentTypesOfLocation";
import { useTranslation } from "react-i18next";

function ShowLsnPlan({
  lessonPlanDetails,
  getCommentTypesOfLocation,
  commentTypesOfLocation,
}) {
  const { t } = useTranslation();
  const [arry, setArry] = useState([]);

  useEffect(() => {
    getCommentTypesOfLocation();
  }, []);

  useEffect(() => {
    if (lessonPlanDetails && lessonPlanDetails.topic) {
      const newArry = [];
      newArry.push({
        id: "fullName",
        desc: lessonPlanDetails.teacherName,
        name: t("Author"),
        comCount: 0,
        currentCount: 3,
        files: { fileNames: [], urlPath: "" },
      });
      if (lessonPlanDetails.expertName || lessonPlanDetails.researcherName) {
        newArry.push({
          id: "expertAndResearcher",

          desc:
            lessonPlanDetails.expertName && !lessonPlanDetails.researcherName
              ? lessonPlanDetails.expertName
              : lessonPlanDetails.researcherName &&
                !lessonPlanDetails.expertName
              ? lessonPlanDetails.researcherName
              : lessonPlanDetails.researcherName && lessonPlanDetails.expertName
              ? `${lessonPlanDetails.expertName} / ${lessonPlanDetails.researcherName}`
              : "",

          name:
            lessonPlanDetails.expertName && !lessonPlanDetails.researcherName
              ? t("Expert")
              : lessonPlanDetails.researcherName &&
                !lessonPlanDetails.expertName
              ? t("Researcher")
              : t("Expert and researcher"),

          comCount: 0,
          currentCount: 3,
          files: { fileNames: [], urlPath: "" },
        });
      }
      newArry.push({
        id: "subjectName",
        desc: lessonPlanDetails.subjectName,
        name: t("Subject"),
        comCount: 0,
        currentCount: 3,
        files: { fileNames: [], urlPath: "" },
      });
      newArry.push({
        id: "fullName",
        desc:
          lessonPlanDetails.class === "Այլ"
            ? lessonPlanDetails.semester === 1
              ? `${t("Other")} ${t("grade")} / ${t("first semester")}`
              : lessonPlanDetails.semester === 2
              ? `${t("Other")} ${t("grade")} / ${t("second semester")}`
              : `${t("Other")} ${t("grade")}`
            : lessonPlanDetails.class === 1
            ? lessonPlanDetails.semester === 1
              ? `${lessonPlanDetails.class}${t("st")} ${t("grade")} / ${t(
                  "first semester"
                )}`
              : lessonPlanDetails.semester === 2
              ? `${lessonPlanDetails.class} ${t("grade")} / ${t(
                  "second semester"
                )}`
              : `${lessonPlanDetails.class} ${t("th")} ${t("grade")}`
            : lessonPlanDetails.semester === 1
            ? `${lessonPlanDetails.class} ${t("th")} ${t("grade")} / ${t(
                "first semester"
              )}`
            : lessonPlanDetails.semester === 2
            ? `${lessonPlanDetails.class} ${t("grade")} / ${t(
                "second semester"
              )}`
            : `${lessonPlanDetails.class} ${t("th")} ${t("grade")}`,
        name: t("Grade and Semester"),
        comCount: 0,
        currentCount: 3,
        files: { fileNames: [], urlPath: "" },
      });
      newArry.push({
        id: "Topic",
        desc: lessonPlanDetails.topic,
        name: t("Topic"),
        comCount: lessonPlanDetails.topicComCount,
        currentCount: 3,
        files: { fileNames: [], urlPath: "" },
      });
      newArry.push({
        id: "UsedMaterialsDescription",
        desc: lessonPlanDetails.usedMaterialsDescription,
        name: t("Used materials"),
        comCount: +lessonPlanDetails.usedMaterialsDescriptionCom,
        currentCount: 3,
        files: lessonPlanDetails.materialsUsedFiles,
      });
      newArry.push({
        id: "Purpose",
        desc: lessonPlanDetails.purpose,
        name: t("Lesson objectives"),
        comCount: +lessonPlanDetails.purposeCom,
        currentCount: 3,
        files: lessonPlanDetails.purposeFiles,
      });
      newArry.push({
        id: "Goal",
        desc: [
          {
            name: t("Students already know"),
            desc: lessonPlanDetails.goalPart1,
          },
          {
            name: t("Students in this lesson will find out"),
            desc: lessonPlanDetails.goalPart2,
          },
          {
            name: t(
              "Students will use the knowledge of today's lesson in the next lessons"
            ),
            desc: lessonPlanDetails.goalPart3,
          },
          {
            name: t(
              "The topic of this lesson relates to real life in the following way"
            ),
            desc: lessonPlanDetails.goalPart4,
          },
        ],
        name: t("Lesson extended picture"),
        comCount: +lessonPlanDetails.goalCom,
        currentCount: 3,
        files: [
          lessonPlanDetails.goalPart1Files,
          lessonPlanDetails.goalPart2Files,
          lessonPlanDetails.goalPart3Files,
          lessonPlanDetails.goalPart4Files,
        ],
      });
      newArry.push({
        id: "EndResult",
        desc: lessonPlanDetails.endResult,
        name: t("Learning outcomes"),
        comCount: +lessonPlanDetails.endResultCom,
        currentCount: 3,
        files: lessonPlanDetails.finalResultsFiles,
      });
      newArry.push({
        id: "Terms",
        desc: lessonPlanDetails.terms,
        name: t("Terminology"),
        comCount: +lessonPlanDetails.termsCom,
        currentCount: 3,
        files: lessonPlanDetails.termsFiles,
      });
      newArry.push({
        id: "Homework",
        desc: lessonPlanDetails.homeWork,
        name: t("Homework"),
        comCount: +lessonPlanDetails.homeworkCom,
        currentCount: 3,
        files: lessonPlanDetails.homeWorkFiles,
      });
      newArry.push({
        id: "BlackBoard",
        desc: lessonPlanDetails.blackBoard,
        name: t("Whiteboard"),
        comCount: +lessonPlanDetails.blackBoardCom,
        currentCount: 3,
        files: lessonPlanDetails.blackBoardFiles,
      });
      setArry(newArry);
    }
  }, [lessonPlanDetails]);
  return (
    <>
      <div id={"lsnPlan_1"} />
      <div className="lesson-plan-div">
        <img
          className="logo if-mobile-display-none"
          src={require("../../../img/Logo_gray.svg").default}
          alt="logo"
        />
        {commentTypesOfLocation && commentTypesOfLocation.length ? (
          <div className="responsive-lsn-plan-items">
            {arry.map((lessonPlan, i) => {
              const type = commentTypesOfLocation.find(
                (tempType) => tempType.name === lessonPlan.id
              );
              return (
                <LessonPlanDescription
                  authorId={lessonPlanDetails.teacherId}
                  canViewProfile={lessonPlanDetails.canViewProfile}
                  typeId={type?.id}
                  rowIndex={i}
                  key={lessonPlan.name + lessonPlan.id}
                  title={lessonPlan.name}
                  description={lessonPlan.desc}
                  files={lessonPlan.files}
                  commentTypesOfLocation={commentTypesOfLocation}
                  commentCount={lessonPlan.comCount}
                  lessonPlan={lessonPlan}
                />
              );
            })}
          </div>
        ) : null}
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    lessonPlanDetails: state.lessonPlanReducer.lessonPlanDetails,
    files: state.lessonPlanReducer.files ?? [],
    allComments: state.formReducer.allComments ?? [],
    fullName: state.homeReducer.details?.fullName,
    commentTypesOfLocation:
      state.detailsLsnPlanAndProcReducer.commentTypesOfLocation,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleFormChange: (key, value) => dispatch(handleFormChange(key, value)),
    fetchLessonPlanDetails: () => dispatch(fetchLessonPlanDetails()),
    fetchHomeDetails: () => dispatch(fetchHomeDetails()),
    getCommentTypesOfLocation: () => dispatch(getCommentTypesOfLocation()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShowLsnPlan);
