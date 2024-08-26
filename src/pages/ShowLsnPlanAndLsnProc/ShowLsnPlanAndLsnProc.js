import "./ShowLsnPlanAndLsnProc.css";
import React, { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  showChangePage,
  showLessonPlanCreate,
  fetchLessonPlanDetails,
  handleFormChange,
} from "../../store";
import Header from "./Header/Header";
import { connect } from "react-redux";
import ShowLsnPlan from "./ShowLsnPlan/ShowLsnPlan";
import ShowLsnProcess from "./ShowLsnProcess/ShowLsnProcess";
import { useParams } from "react-router";
import { AsideComment } from "./AsideComment";
import { scrollAndClickElement, parseURLSearch } from "../../helpers";
import {
  getCommentFromNotificationsRequest
} from "../../store/detailsLsnPlanAndProc/actions/getCommentFromNotificationsRequest";
import { resetComments } from "../../store/detailsLsnPlanAndProc/actions/resetComments";

function ShowLsnPlanAndLsnProc({
  showChangePage,
  showCreate,
  fetchLessonPlanDetails,
  handleFormChange,
  commentCount,
  getCommentFromNotificationsRequest,
    lessonPlanDetails
}) {
  const [isLiked, setIsLiked] = useState(false );
  const [showAsideComments, setSowAsideComments] = useState(false);
  const { procId } = useParams();
  const location = useLocation();
  const {commentId, umId, typeId} = parseURLSearch(location.search);

  const handleOpenCloseAsideComments = useCallback(() => {
    setSowAsideComments(!showAsideComments);
  }, [showAsideComments]);

  useEffect(() => {
    setIsLiked(lessonPlanDetails.isLiked)
  }, [lessonPlanDetails.isLiked])


  useEffect(async () => {
    showChangePage(true);
    showCreate(true);
    handleFormChange("lessonProcId", procId);
    await fetchLessonPlanDetails();

    if(commentId && (typeId || umId)) {
      getCommentFromNotificationsRequest(commentId);

      setTimeout(() => {
        const selector = umId ? `[data-id="${umId}"]` : `[data-type-id="${typeId}"]`;
        scrollAndClickElement(selector);
      }, 0);
    }
  }, []);

  const ref = React.createRef();

  return (
    <div style={{ background: "aliceblue" }}>
      <div className='show-lesson-plan-container' >
        <div ref={ref}>
          <Header
            like={isLiked}
            setIsLike={setIsLiked}
            onOpenCloseAsideComments={setSowAsideComments}
            hasComment={commentCount > 0}
          />
          <ShowLsnPlan />
          <ShowLsnProcess like={isLiked} />
        </div>
      </div>
      {showAsideComments ? (
        <AsideComment
          onOpenCloseAsideComments={handleOpenCloseAsideComments}
          lessonPlanId={procId}
        />
      ) : null}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    commentCount: state.lessonPlanReducer.commentCount,
    lessonPlanDetails: state.lessonPlanReducer.lessonPlanDetails,

  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    showCreate: (show) => dispatch(showLessonPlanCreate(show)),
    showChangePage: (show) => dispatch(showChangePage(show)),
    fetchLessonPlanDetails: () => dispatch(fetchLessonPlanDetails()),
    handleFormChange: (key, value) => dispatch(handleFormChange(key, value)),
    resetComments: () => dispatch(resetComments()),
    getCommentFromNotificationsRequest: (commentId) => dispatch(getCommentFromNotificationsRequest(commentId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShowLsnPlanAndLsnProc);
