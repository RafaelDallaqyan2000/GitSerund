import {
  USER_LESSON_PLANS_REQUEST,
  USER_LESSON_PLANS_SUCCESS,
  USER_LESSON_PLANS_FAILURE,
} from "../types";
import axios from "axios";
import store from "../..";
import { handleFormChange } from "../../form/actions";

export const fetchUserLessonPlans = (
  filterType,
  page,
  rowCount = 5,
  searchString = "",
  viewedUserId,
  orderColumn = "date"
) => {
  const { orderBy, selectedColumn } = store.getState().tableReducer;
  const language = localStorage.getItem("language");

  return (dispatch) => {
    dispatch(fetchUserLessonPlansRequest());
    axios
      .post("/api/lessonPlan/userLessonPlans", {
        filterType,
        page,
        pageCount: rowCount,
        orderBy,
        selectedColumn,
        searchString,
        viewedUserId,
        isOrderAsc: false,
        orderColumn,
        language,
      })
      .then((data) => {
        data.data.rowCount = rowCount;
        dispatch(fetchUserLessonPlansSuccess(data.data));
        dispatch(
          handleFormChange(
            "profileLsnRowCount",
            data.data.data.userLessonPlanDetails.totalLessonPlansCount
          )
        );
      })
      .catch((e) => {
        dispatch(fetchUserLessonPlansFailure(e.message));
      });
  };
};

const fetchUserLessonPlansRequest = () => {
  return {
    type: USER_LESSON_PLANS_REQUEST,
    payload: { status: "request" },
  };
};

const fetchUserLessonPlansSuccess = (data) => {
  let userLessonPlans = [];
  let pageCount = 0;
  if (data.data) {
    userLessonPlans = data.data;
    if (userLessonPlans.length > 0) {
      pageCount = Math.ceil(userLessonPlans[0].count / data.rowCount);
    }
  }

  return {
    type: USER_LESSON_PLANS_SUCCESS,
    payload: {
      userLessonPlans,
      pageCount,
      status: "success",
    },
  };
};

const fetchUserLessonPlansFailure = (error) => {
  return {
    type: USER_LESSON_PLANS_FAILURE,
    payload: { error, status: "fail" },
  };
};
