import {
    GET_COMMENTS_FROM_NOTIFICATIONS_REQUEST,
    GET_COMMENTS_FROM_NOTIFICATIONS_SUCCESS,
    GET_COMMENTS_FROM_NOTIFICATIONS_FAILURE
} from "../types";
import ApiComments from "../../../Api/ApiComments";

export function getCommentFromNotificationsRequest(commentId) {
    return async (dispatch) => {
        try {
            dispatch({
                type: GET_COMMENTS_FROM_NOTIFICATIONS_REQUEST,
                payload: { status: "request" },
            });

            const { data } = await ApiComments.getCommentFromNotification(commentId);
            const {commentDetails} = data.data;

            dispatch({
                type: GET_COMMENTS_FROM_NOTIFICATIONS_SUCCESS,
                payload: {
                    status: "success",
                    comments: [commentDetails],
                },
            });
        } catch (e) {
            dispatch({
                type: GET_COMMENTS_FROM_NOTIFICATIONS_FAILURE,
                payload: {
                    status: "fail",
                },
            });
        }
    };
}
