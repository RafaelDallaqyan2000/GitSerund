import axios from "axios";

export function putReadNotification(notificationId, typeId) {
    return (dispatch) => {
        axios
            .put("/api/notification", {
                notificationId,
                typeId
            })
            .then(data => data)
            .catch(e => e)
    }
}