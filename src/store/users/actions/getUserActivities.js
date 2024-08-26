import {
  GET_USER_ACTIVITIES_REQUEST,
  GET_USER_ACTIVITIES_SUCCESS,
  GET_USER_ACTIVITIES_FAILURE,
} from "../types";
import ApiProfile from "../../../Api/ApiProfile";

export function getUserActivities(params) {
  let { userId, page, rowCount = 5, language = "am" } = params;
  page = parseInt(page) || 1;

  return async (dispatch) => {
    try {
      dispatch({
        type: GET_USER_ACTIVITIES_REQUEST,
        payload: { status: "request" },
      });

      const { data } = await ApiProfile.getActivities(
        userId,
        page,
        rowCount,
        language
      );

      dispatch({
        type: GET_USER_ACTIVITIES_SUCCESS,
        payload: {
          status: "success",
          activities: [...data.data.activities],
          count: data.data.count,
          rowCount,
        },
      });
    } catch (e) {
      dispatch({
        type: GET_USER_ACTIVITIES_FAILURE,
        payload: { status: "fail" },
      });
    }
  };
}
