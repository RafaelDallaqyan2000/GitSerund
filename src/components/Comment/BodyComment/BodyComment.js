import React, { useCallback, useEffect, useMemo, useState } from "react";
import { MessageOptions } from "./MessageOptions";
import people from "../../../img/people.svg";
import options from "../../../img/Element.svg";
import "./BodyComment.css";
import momentWL from "moment-with-locales-es6";
import classnames from "classnames";
import { useTranslation } from "react-i18next";

export function BodyComment(props) {
  let {
    comment,
    children,
    commentType,
    onClickReply,
    onDeleteComment,
    onResolveComment,
    onChangeUpdatingId,
    onClickComment,
    hasTopBorder,
  } = props;
  const {i18n} = useTranslation()
  const [isOpenOption, setIsOpenOption] = useState(false);

  const handleOpenCloseOption = useCallback(() => {
    setIsOpenOption((prevState) => !prevState);
  }, []);

  const handleClickOptions = useCallback((e) => {
    e.stopPropagation();
    setIsOpenOption(false);
  }, []);

  const hasOptions = useMemo(() => {
    return (
      onChangeUpdatingId || onDeleteComment || onClickReply || onResolveComment
    );
  }, []);


  return (
    <div
      className={classnames("comment_body", { border: hasTopBorder })}
      onClick={() => {
        if (onClickComment) onClickComment(comment);
      }}
    >
      <div className="comment_avatar">
        <img
          className="comment_avatar_img"
          alt={comment.imageName || "Person"}
          src={
            comment.imageName &&
            comment.imageName !== "undefined" &&
            comment.imageName !== "null"
              ? "/files/" + comment.userId + "/" + comment.imageName
              : people
          }
        />
      </div>
      <div className="comment_body_container">
        <div className="comment_body_header">
          <div className="comment_body_name_date_container">
            <p className="comment_body_name">{comment?.userName || ""}</p>
            <span className="comment_body_date">
              {momentWL(comment.insertedDate).format("ll")}
            </span>
          </div>
          {hasOptions && (
            <div
              className={classnames("option", { open: isOpenOption })}
              onClick={handleOpenCloseOption}
            >
              <img src={options} alt="..." />
              {isOpenOption && (
                <MessageOptions
                  onClickReplay={onClickReply}
                  onChangeUpdatingId={onChangeUpdatingId}
                  onDeleteComment={onDeleteComment}
                  onResolveComment={onResolveComment}
                  onOpenCloseOption={handleOpenCloseOption}
                  onClickOptions={handleClickOptions}
                  comment={comment}
                  commentType={commentType}
                />
              )}
            </div>
          )}
        </div>
        <div
          className="comment_type_container"
          style={{ background: commentType?.color }}
        >
          <p className="comment_type">{commentType?.typename}</p>
        </div>
        <div className="comment_text_container">
          <p className="comment_text">{comment?.comment || ""}</p>
        </div>
      </div>
      {children}
    </div>
  );
}
