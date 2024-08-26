import React, { useCallback, useMemo, useRef, useState } from "react";
import "./RepliedComments.css";
import ApiComments from "../../../../Api/ApiComments";
import { BodyReplyComment } from "./BodyReplyComment";
import momentWL from "moment-with-locales-es6";
import { RepliedCommentsForm } from "./RepliedCommentsForm";
import { connect } from "react-redux";
import { addReplyComment } from "../../../../store/detailsLsnPlanAndProc/actions/addReplyComment";
import {
  deleteComment,
  updateComment,
} from "../../../../store/detailsLsnPlanAndProc/actions";
import { TypesComment } from "../../../TypesComment";
import people from "../../../../img/people.svg";
import { replyTypes, ReplyType } from "../../../TypesComment/data";
import { useTranslation } from "react-i18next";

export function RepliedCommentsComponent(props) {
  const {
    comment,
    replyCommentId,
    onChangeReplyCommentId,
    lessonPlanId,
    typeId,
    userMethodId,
    addReplyComment,
    deleteComment,
    status,
    updateComment,
    imageName,
    userId,
    teacherId,
  } = props;

  const { t } = useTranslation();
  const [repliedComments, setRepliedComments] = useState(
    comment.repliedComment ? [comment.repliedComment] : []
  );
  const [replyText, setReplyText] = useState("");
  const [updateId, setUpdateId] = useState(0);
  const [highlightTypes, setHighlightTypes] = useState(false);
  const [selectedType, setSelectedType] = useState({});
  const inputRef = useRef(null);

  const handleChangeUpdatingId = useCallback(
    ({ commentText, editingCommentId }) => {
      setReplyText(commentText || "");
      setUpdateId(editingCommentId || 0);
    },
    []
  );

  const handleClickReplies = useCallback(async () => {
    try {
      const { data } = await ApiComments.getReplyComments(comment.Id);

      setRepliedComments(data.comments.reverse());
    } catch (e) {
      return e;
    }
  }, [comment.id]);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      e.stopPropagation();

      const commentText = replyText.trim();
      const selectedTypeText = selectedType?.typeText?.trim();
      if (!selectedType?.typeText && teacherId === userId)
        return setHighlightTypes(true);
      if (!commentText) return;

      if (
        (selectedType === ReplyType.disagree &&
          (commentText.indexOf(selectedTypeText.slice(0, -3)) !== 0 ||
            selectedTypeText.length + 3 > commentText.length)) ||
        !commentText.length
      )
        return;

      try {
        if (updateId) {
          updateComment({
            commentId: updateId,
            comment: commentText,
            isAuthorAgree: selectedType.typeValue,
          });

          if (status === "success") {
            setRepliedComments(
              repliedComments.map((com) => {
                return com.Id === updateId
                  ? {
                      ...com,
                      comment: commentText,
                    }
                  : com;
              })
            );
          }

          setReplyText("");
          setUpdateId(0);
          return;
        }

        const { data } = await ApiComments.addComment({
          isAuthorAgree: selectedType.typeValue,
          repliedToCommentId: comment.Id,
          isReplied: true,
          commentText: commentText,
          userMethodId,
          lessonPlanId,
          typeId,
        });

        if (status === "success") {
          setRepliedComments([
            ...repliedComments,
            {
              ...data,
              userId,
              Id: data.commentId,
              comment: replyText,
            },
          ]);
        }

        addReplyComment({
          lastReplyDate: data.insertedDate,
          commentId: comment.Id,
        });
      } catch (e) {
        return e;
      }

      onChangeReplyCommentId(0);
      setReplyText("");
    },
    [
      replyText,
      userMethodId,
      lessonPlanId,
      typeId,
      comment.Id,
      repliedComments,
      updateId,
      selectedType,
      teacherId,
      userId,
      ReplyType,
    ]
  );

  const handleDeleteReplyComment = useCallback(
    (commentId) => {
      deleteComment({ id: commentId, parentCommentId: comment.Id });
      if (status === "success") {
        setRepliedComments(
          repliedComments.filter((comment) => comment.Id !== commentId)
        );
      }
    },
    [repliedComments, status, comment.Id]
  );

  const handleCloseRepliedComments = useCallback((e) => {
    e.stopPropagation();
    setRepliedComments([]);
  }, []);

  const handleClickTypesItem = useCallback(
    (item) => {
      setSelectedType(item);
      setReplyText(`${item.typeText} `);
      inputRef.current.focus();

      if (highlightTypes) setHighlightTypes(false);
    },
    [highlightTypes]
  );

  const isDisabled = useMemo(() => {
    const commentText = replyText.trim();
    const selectedTypeText = selectedType?.typeText?.trim();

    if (!selectedType.typeText && replyText) {
      const defaultSelectedType = replyTypes.find((type) =>
        replyText.includes(type.typeText)
      );
      if (defaultSelectedType) setSelectedType(defaultSelectedType);
    }

    return (
      (selectedType === ReplyType.disagree &&
        (commentText.indexOf(selectedTypeText.slice(0, -3)) !== 0 ||
          selectedTypeText.length + 3 > commentText.length)) ||
      (!selectedType?.typename && teacherId === userId) ||
      !commentText.length
    );
  }, [replyText, selectedType]);

  return (
    <div className="comment_reply">
      {comment.replyCount >= 1 && !repliedComments.length ? (
        <div className="comment_reply_hidden" onClick={handleClickReplies}>
          <p className="comment_reply_count">
            {`${comment.replyCount} ${t("comment")}`}
          </p>
          <p className="comment_reply_date">
            {momentWL(comment.lastReplyDate).fromNow()}
          </p>
        </div>
      ) : null}
      {repliedComments.length ? (
        <>
          {repliedComments.map((tempComment) => (
            <BodyReplyComment
              key={tempComment.Id}
              comment={tempComment}
              onDeleteComment={handleDeleteReplyComment}
              onChangeUpdatingId={handleChangeUpdatingId}
            />
          ))}
          {!comment.repliedComment && (
            <button
              className="reply_close"
              onClick={handleCloseRepliedComments}
            >
              {t("Close")}
            </button>
          )}
        </>
      ) : null}
      {replyCommentId === comment.Id || updateId ? (
        <RepliedCommentsForm
          onReplyComment={handleSubmit}
          onChangeReplyText={setReplyText}
          onChangeReplyCommentId={onChangeReplyCommentId}
          replyText={replyText}
          inputRef={inputRef}
          isDisabled={isDisabled}
          selectedType={selectedType}
        >
          {teacherId === userId ? (
            <TypesComment
              onClickTypesItem={handleClickTypesItem}
              selectedType={selectedType}
              commentTypes={replyTypes}
              highlightTypes={highlightTypes}
            />
          ) : (
            <div className="user_avatar">
              <img
                className="user_avatar_img"
                alt="User"
                src={
                  imageName && imageName !== "undefined" && imageName !== "null"
                    ? "/files/" + userId + "/" + imageName
                    : people
                }
              />
            </div>
          )}
        </RepliedCommentsForm>
      ) : null}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    status: state.detailsLsnPlanAndProcReducer.status,
    imageName: state.formReducer.imageName,
    userId: state.formReducer.userId,
    teacherId: state.lessonPlanReducer.lessonPlanDetails.teacherId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addReplyComment: (params) => dispatch(addReplyComment(params)),
    deleteComment: (params) => dispatch(deleteComment(params)),
    updateComment: (params) => dispatch(updateComment(params)),
  };
};

export const RepliedComments = connect(
  mapStateToProps,
  mapDispatchToProps
)(RepliedCommentsComponent);
