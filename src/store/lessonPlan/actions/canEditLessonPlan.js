import request from "../../request";
import {
  CAN_EDIT_LESSON_PLAN_SUCCESS,
  CAN_EDIT_LESSON_PLAN_FAILURE,
} from "../types";
import axios from "axios";
import { handleFormChange } from "../../form/actions";

export const canEditLessonPlan = (id) => {
  let language = localStorage.getItem("language");
  return (dispatch) => {
    const body = {
      lessonPlanId: id,
      language,
    };

    request(`/api/lessonPlan/canEditLessonPlan`, "POST", body)
      .then((data) => {
        // dispatch(canEditLessonPlanSuccess(data.success));
        dispatch(handleFormChange("canEditLsnPlan", data.success));
        if (!data.success) {
          dispatch(
            canEditLessonPlanSuccess({
              type: "success",
              title: language === "am" ? "Կատարվել է" : "Done",
              text:
                language === "am"
                  ? "Դուք չեք կարող փոփոխել դասապլանը"
                  : "You cannot modify the lesson plan",
            })
          );
        }
      })
      .catch((e) => {
        dispatch(canEditLessonPlanFailure(e.message));
      });
  };
};

const canEditLessonPlanSuccess = (details) => {
  return {
    type: CAN_EDIT_LESSON_PLAN_SUCCESS,
    payload: {
      details,
    },
  };
};

const canEditLessonPlanFailure = (err) => {
  return {
    type: CAN_EDIT_LESSON_PLAN_FAILURE,
    payload: {
      err,
    },
  };
};
