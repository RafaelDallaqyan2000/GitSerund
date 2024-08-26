import "./UserActivity.css";
import momentWL from "moment-with-locales-es6";
import rightArrowIcon from "../../../../img/right-icon.svg";
import React from "react";

export function UserActivity(props) {
    const {
        onClick,
        activity,
        date = "",
        allowClick = false,
    } = props;

    return (
        <div
            className="user-activity-card-container"
            onClick={() => onClick(activity)}
        >
            <div>
                <p
                    className="activity-message"
                    dangerouslySetInnerHTML={{__html: activity.text}}
                />
                <p className="activity-date">
                    {momentWL(date).format("MMM D")}
                </p>
            </div>

            {
                allowClick && (
                    <div className="user-activity-arrow">
                        <img
                            src={rightArrowIcon}
                            alt="Right arrow"
                            className="user-activity-arrow-icon"
                        />
                    </div>
                )
            }
        </div>
    )
}
