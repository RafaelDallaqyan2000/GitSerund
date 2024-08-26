import './UserComment.css';
import React from 'react';
import rightArrowIcon from '../../../../img/right-icon.svg';
import { shortText } from "../../../../helpers";

export function UserComment(props) {
    const {
        onClickComment = () => {},
        allowClick = false,
        comment,
        type,
    } = props;

    return (
        <div
            className='user_comment'
            onClick={() => onClickComment(comment)}
        >
            <p className="user_comment_text">{shortText(comment.comment, 90)}</p>
            {
                type && type.typename  ? (
                    <p
                        className="user_comment_type"
                        style={{background: type?.color || 'linear-gradient(74.09deg, rgb(251, 184, 107) 0%, rgb(227, 141, 42) 100%)'}}
                    >
                        {type?.typename || ''}
                    </p>
                ) : null
            }

            {
                allowClick && (
                    <div className="user_comment_arrow">
                        <img
                            src={rightArrowIcon}
                            alt="Right arrow"
                            className="user_comment_arrow_icon"
                        />
                    </div>
                )
            }
        </div>
    );
}
