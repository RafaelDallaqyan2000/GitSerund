import "./NotificationInfoItem.css";
import store, { putReadNotification } from "../../../store";
import { editDateToToday, objectToQueryString } from "../../../helpers";
import { useNavigate } from "react-router-dom";

export function NotificationInfoItem({
    message,
    isViewed,
    date,
    topic,
    comment,
    lsnPlanId,
    commentId,
    commentUmId,
    commentTypeId,
    notificationId,
    typeId,
    link
}) {
    let navigate = useNavigate();
    const userProfileImage = require(
        lsnPlanId ? "../../../img/defaultProfile.png" : "../icons/adminImg.svg"
    ).default

    const handleNotificationClick = () => {
        const queryObject = {
            commentId,
            umId: commentUmId,
            typeId: commentTypeId,
        };
        let queryString = objectToQueryString(queryObject);
        queryString = queryString  ? `?${queryString}` : '';

        store.dispatch(putReadNotification(notificationId, typeId))
       if(lsnPlanId) {
           return  navigate(`/show/lessonPlan/${lsnPlanId}${queryString}`);
       }
    }

    return (
        <div
            style={{
                background: isViewed ? "#FFFFFF" : "rgba(236, 239, 248, 0.6)",
                cursor: lsnPlanId ? "pointer" : "default"
        }}
            className="comment_info_item_container"
            onClick={handleNotificationClick}
        >
            <img className="profile_picture_comment_item"
                 src={userProfileImage}
                 width={50}
                 height={50}
            />
            <div className="notification_texts">
                <div>
                    <p dangerouslySetInnerHTML={{__html: message}}></p>
                </div>
                {
                    lsnPlanId
                        ? <div className="notification_topic">
                            {topic}
                          </div>
                        : link
                            ? <span className="if_admin_notification">
                                <a href={link}
                                   target="_blank"
                                   className="see_admin_notification"
                                >Դիտել</a>
                        </span>
                            : null
                }
                {
                    lsnPlanId && comment && <div className="notification_comment">{comment}</div>
                }
            </div>
            <div className="date_in_notification">
                {editDateToToday(date)}
            </div>
        </div>
    )
}
