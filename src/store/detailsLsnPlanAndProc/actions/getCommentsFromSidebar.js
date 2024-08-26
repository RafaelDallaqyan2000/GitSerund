import {
  GET_COMMENTS_FROM_SIDEBAR_REQUEST,
  GET_COMMENTS_FROM_SIDEBAR_SUCCESS,
  GET_COMMENTS_FROM_SIDEBAR_FAILURE,
} from "../types";
import ApiComments from "../../../Api/ApiComments";

export function getCommentsFromSidebarRequest(params) {
  const { lessonPlanId, typeId, userMethodId, rowCount, commentId } = params;
  return async (dispatch) => {
    try {
      dispatch({
        type: GET_COMMENTS_FROM_SIDEBAR_REQUEST,
        payload: { status: "request" },
      });

      const { data } = await ApiComments.getCommentsFromSidebar({
        lessonPlanId,
        typeId,
        userMethodId,
        rowCount,
        commentId,
      });

      dispatch({
        type: GET_COMMENTS_FROM_SIDEBAR_SUCCESS,
        payload: {
          status: "success",
          comments: data.data,
        },
      });
    } catch (e) {
      dispatch({
        type: GET_COMMENTS_FROM_SIDEBAR_FAILURE,
        payload: {
          status: "fail",
        },
      });
    }
  };
}
