import React, { useCallback, useEffect } from "react";
import "./LessonPlanDescription.css";
import { addTargetBlank } from "../../../../ChangeLessonProcess/ChangeLessonProcess";
import { ButtonComment } from "../../../../../components/ButtonComment";
import store, { handleLsnPlanAndLsnProcChange } from "../../../../../store";
import { useNavigate, useParams } from "react-router-dom";
import { MobileResponsiveLsnPlan } from "../../../../../components/MobileResponsiveLsnPlan/MobileResponsiveLsnPlan";
import { useTranslation } from "react-i18next";

export function LessonPlanDescription({
  typeId,
  title,
  description,
  files,
  rowIndex,
  commentCount,
  authorId,
  canViewProfile,
  lessonPlan,
}) {
  const { t } = useTranslation();
  const params = useParams();
  const navigate = useNavigate();
  const { preview } = params;
  const exceptTitles = [
    t("Author"),
    t("Expert"),
    t("Researcher"),
    t("Expert and researcher"),
    t("Subject"),
    t("Topic"),
    t("Grade and Semester"),
  ];

  useEffect(() => {
    if (title === t("Topic")) {
      store.dispatch(handleLsnPlanAndLsnProcChange("topicOnPdf", description));
    } else if (title === t("Grade and Semester")) {
      store.dispatch(
        handleLsnPlanAndLsnProcChange("classAndSemesterOnPdf", description)
      );
    } else if (title === t("Subject")) {
      store.dispatch(
        handleLsnPlanAndLsnProcChange("subjectOnPdf", description)
      );
    }
  }, []);

  let format = "";
  let formatArr = [];

  const handleClickAuthor = useCallback(() => {
    if (title === t("Author") && canViewProfile) {
      navigate(`/user-profile/${authorId}`);
    }
  }, [title, authorId, canViewProfile]);

  return (
    <div className="lesson-plan-row">
      {window.innerWidth <= 1120 ? (
        <MobileResponsiveLsnPlan
          typeId={typeId}
          lsnPlanItem={lessonPlan}
          commentCount={commentCount}
        />
      ) : (
        <>
          {/* <div className="lesson-plan-description-title"> */}
          <p className="lesson-plan-description-title">{title}</p>
          {/* </div> */}
          <div className="lesson-plan-row-body">
            <div style={{ height: "100%", width: "100%" }}>
              {Array.isArray(description) ? (
                <div className="lesson-plan-description">
                  {description.map((desc, i) => {
                    return (
                      <div key={desc.name}>
                        <div
                          className="lesson-plan-description"
                          style={{ border: 0, padding: "20px 0" }}
                          key={desc.name}
                          // dangerouslySetInnerHTML={{ __html: desc.desc }}
                        >
                          <p>
                            {desc.name}
                            <span
                              className="descName"
                              style={{ fontWeight: "400" }}
                              dangerouslySetInnerHTML={{
                                __html: addTargetBlank(desc.desc),
                              }}
                            />
                          </p>
                        </div>
                        <div className="descFilesDiv">
                          {files[i].fileNames.length
                            ? files[i].fileNames.map((fileName) => {
                                formatArr = fileName.split(".");
                                format = formatArr[formatArr.length - 1];
                                return (
                                  <div key={`${fileName} ${i}`}>
                                    <img
                                      className="file-icon"
                                      src={
                                        require(format === "pdf"
                                          ? "../../../../../img/pdf--v1.png"
                                          : "../../../../../img/icon_docx.png")
                                          .default
                                      }
                                      alt="pdf"
                                    />
                                    <a
                                      target="_blank"
                                      href={`${files[i].urlPath}${fileName}`}
                                    >
                                      {fileName}
                                    </a>
                                  </div>
                                );
                              })
                            : ""}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <>
                  <div className="lesson-plan-description">
                    <p
                      className={rowIndex < 4 ? "" : "description-text"}
                      dangerouslySetInnerHTML={{
                        __html: addTargetBlank(description),
                      }}
                      title={title === t("Author") && t("Visit the author")}
                      style={title === t("Author") ? { cursor: "pointer" } : {}}
                      onClick={handleClickAuthor}
                    />
                  </div>
                  <div className="descFilesDiv">
                    {files?.fileNames?.length > 0
                      ? files?.fileNames?.map((fileName, index) => {
                          formatArr = fileName?.split(".");
                          format = formatArr[formatArr.length - 1];
                          return (
                            <div
                              key={index}
                              style={{ padding: "15px 0 15px 40px" }}
                            >
                              <img
                                className="file-icon"
                                src={
                                  require(format === "pdf"
                                    ? "../../../../../img/pdf--v1.png"
                                    : "../../../../../img/icon_docx.png")
                                    .default
                                }
                                alt="pdf"
                              />
                              <a
                                target="_blank"
                                href={`${files.urlPath}${fileName}`}
                              >
                                {fileName}
                              </a>
                            </div>
                          );
                        })
                      : null}
                  </div>
                </>
              )}
            </div>
            {!exceptTitles.includes(title) && preview !== "preview" ? (
              <ButtonComment
                isGrayIcon={true}
                typeId={typeId}
                totalCommentCount={commentCount}
              />
            ) : null}
          </div>
        </>
      )}
    </div>
  );
}
