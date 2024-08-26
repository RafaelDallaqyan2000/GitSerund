import { GET_NEW_NOTIFICATION_COUNT } from "../types";

export function getNewNotificationCount() {

        return  (dispatch) => {
            fetch(`/api/notification/count`)
                .then((res) => {
                    return res.json();
                })
                .then((data) => {
                    if (data.success) {
                        dispatch(newNotificationCount(data))
                    }
                })
                .catch((error) => error);
        }
}

const newNotificationCount = (data) => {
    return {
        type : GET_NEW_NOTIFICATION_COUNT,
        payload : {
            newNotificationCount : data.data.count,
            showDot : data.data.showDot
        }
    }
}