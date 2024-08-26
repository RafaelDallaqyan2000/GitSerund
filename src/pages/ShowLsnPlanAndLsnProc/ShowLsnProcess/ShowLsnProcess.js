import "./ShowLsnProcess.css";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { connect } from "react-redux";
import {
  handleFormChange,
  fetchLessonPlanDetails,
  fetchHomeDetails,
  getComments,
} from "../../../store";
import { useParams } from "react-router";
import { ResponsivePdfLsnProcess, ShowImagesPopUp } from "../../../components";
import { LsnProcItem } from "./Components/LsnProcItem/LsnProcItem";
import { useTranslation } from "react-i18next";

function ShowLsnProcess({
  fullName,
  fetchHomeDetails,
  lessonPlanDetails,
  handleFormChange,
  getComment,
  allComments,
  showImagesPopUp,
  selectedBlackboardImages,
}) {
  const { t } = useTranslation();
  const [arry, setArry] = useState([]);
  const [currentRowCount, setCurrentRowCount] = useState(3);
  const inputRef = useRef();
  const arrowRef = useRef();
  const [leaveComment, setLeaveComment] = useState(false);
  const [openId, setOpenId] = useState();
  const [currentText, setCurrentText] = useState("");
  const { procId, preview } = useParams();
  const [imgModalId, setImgModalId] = useState(null);
  const [top, setTop] = useState(8);
  const [page, setPage] = useState(1);
  let number = 0;

  useEffect(() => {
    setArry(lessonPlanDetails);
  }, [lessonPlanDetails]);

  useEffect(() => {
    fetchHomeDetails();
  }, []);

  const saveComment = (item, id) => {
    let i = arry.findIndex((item) => item.umId === id);

    handleFormChange("typeId", 7);
    handleFormChange("comLessonPlanId", procId);
    handleFormChange("commentText", currentText);
    handleFormChange("userMethodId", id);

    var today = new Date();
    let time = today.getHours() + ":" + today.getMinutes();
    if (currentRowCount == 3 && allComments.length < 3) {
      let newArry = allComments;
      newArry.push({
        userName: fullName,
        comment: currentText,
        insertedDate: time,
      });
      handleFormChange("allComments", newArry);
    } else if (item.methodComCount <= currentRowCount) {
      let newArry = allComments;
      newArry.push({
        userName: fullName,
        comment: currentText,
        insertedDate: time,
      });
      handleFormChange("allComments", newArry);
    }

    const newArry = arry;
    newArry[i].methodComCount = parseInt(arry[i].methodComCount) + 1;
    setArry([...newArry]);
    inputRef.current.value = "";
  };

  const getParsedTime = (date) => {
    const d = new Date(date);
    return d.getHours() + ":" + d.getMinutes() === "NaN:NaN"
      ? date
      : d.getHours() + ":" + d.getMinutes();
  };

  const seeMoreComments = (item, index) => {
    getComment({
      lessonPlanId: parseInt(procId),
      typeId: 7,
      userMethodId: item.umId,
      rowCount: currentRowCount + 3,
      page: page,
    });

    setCurrentRowCount(currentRowCount + 3);
  };

  const auto_grow = (element) => {
    element.target.style.height = "40px";
    element.target.style.height = element.target.scrollHeight + "px";
  };

  const handleModalClose = useCallback(() => {
    handleFormChange("showImagesPopUp", false);
  }, []);

  return (
    <>
      <ShowImagesPopUp
        images={selectedBlackboardImages}
        open={showImagesPopUp}
        onClose={handleModalClose}
      />
      <div
        id="lsnProc_1"
        className="header-lesn-proc"
        style={{ textAlign: "center" }}
      >
        {t("Lesson scenario")}
      </div>
      {arry.process?.map((proc, i) => {
        return (
          <div
            key={proc.methodId + i}
            style={{ padding: "0 25px" }}
            className="lesson-process-item-container"
          >
            {proc.methodName && (
              <div className="lesson-process-methodName">{proc.methodName}</div>
            )}
            {proc.actions
              ?.filter((e) => e.teacherAction || e.studentAction)
              .map((action, ind) => {
                number++;
                return window.innerWidth <= 1120 ? (
                  <ResponsivePdfLsnProcess
                    actionStep={number}
                    actionMinute={action.duration}
                    action={action}
                  />
                ) : (
                  <LsnProcItem
                    action={action}
                    actionIndex={ind}
                    allComments={allComments}
                    arrowRef={arrowRef}
                    auto_grow={auto_grow}
                    currentRowCount={currentRowCount}
                    getParsedTime={getParsedTime}
                    handleModalClose={handleFormChange}
                    imgModalId={imgModalId}
                    inputRef={inputRef}
                    itemNumber={number}
                    leaveComment={leaveComment}
                    openId={openId}
                    preview={preview}
                    saveComment={saveComment}
                    seeMoreComments={seeMoreComments}
                    setCurrentText={setCurrentText}
                    setImgModalId={setImgModalId}
                    top={top}
                    key={action.id}
                  />
                );
              })}
          </div>
        );
      })}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    lessonPlanComment: state.detailsLsnPlanAndProcReducer.lessonPlanComment,
    fullName: state.homeReducer.details?.fullName,
    lessonPlanDetails: state.lessonPlanReducer.lessonPlanDetails,
    allComments: state.formReducer.allComments ?? [],
    showImagesPopUp: state.formReducer.showImagesPopUp ?? false,
    selectedBlackboardImages: state.formReducer.selectedBlackboardImages ?? [],
    files: state.lessonPlanReducer.files ?? [],
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    handleFormChange: (key, value) => dispatch(handleFormChange(key, value)),
    getComment: (obj) => dispatch(getComments(obj)),
    fetchLessonPlanDetails: () => dispatch(fetchLessonPlanDetails()),
    fetchHomeDetails: () => dispatch(fetchHomeDetails()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShowLsnProcess);
