import React, { useCallback, useState } from "react";
import { Comment } from "../Comment";
import "./ButtonComment.css";
import btnImage from "../../img/comment-with-bg-white.svg";
import btnImageGray from "../../img/comment-with-background.svg";
import { connect } from "react-redux";
import { resetComments } from "../../store/detailsLsnPlanAndProc/actions/resetComments";

export function ButtonCommentComponent(props) {
  const {
    resetComments,
    totalCommentCount,
    umID,
    typeId,
    isGrayIcon = false,
    className,
  } = props;

  const [showComments, setShowComments] = useState(false);
  const [commentCount, setCommentCount] = useState(totalCommentCount);

  const onShowHideComments = useCallback(
    (e) => {
      if (showComments) resetComments();
      setShowComments((prevState) => !prevState);
    },
    [showComments]
  );

  return (
    <>
      <div className={`comment ${className}`}>
        <div
          style={{ display: "flex" }}
          onClick={onShowHideComments}
          data-id={umID}
          data-type-id={typeId}
        >
          <button className="btn-comment">
            <img
              src={isGrayIcon ? btnImageGray : btnImage}
              alt="Comments"
              className="comment-icon"
            />
          </button>
          {commentCount ? (
            <div className="comment-notification">{commentCount}</div>
          ) : null}
        </div>
        {showComments ? (
          <Comment
            commentCount={commentCount}
            umID={umID}
            onShowHideComments={onShowHideComments}
            onChangeCommentCount={setCommentCount}
            typeId={typeId}
          />
        ) : null}
      </div>
    </>
  );
}

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    resetComments: () => dispatch(resetComments()),
  };
};

export const ButtonComment = connect(
  mapStateToProps,
  mapDispatchToProps
)(ButtonCommentComponent);
