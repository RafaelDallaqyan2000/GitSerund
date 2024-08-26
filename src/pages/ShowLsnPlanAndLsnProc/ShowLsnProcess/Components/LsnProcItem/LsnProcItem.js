import "./lsnProcItemStyles.css";
import { ButtonComment } from "../../../../../components";
import { addTargetBlank } from "../../../../ChangeLessonProcess/ChangeLessonProcess";
import { ImagesModalNum } from "../ImagesModalNum/ImagesModalNum";
import { useDispatch } from "react-redux";
import { handleFormChange } from "../../../../../store";
import { useTranslation } from "react-i18next";

export function LsnProcItem({
  itemNumber,
  action,
  preview,
  handleModalClose,
  getParsedTime,
  imgModalId,
  setImgModalId,
  leaveComment,
  openId,
  allComments,
  actionIndex,
  seeMoreComments,
  saveComment,
  auto_grow,
  currentRowCount,
  setCurrentText,
  inputRef,
  arrowRef,
  top,
}) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const handleClickImage = (imageIndex) => {
    dispatch(handleFormChange("showImagesPopUp", true));
    dispatch(
      handleFormChange("selectedBlackboardImages", {
        ...action.files.procImages,
        imageIndex,
        itemNumber,
      })
    );
  };
  return (
    <div key={action.umId} className="lesson-proces-row">
      <div className="1 pdf_student_and_teacher_action_container lesson-plan-pdf-item">
        <div>
          <p className={"numbersInLessonPlan"}>{itemNumber}</p>
        </div>
        {action.studentAction ? (
          <div className="1.1 pdf_studentAction">
            <div className={"all_sections-student-description"}>
              {action.studentAction ? (
                <div className="sections-student-description">
                  <div className="imageDiv">
                    <img
                      src={require("../../../../../img/blackCrow.svg").default}
                      alt="hat"
                    />
                  </div>
                  <div className="clone-image-div" />
                  <p
                    dangerouslySetInnerHTML={{
                      __html: action.studentAction,
                    }}
                  />
                  <div className="comment-container-from-student">
                    {preview !== "preview" && !action.teacherAction && (
                      <ButtonComment
                        totalCommentCount={action.methodComCount}
                        umID={action.umId}
                      />
                    )}
                  </div>
                </div>
              ) : window.innerWidth > 1120 ? (
                <div style={{ width: "240px" }} />
              ) : null}
            </div>
            <div
              className="student-proc-desc"
              dangerouslySetInnerHTML={{
                __html: action.studentActionDesc,
              }}
            />
            <div
              className="process-text"
              dangerouslySetInnerHTML={{
                __html: action.studentText,
              }}
            />
          </div>
        ) : null}

        {action.teacherAction ? (
          <div
            className="1.2 student-action-container"
            style={{ marginLeft: action.studentAction ? "27px" : 0 }}
          >
            <div className="sections-teacher-description" id={action.umId}>
              <div className="clone-image-div" />
              <div className="imageDiv">
                <img
                  src={require("../../../../../img/whiteCrow.svg").default}
                />
              </div>
              <p
                style={{ display: "flex" }}
                dangerouslySetInnerHTML={{
                  __html: action.teacherAction,
                }}
                className="section-teacher-description-text"
              />
              {preview !== "preview" && (
                <ButtonComment
                  totalCommentCount={action.methodComCount}
                  umID={action.umId}
                />
              )}
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                marginLeft: "-5px",
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
        <div className="description-time">
          {action.duration ?? 0}
          {t("m")}
        </div>
      </div>
      {((action.guide && action.guide !== "<p><br></p>") ||
        action.files.guideFiles.files[0]) && (
        <div style={{ marginTop: "15px" }} className="za_image">
          <p className="clarifying-guiding-points">
            {t("Clarifications, guidelines")}
          </p>
          {action.files.guideFiles.files.map((e, i) => {
            let formatArr = e.split(".");
            let format = formatArr[formatArr.length - 1];
            return (
              <div className="fileDiv" key={i}>
                <img
                  className="file-icon"
                  src={
                    require(format === "pdf"
                      ? "../../../../../img/pdf--v1.png"
                      : "../../../../../img/icon_docx.png").default
                  }
                  alt="pdf"
                />
                <a target="_blank" href={action.files.guideFiles.urlPath + e}>
                  {e ?? ""}
                </a>
              </div>
            );
          })}
          <p
            className="proc-desc"
            style={{ paddingTop: "6px" }}
            dangerouslySetInnerHTML={{
              __html: addTargetBlank(action.guide),
            }}
          />
        </div>
      )}
      {action.pupilWorkPart ? (
        <div style={{ marginTop: "15px" }}>
          <p className="clarifying-guiding-points">{t("Learner material")}</p>
          <p
            className="proc-desc"
            style={{ paddingTop: "6px" }}
            dangerouslySetInnerHTML={{
              __html: action.pupilWorkPart,
            }}
          />
        </div>
      ) : null}

      {action.guide ||
      (action.teacherText && action.teacherText !== "<p><br></p>") ? (
        <>
          {action.teacherText && action.teacherText !== "<p><br></p>" && (
            <div className="process-text-two">
              <div className="2.2 " style={{ paddingLeft: "25px" }} />
              <p className="clarifying-guiding-points">
                {t("Content wording, questions, ideas, etc")}
              </p>
              <div
                className="child_two"
                style={{ paddingTop: "6px" }}
                dangerouslySetInnerHTML={{
                  __html: addTargetBlank(action.teacherText),
                }}
              />
            </div>
          )}

          {/*//Todo: will use to display pictures*/}
          {action.actionImagesPaths && action.actionImagesPaths[0] && (
            <ImagesModalNum
              actionImagesPaths={action.actionImagesPaths}
              imgModalId={imgModalId}
              setImgModalId={setImgModalId}
              actionId={action.umId}
              onClose={handleModalClose}
            />
          )}
        </>
      ) : (
        ""
      )}
      <div className="2" style={{ display: "flex" }}>
        <div className="2.1" style={{ width: "100%" }}>
          {action.files.procImages.files[0] ? (
            <div
              className="sections-student-description"
              style={{ marginTop: 16 }}
            >
              <div style={{ display: "flex", width: "100%" }}>
                <div className="imageDiv">
                  <img
                    src={require("../../../../../img/blackCrow.svg").default}
                    alt="board"
                  />
                </div>

                <div className={"clone-image-div"} />
                <p className="balckboard">{t("Whiteboard")}</p>
              </div>
            </div>
          ) : (
            <div style={{ width: "286px" }} />
          )}
          <div className="blackboard-img-container">
            {action.files.procImages.files.length
              ? action.files.procImages.files?.map((file, i) => (
                  <div onClick={() => handleClickImage(i)}>
                    <img
                      key={i}
                      src={`${action.files.procImages.urlPath}${file}`}
                      alt={file}
                      className="board"
                    />
                  </div>
                ))
              : ""}
          </div>
        </div>

        <div
          className="2.2"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
          }}
        >
          <div className="filesDiv">
            {action.files.teacherActionTextFiles?.files?.map((file, i) => {
              let formatArr = file.split(".");
              let format = formatArr[formatArr.length - 1];

              return (
                <div className="fileDiv" key={i}>
                  <img
                    className="file-icon"
                    src={
                      require(format === "pdf"
                        ? "../../../../../img/pdf--v1.png"
                        : "../../../../../img/icon_docx.png").default
                    }
                    alt="pdf"
                  />
                  <a
                    target={"_blank"}
                    href={`${action.files.teacherActionTextFiles.urlPath}${file}`}
                  >
                    {file}
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {
        <div>
          {leaveComment && openId === action.umId
            ? allComments?.map((c, i) => (
                <div key={i} className="comments">
                  <p className="p-text">{c.comment}</p>
                  <div style={{ display: "flex" }}>
                    <img
                      src={require("../../../../../img/pointer.svg").default}
                      className="pointer"
                    />
                    <p className="user-name">{c.userName}</p>
                    <img
                      src={require("../../../../../img/pointer2.svg").default}
                      className="pointer"
                    />
                    <p style={{ color: "#4A4A4A" }}>
                      {getParsedTime(c.insertedDate)}
                    </p>
                  </div>
                </div>
              ))
            : null}
        </div>
      }
      {openId === action.umId && action.methodComCount > currentRowCount ? (
        <p
          className="see-all"
          onClick={() => seeMoreComments(action, actionIndex)}
          style={{ paddingLeft: "29px" }}
        >
          {t("Show more")}({action.methodComCount - currentRowCount})
        </p>
      ) : null}
      {leaveComment && openId === action.umId ? (
        <form
          className="commentForm"
          onSubmit={() => saveComment(action, action.umId)}
        >
          <textarea
            className="textarea-comment"
            ref={inputRef}
            onInput={(e) => auto_grow(e)}
            onChange={(e) => setCurrentText(e.target.value)}
            placeholder={t("Add Comment")}
          />
          <img
            src={require("../../../../../img/send.svg").default}
            ref={arrowRef}
            style={{ top: `${top}px` }}
            onClick={() => saveComment(action, action.umId)}
            alt="send"
          />
        </form>
      ) : null}
    </div>
  );
}
