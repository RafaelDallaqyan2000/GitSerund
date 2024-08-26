import {
  CREATE_METHOD_DETAILS_SUCCESS,
  CREATE_NEW_LESS_PROC_FAILURE,
} from "../types";
import store from "../..";
import request from "../../request";
import { pushAddedMethod } from ".";

export const createMethodDetails = (callback) => {
  const methodLength =
    store.getState().lessonProcessReducer.lessonProcess.length;
  const method =
    store.getState().lessonProcessReducer.lessonProcess[methodLength - 1];

  method.lastOrder = methodLength;
  method.methodid = store.getState().lessonProcessReducer.lessonProcessId;
  method.teacherActionDescNotInLessonPlan = store
    .getState()
    .formReducer.teacherActionDescNotInLessonPlan?.replace("../../", "/");
  method.textPlaceholder = method.textPlaceholder?.replace("../../", "/");
  method.guide = method.guide?.replace("../../", "/");
  method.pupilWorkPart = store
    .getState()
    .formReducer.pupilWorkPart?.replace("../../", "/");

  let languageAm = localStorage.getItem("language") === "am";

  return (dispatch) => {
    request(`/api/method/addMethodDetails`, "POST", { method })
      .then((data) => {
        if (data.success) {
          method.id = data.result[0].id;
          dispatch(pushAddedMethod(method));
          dispatch(createMethodDetailsSuccess());

          callback();
        } else {
          store.getState().lessonProcessReducer.lessonProcess.pop();
        }
      })
      .catch((e) => {
        dispatch(
          createMethodDetailsFailure({
            type: "fail",
            title: languageAm ? "Սխալ" : "Error",
            text: e.message,
          })
        );
      });
  };
};

const createMethodDetailsSuccess = () => {
  return {
    type: CREATE_METHOD_DETAILS_SUCCESS,
    //   payload: data,
  };
};
const createMethodDetailsFailure = (details) => {
  return {
    type: CREATE_NEW_LESS_PROC_FAILURE,
    payload: { details },
  };
};
