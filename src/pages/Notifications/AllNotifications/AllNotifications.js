import {connect} from "react-redux";
import {NotificationInfoItem} from "../NotificationInfoItem/NotificationInfoItem";
import {getAllNotifications} from "../../../store/notifications/actions/getAllNotifications";
import {useEffect} from "react";
import "./AllNotifications.css";
import {useParams} from "react-router";
import {useQuery} from "../../../hooks/useQuery";

function NotificationArr({
    getAllNotifications,
    allNotifications
}) {

    let  query  = useQuery();
    let page = query.get("page");
    let typeId = query.get("typeId");

    useEffect(() => {
        getAllNotifications(page, typeId)
    }, [page, typeId]);

    return (
        <div className="all_notifications">
            {
                allNotifications?.map( ( notification ) => (
                    <NotificationInfoItem
                        typeId={notification.notificationTypeId}
                        key={ notification.id }
                        notificationId={ notification.id }
                        message={ notification.message }
                        isViewed={ notification.isViewed }
                        date={ notification.insertDate }
                        topic={ notification.topic }
                        comment={ notification.comment }
                        lsnPlanId={ notification.lessonPlanId }
                        commentId={ notification.commentId }
                        commentUmId={notification.userMethodId}
                        commentTypeId={notification.typeId}
                        link={notification.link}
                    />
                ))
            }
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        allNotifications : state.notificationReducer.allNotifications
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllNotifications : (page, typeId) => dispatch(getAllNotifications(page, typeId))
    }
}

export const AllNotifications = connect(mapStateToProps, mapDispatchToProps)(NotificationArr)