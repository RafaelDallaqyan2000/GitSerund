import React from 'react';
import {Link} from "react-router-dom";
import classnames from "classnames";
import './LessonPlanSidebarItem.css'

export function LessonPlanSidebarItem({
    onClick,
    hash,
    currentHash,
    filledStyle,
    text
}) {
    return (
        <Link
            to={`#${currentHash}`}
            onClick={(e) => {
                onClick(e, currentHash)
            }}
            className={classnames(
                'lesson_plan_sidebar_item',
                {activeNavItem: hash === `#${currentHash}`}
            )}
            style={{...filledStyle(currentHash)}}
        >
            {text}
        </Link>
    );
}
