import {
  USER_DEVELOPED_LESSON_PLANS_SUCCESS,
  USER_DEVELOPED_LESSON_PLANS_FAILURE,
} from "../types";
import axios from "axios";
import { handleFormChange } from "../../form/actions";

export const fetchAllDevelopedLessonPlans = () => {
  const language = localStorage.getItem("language");

  return (dispatch) => {
    axios
      .post("/api/lessonPlan/userLessonPlans", {
        filterType: 1,
        page: null,
        pageCount: null,
        language,
      })
      .then((data) => {
        dispatch(fetchAllDevelopedLessonPlansSuccess(data.data));

        dispatch(handleFormChange("profileLsnRowCount", data.data.data.length));
      })
      .catch((e) => {
        dispatch(fetchAllDevelopedLessonPlansFailure(e.message));
      });
  };
};

const fetchAllDevelopedLessonPlansSuccess = (data) => {
  let allDevelopedLessonPlans = data ? data.data : [];
  return {
    type: USER_DEVELOPED_LESSON_PLANS_SUCCESS,
    payload: {
      allDevelopedLessonPlans,
    },
  };
};

const fetchAllDevelopedLessonPlansFailure = (error) => {
  return {
    type: USER_DEVELOPED_LESSON_PLANS_FAILURE,
    payload: { error },
  };
};
