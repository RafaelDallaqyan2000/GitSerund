import { LESSON_PLANS_SUCCESS, LESSON_PLANS_FAILURE } from "../types";
import axios from "axios";
import store from "../..";

export const fetchLessonPlans = () => {
  const { orderBy, selectedColumn } = store.getState().tableReducer;
  const language = localStorage.getItem("language");

  return (dispatch) => {
    axios
      .post("/api/lessonPlan/userLessonPlans", {
        filterType: 1,
        page: null,
        pageCount: 5,
        orderBy,
        selectedColumn,
        language,
      })
      .then((data) => {
        dispatch(fetchLessonPlansSuccess(data.data));
        // dispatch(handleFormChange("profileLsnRowCount",data.data.data[0].count))
      })
      .catch((e) => {
        dispatch(fetchLessonPlansFailure(e.message));
      });
  };
};

const fetchLessonPlansSuccess = (data) => {
  const lessonPlans = data ? data.data : [];

  return {
    type: LESSON_PLANS_SUCCESS,
    payload: {
      lessonPlans,
    },
  };
};

const fetchLessonPlansFailure = (error) => {
  return {
    type: LESSON_PLANS_FAILURE,
    payload: { error },
  };
};
