import React, {useCallback, useState} from "react";
import {Comment} from "../../../../../components/Comment";
import "./ButtonComment.css";
import btnImage from '../../../../../img/ChatNew.svg';
import classNames from "classnames";

export function ButtonComment(props) {
    const {totalCommentCount, umID} = props;
    const [showComments, setShowComments] = useState(false);
    const [commentCount, setCommentCount] = useState(totalCommentCount);

    const onShowHideComments = useCallback(() => {
        setShowComments(prevState => !prevState);
    }, []);

    return (
        <>
            <div
                onClick={onShowHideComments}
                className={classNames(
                    'comment',
                    {border: commentCount > 0}
                )}
            >
                <button className="btn-comment">
                    <img src={btnImage} alt='Comments'/>
                </button>
            </div>
            {
                showComments ? (
                    <Comment
                        commentCount={commentCount}
                        umID={umID}
                        onShowHideComments={onShowHideComments}
                        onChangeCommentCount={setCommentCount}
                    />
                ) : null
            }
        </>
    )
}
