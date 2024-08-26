import "./ResponsivePdfLsnProcess.css";
import React from "react";
import { useParams } from "react-router";
import { addTargetBlank } from "../../../pages/ChangeLessonProcess/ChangeLessonProcess";
import { ResponsivePdfLsnProcessCommentAndTime } from "../ResponsivePdfLsnProcessCommentAndTime/ResponsivePdfLsnProcessCommentAndTime";
import { useTranslation } from "react-i18next";

export function ResponsivePdfLsnProcess({ action, actionStep, actionMinute }) {
  const { t } = useTranslation();
  const { preview } = useParams();
  return (
    <div className="pdf-responsive-action-container">
      <ResponsivePdfLsnProcessCommentAndTime
        preview={preview}
        action={action}
        minute={actionMinute}
        step={actionStep}
      />
      <div style={{ padding: "8px" }}>
        {(action.studentAction || action.studentActionDesc) && (
          <div className="lesson-proces-row">
            {action.studentAction && (
              <div className="sections-student-description">
                <div className="imageDiv">
                  <img
                    src={require("../../../img/blackCrow.svg").default}
                    alt="hat"
                  />
                </div>
                <div className="clone-image-div" />
                {/* show if mobile responsive */}
                <p
                  dangerouslySetInnerHTML={{
                    __html: action.studentAction,
                  }}
                ></p>
              </div>
            )}
            {action.studentActionDesc ? (
              <div
                className="student-proc-desc"
                dangerouslySetInnerHTML={{
                  __html: action.studentActionDesc,
                }}
              />
            ) : null}
            <div
              className="process-text"
              dangerouslySetInnerHTML={{
                __html: action.studentText,
              }}
            />
          </div>
        )}
        {action.teacherAction ? (
          <div className="1.2 student-action-container">
            <div className="sections-teacher-description" id={action.umId}>
              <div className="clone-image-div" />{" "}
              {/* show if mobile responsive */}
              <div className="imageDiv">
                <img src={require("../../../img/whiteCrow.svg").default} />
              </div>
              <p
                style={{ display: "flex" }}
                dangerouslySetInnerHTML={{
                  __html: action.teacherAction,
                }}
                className="section-teacher-description-text"
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              <p
                className="proc-desc"
                dangerouslySetInnerHTML={{
                  __html: action.teacherActionDesc,
                }}
              />
            </div>
          </div>
        ) : null}

        {action.guide ? (
          <div className="za_image">
            <div>
              <p className="proc-desc-title">
                {t("Clarifications, guidelines")}
              </p>
              <p
                className="proc-desc"
                style={{ paddingTop: "4px" }}
                dangerouslySetInnerHTML={{
                  __html: addTargetBlank(action.guide),
                }}
              />
            </div>
          </div>
        ) : null}

        {action.pupilWorkPart ? (
          <div style={{ marginTop: 16 }}>
            <p className="proc-desc-title">{t("Learner material")}</p>
            <p
              className="proc-desc"
              style={{ paddingTop: "4px" }}
              dangerouslySetInnerHTML={{
                __html: addTargetBlank(action.pupilWorkPart),
              }}
            />
          </div>
        ) : null}

        {action.teacherText ? (
          <div className="process-text-two">
            <p
              className="2.2"
              style={
                window.innerWidth <= 1120
                  ? { marginTop: "10px" }
                  : { paddingLeft: "25px" }
              }
            />
            <p className="proc-desc-title">
              {t("Content wording, questions, ideas, etc")}
            </p>
            <div
              className="child_two"
              dangerouslySetInnerHTML={{
                __html: addTargetBlank(action.teacherText),
              }}
            />
          </div>
        ) : null}

        {action.files.procImages.files[0] && (
          <div className="lsn-plan-blackboard-image-container">
            <div className="lsn-plan-blackboard-image-title-container">
              <img src={require("../../../img/blackboard-icon.svg").default} />

              <p className="lsn-plan-blackboard-image-text">
                {t("Whiteboard")}
              </p>
            </div>
            <div className="lsn-plan-responsive-blackboard-container">
              {action.files.procImages.files?.map((file, i) => (
                <img
                  key={i}
                  src={`${action.files.procImages.urlPath}${file}`}
                  alt={file}
                  className="board-for-mobile"
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
