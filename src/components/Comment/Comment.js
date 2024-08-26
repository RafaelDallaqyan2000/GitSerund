import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import "./Comment.css";
import { CommentForm } from "./CommentForm";
import { HeaderComment } from "./HeaderComment";
import { connect } from "react-redux";
import {
  addNewComment,
  deleteComment,
  getCommentList,
  getCommentTypes,
  resolveComment,
  updateComment,
} from "../../store/detailsLsnPlanAndProc/actions";
import { BodyComment } from "./BodyComment";
import { useParams } from "react-router-dom";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import { RepliedComments } from "./BodyComment/RepliedComments";

function CommentComponent(props) {
  const {
    umID,
    commentCount,
    onChangeCommentCount,
    commentTypes,
    comments,
    onShowHideComments,
    adminTypeId,
    user,
    userId,
    getCommentTypes,
    getCommentList,
    updateComment,
    addNewComment,
    deleteComment,
    resolveComment,
    page,
    typeId = 7,
  } = props;

  const rowCount = 5;
  const params = useParams();
  const commentContainerRef = useRef();
  const [replyCommentId, setReplyCommentId] = useState(0);
  const [values, setValues] = useState({
    editingCommentId: 0,
    inputVal: "",
    selectedType: {},
  });

  useEffect(() => {
    getCommentList({
      userMethodId: umID,
      lessonPlanId,
      rowCount,
      typeId,
      page,
    });
  }, [page]);

  useEffect(() => {
    getCommentTypes();
  }, []);

  useOutsideClick(commentContainerRef, () => {
    onShowHideComments();
  });

  const lessonPlanId = useMemo(() => {
    if (params.procId) return params.procId;
  }, [params]);

  const handleChangeValues = useCallback(
    (newValues) => {
      setValues({
        ...values,
        ...newValues,
      });
    },
    [values]
  );

  const handleClickTypesItem = useCallback(
    (item) => {
      handleChangeValues({
        selectedType: item,
        inputVal: values.inputVal,
      });
    },
    [values]
  );

  const handleSubmit = useCallback(() => {
    if (values.editingCommentId) {
      updateComment({
        commentId: values.editingCommentId,
        comment: values.inputVal,
        commentTypeId: values.selectedType.id,
      });

      handleChangeValues({
        editingCommentId: 0,
        inputVal: "",
        selectedType: {},
      });

      return;
    }

    addNewComment({
      lessonPlanId: lessonPlanId,
      commentText: values.inputVal,
      userMethodId: umID,
      commentTypeId: values.selectedType.id,
      isReplied: !!values.repliedToCommentId,
      repliedToCommentId: values.repliedToCommentId,
      typeId,
      rowCount,
      userId,
    });

    handleChangeValues({
      repliedToCommentId: null,
      inputVal: "",
      selectedType: "",
    });

    onChangeCommentCount((prevState) => prevState + 1);
  }, [lessonPlanId, umID, rowCount, values]);

  const handleClickReplay = useCallback((commentId) => {
    setReplyCommentId(commentId);
  }, []);

  const handleChangeUpdatingId = useCallback(
    ({commentType, commentText, editingCommentId}) => {
      handleChangeValues({
        selectedType: commentType,
        inputVal: commentText,
        editingCommentId: editingCommentId,
      });
    },
    []
  );

  const handleDeleteComment = useCallback((commentId) => {
    deleteComment({id: commentId});
    onChangeCommentCount((prevState) => prevState - 1);
  }, []);

  const handleResolveComment = useCallback((commentId) => {
    resolveComment(commentId, +lessonPlanId);
  }, [lessonPlanId]);

  return commentTypes?.length ? (
    <div ref={commentContainerRef} className="comment_container">
      <HeaderComment
        commentCount={commentCount}
        onPageChange={handleChangeValues}
        onCloseCommentModal={onShowHideComments}
        rowCount={rowCount}
      />
      {comments.map(comment => (
              <BodyComment
                  key={comment.Id}
                  comment={comment}
                  onClickReply={handleClickReplay}
                  onChangeUpdatingId={handleChangeUpdatingId}
                  onDeleteComment={handleDeleteComment}
                  onResolveComment={handleResolveComment}
                  hasTopBorder={false}
                  commentType={commentTypes.find(
                      (type) => type.id === comment.commentTypeId
                  )}
              >
                <RepliedComments
                    comment={comment}
                    lessonPlanId={lessonPlanId}
                    typeId={typeId}
                    userMethodId={umID}
                    replyCommentId={replyCommentId}
                    onChangeReplyCommentId={setReplyCommentId}
                    onChangeUpdatingId={handleChangeUpdatingId}
                />
              </BodyComment>
      ))}
      <CommentForm
        commentTypes={commentTypes}
        onChangeValues={handleChangeValues}
        values={values}
        onSubmit={handleSubmit}
        onClickTypesItem={handleClickTypesItem}
      />
    </div>
  ) : null;
}

const mapStateToProps = (state) => {
  return {
    commentTypes: state.detailsLsnPlanAndProcReducer.commentTypes,
    comments: state.detailsLsnPlanAndProcReducer.comments,
    adminTypeId: state.authReducer.typeId,
    user: state.authReducer.user,
    userId: state.formReducer.userId,
    page: state.detailsLsnPlanAndProcReducer.tempPage,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCommentTypes: () => dispatch(getCommentTypes()),
    getCommentList: (params) => dispatch(getCommentList(params)),
    addNewComment: (params) => dispatch(addNewComment(params)),
    updateComment: (params) => dispatch(updateComment(params)),
    deleteComment: (params) => dispatch(deleteComment(params)),
    resolveComment: (commentId, lessonPlanId) => dispatch(resolveComment(commentId, lessonPlanId)),
  };
};

export const Comment = connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentComponent);
