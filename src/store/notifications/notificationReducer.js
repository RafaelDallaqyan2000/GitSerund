import {GET_ALL_NOTIFICATIONS, GET_NEW_NOTIFICATION_COUNT} from "./types";

const initialState = {
    allNotifications: [],
    newNotificationCount : 0,
    pageCount : 1
}

const notificationReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_NOTIFICATIONS:
           return {
             ...state,
               allNotifications: action.payload.allNotifications,
               pageCount : action.payload.pageCount
           }
        case GET_NEW_NOTIFICATION_COUNT :

            return {
                ...state,
                ...action.payload,
            }
        default:
            return state;
    }
};

export default notificationReducer;
