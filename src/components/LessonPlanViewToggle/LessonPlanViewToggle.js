import React from 'react';
import toggleCardIcon from "../../img/toggleCard.svg";
import toggleTableIcon from "../../img/toggleTable.svg";
import './LessonPlanViewToggle.css';

export function LessonPlanViewToggle(props) {
    const {
        lsnPlanToggleCard,
        onToggleLsnPlanCard
    } = props;

    return (
        <figure
            onClick={onToggleLsnPlanCard}
            className='lsn_plan_view_toggle'
        >
            <img
                src={lsnPlanToggleCard ? toggleTableIcon : toggleCardIcon}
                className="lsn_plan_view_toggle_icon"
                alt="Toggle"
            />
        </figure>
    );
}