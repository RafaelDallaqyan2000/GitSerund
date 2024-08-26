import {
  FETCH_LSNPLAN_DETAILS_SUCCESS,
  FETCH_LSNPLAN_DETAILS_FAILURE,
} from "../types";
import store from "../../../store";

export const fetchLessonPlanDetails = () => {
  return (dispatch) => {
    const id = store.getState().formReducer.lessonProcId;
    const host = window.location.pathname.split("/");
    const lessonPlanId = host[host.length - 1];
    const language = localStorage.getItem("language");

    return fetch("/api/lessonPlan/lessonPlanDetails", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ lessonPlanId: id ? id : lessonPlanId, language }),
    })
      .then((res) => {
        if (res.status === 400) {
          return (window.location.pathname = "/home?search=&page=1");
        }
        return res.json();
      })
      .then((data) => {
        if (Object.keys(data)?.length) {
          dispatch(fetchLessonPlanDetailsSuccess(data));
        } else {
          dispatch(fetchLessonPlanDetailsFailure());
        }
      })
      .catch((err) => {
        dispatch(fetchLessonPlanDetailsFailure());
      });
  };
};

const fetchLessonPlanDetailsSuccess = (data) => {
  const details = data ? data : {};
  return {
    type: FETCH_LSNPLAN_DETAILS_SUCCESS,
    payload: {
      details,
    },
  };
};

const fetchLessonPlanDetailsFailure = (error) => {
  return {
    type: FETCH_LSNPLAN_DETAILS_FAILURE,
    payload: { error },
  };
};
