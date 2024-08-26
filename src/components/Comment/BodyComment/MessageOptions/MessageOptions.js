import React, { useRef } from "react";
import "./MessageOptions.css";
import replyComment from "../../img/reply-comment.svg";
import editComment from "../../img/edit-comment.svg";
import deleteComment from "../../img/delete-comment.svg";
import { useOutsideClick } from "../../../../hooks/useOutsideClick";
import { connect } from "react-redux";
import resolveComment from "../../img/resolve-comment.svg";
import { useTranslation } from "react-i18next";

const includeUserId = [2, 3, 4, 6];

function MessageOptionsComponent(props) {
  const {
    onClickReplay,
    onChangeUpdatingId,
    onDeleteComment,
    onOpenCloseOption,
    user,
    comment,
    commentType,
    onClickOptions,
    onResolveComment,
    userTypeId,
  } = props;

  const { t } = useTranslation();
  const optionsRef = useRef(null);

  useOutsideClick(optionsRef, onOpenCloseOption);

  return (
    <ul
      className="message_option_lists"
      ref={optionsRef}
      onClick={onClickOptions}
    >
      {onClickReplay ? (
        <li
          className="message_option"
          onClick={() => {
            onClickReplay(comment.Id);
          }}
        >
          <img src={replyComment} alt="Reply" className="message_option_icon" />
          <p className="message_option_text">{t("Answer")}</p>
        </li>
      ) : null}
      {comment.userId === user.userId ? (
        <>
          {onChangeUpdatingId ? (
            <li
              className="message_option"
              onClick={() => {
                onChangeUpdatingId({
                  commentType,
                  commentText: comment.comment,
                  editingCommentId: comment.Id,
                });
              }}
            >
              <img
                src={editComment}
                alt="Edit"
                className="message_option_icon"
              />
              <p className="message_option_text">{t("EdIt")}</p>
            </li>
          ) : null}
          {onDeleteComment ? (
            <li
              className="message_option del_option"
              onClick={() => onDeleteComment(comment.Id)}
            >
              <img
                src={deleteComment}
                alt="Delete"
                className="message_option_icon"
              />
              <p className="message_option_text">{t("Delete")}</p>
            </li>
          ) : null}
        </>
      ) : null}
      {includeUserId.includes(userTypeId) && user.userId !== comment.userId ? (
        <li
          className="message_option resolve"
          onClick={() => onResolveComment(comment.Id)}
        >
          <img
            src={resolveComment}
            alt="Resolve"
            className="message_option_icon"
          />
          <p className="message_option_text">{t("Solved")}</p>
        </li>
      ) : null}
    </ul>
  );
}

const mapStateToProps = (state) => {
  return {
    userTypeId: state.authReducer.typeId,
    user: state.authReducer.user,
  };
};

export const MessageOptions = connect(mapStateToProps)(MessageOptionsComponent);
