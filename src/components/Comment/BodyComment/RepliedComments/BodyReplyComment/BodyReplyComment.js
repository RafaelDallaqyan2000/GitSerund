import React, {useCallback, useMemo, useState} from 'react';
import people from "../../../../../img/people.svg";
import './BodyReplyComment.css';
import momentWL from "moment-with-locales-es6";
import classnames from "classnames";
import options from "../../../../../img/Element.svg";
import {MessageOptions} from "../../MessageOptions";

export function BodyReplyComment(props) {
    const {
        comment,
        onDeleteComment,
        onChangeUpdatingId,
    } = props;
    const [isOpenOption, setIsOpenOption] = useState(false);

    const handleOpenCloseOption = useCallback(() => {
        setIsOpenOption((prevState) => !prevState);
    }, []);

    const hasOptions = useMemo(() => {
        return ( onChangeUpdatingId || onDeleteComment );
    }, []);

    const handleClickOptions = useCallback((e) => {
        e.stopPropagation();
        setIsOpenOption(false);
    }, []);

    return (
        <div className="body_reply_comment">
            <div className="avatar_reply_comment">
                <img
                    className='avatar_reply_comment_img'
                    alt={comment.imageName || 'People'}
                    src={
                        (comment.imageName && (comment.imageName !== "undefined") && (comment.imageName !== "null"))
                            ? ("/files/" + comment.userId + "/" + comment.imageName) : people
                    }
                />
            </div>
            <div className="body_reply_container">
                <div className="reply_inner">
                    <div className="reply_name_date_container">
                        <p className="reply_name">
                            {comment.userName}
                        </p>
                        <span className="reply_date">
                        {momentWL(comment.insertedDate).format('ll')}
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
                                    onChangeUpdatingId={onChangeUpdatingId}
                                    onDeleteComment={onDeleteComment}
                                    onOpenCloseOption={handleOpenCloseOption}
                                    onClickOptions={handleClickOptions}
                                    comment={comment}
                                />
                            )}
                        </div>
                    )}
                </div>
                <div className="reply_text_container">
                    <p className="reply_text">
                        {comment.comment}
                    </p>
                </div>
            </div>
        </div>
    );
}
