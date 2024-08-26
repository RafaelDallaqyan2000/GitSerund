import {
  DELETE_LESSON_PLAN_REQUEST,
  DELETE_LESSON_PLAN_SUCCESS,
  DELETE_LESSON_PLAN_FAILURE,
} from "../types";
import ApiLessonPlan from "../../../Api/ApiLessonPlan";
import { fetchLessonPlanTableDetails } from "../../home/actions";

export function deleteLessonPlan(lessonPlanId, callbackFunction = () => {}) {
  let languageAm = localStorage.getItem("language") === "am";
  return async (dispatch) => {
    try {
      dispatch({
        type: DELETE_LESSON_PLAN_REQUEST,
        payload: { status: "request" },
      });

      const { data } = await ApiLessonPlan.deleteLessonPlan(lessonPlanId);

      if (!data.success) throw new Error();

      dispatch({
        type: DELETE_LESSON_PLAN_SUCCESS,
        payload: {
          lessonPlanId,
          status: "success",
          popupDetails: {
            title: languageAm ? "Կատարված է" : "Done",
            text: languageAm ? "Դասապլանը հեռացված է" : "Lesson plan deleted",
            type: "success",
            cancelBtnTitle: languageAm ? "Փակել" : "Close",
            submitBtnTitle: "",
            titleStyle: { color: "#1C1C1C" },
            cancelBtnStyle: {
              background: "linear-gradient(83.13deg, #6FD89C 0%, #46B776 100%)",
              color: "#FFF",
            },
          },
        },
      });

      callbackFunction();
    } catch (e) {
      dispatch({
        type: DELETE_LESSON_PLAN_FAILURE,
        payload: {
          status: "fail",
          popupDetails: {
            title: languageAm ? "Սխալ" : "Error",
            text: languageAm ? "Չհաջողվեց հեռացնել" : "Failed to remove",
            type: "fail",
            cancelBtnTitle: languageAm ? "Փակել" : "Close",
            submitBtnTitle: "",
            titleStyle: { color: "#EA6670" },
            cancelBtnStyle: {
              background: "#EA6670",
              color: "#FFF",
            },
          },
        },
      });
    }
  };
}
