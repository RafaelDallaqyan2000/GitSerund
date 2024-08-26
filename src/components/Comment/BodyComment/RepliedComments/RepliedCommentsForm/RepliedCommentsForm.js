import React, { useCallback, useRef } from "react";
import forward from "../../../img/forward.svg";
import "./RepliedCommentsForm.css";
import { useOutsideClick } from "../../../../../hooks/useOutsideClick";
import { connect } from "react-redux";
import classNames from "classnames";
import { ReplyType } from "../../../../TypesComment/data";
import { useTranslation } from "react-i18next";

function RepliedCommentsFormComponent(props) {
  const {
    onReplyComment,
    replyText,
    onChangeReplyText,
    onChangeReplyCommentId,
    children,
    userId,
    teacherId,
    inputRef,
    isDisabled,
    selectedType,
  } = props;

  const { t } = useTranslation();
  const containerRef = useRef(null);

  const handleChange = useCallback(
    (newText) => {
      if (
        selectedType === ReplyType.disagree &&
        newText.indexOf(ReplyType.disagree.typeText.slice(0, -3)) !== 0
      )
        return;
      onChangeReplyText(newText.length > 200 ? newText.slice(0, 200) : newText);
    },
    [ReplyType, selectedType]
  );

  useOutsideClick(containerRef, () => {
    onChangeReplyCommentId(false);
  });

  return (
    <div
      ref={containerRef}
      className={classNames("comment_reply_form_container", {
        for_teacher: teacherId === userId,
      })}
    >
      {children}
      <form className="comment_reply_form" onSubmit={onReplyComment}>
        <input
          className="comment_reply_input"
          type="text"
          placeholder={t("Answer")}
          value={replyText}
          autoFocus={true}
          onChange={(e) => handleChange(e.target.value)}
          ref={inputRef}
        />
        <button
          type="submit"
          className={`comment_reply_btn ${isDisabled ? "submit_disabled" : ""}`}
        >
          <img src={forward} />
        </button>
      </form>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    userId: state.formReducer.userId,
    teacherId: state.lessonPlanReducer.lessonPlanDetails.teacherId,
  };
};

export const RepliedCommentsForm = connect(mapStateToProps)(
  RepliedCommentsFormComponent
);
