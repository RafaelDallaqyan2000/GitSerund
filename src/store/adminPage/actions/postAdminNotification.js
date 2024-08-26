import axios from "axios";
import {SUCCESS_ADMIN_NOTIFICATION} from "../types";

export function postAdminNotification(
    userIds,
    text,
    link,
    callbackFunction
) {
    return (dispatch) => {
        // dispatch(fetchRequest());
        axios
            .post("/api/notification/admin", {
                userIds,
                text,
                link
            })
            .then((data) => {
                if(data.data) {
                    return callbackFunction()
                }
            })
            .catch((error) => {
                // const errorMsg = error.message;
                // dispatch(fetchFailure(errorMsg));
                return error
            });
    }
}

const successPostAdminNotification = (data) => {
    return {
        type : SUCCESS_ADMIN_NOTIFICATION,
        payload : {

        }
    }
}