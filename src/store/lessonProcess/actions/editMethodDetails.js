import {
  EDIT_METHOD_FAILURE,
  EDIT_METHOD_REQUEST,
  EDIT_METHOD_SUCCESS,
} from "../types";
import store, { cleanForm } from "../..";
import request from "../../request";
import { replaceMethod } from ".";

export const editMethodDetails = (callback) => {
  let {
    id,
    studentAction,
    studentActionDesc,
    teacherAction,
    teacherActionDesc,
    guide,
    textPlaceholder,
    teacherActionDescNotInLessonPlan,
  } = store.getState().formReducer;

  const methods = store.getState().lessonProcessReducer.addedMethods;
  const method = methods.find((element) => element.id === id) ?? {};
  const index = methods.findIndex((el) => el === method);
  let language = localStorage.getItem("language");

  method.studentAction = studentAction;
  method.studentActionDesc = studentActionDesc;
  method.teacherAction = teacherAction;
  method.teacherActionDesc = teacherActionDesc;
  method.guide = guide?.replace("../../", "/");
  method.textPlaceholder = textPlaceholder?.replace("../../", "/");
  method.teacherActionDescNotInLessonPlan =
    teacherActionDescNotInLessonPlan?.replace("../../", "/");
  method.pupilWorkPart = store
    .getState()
    .formReducer.pupilWorkPart?.replace("../../", "/");
  method.language = language;

  return (dispatch) => {
    request(`/api/method/editMethodDetails`, "POST", method)
      .then((data) => {
        if (data.success) {
          dispatch(
            editMethodSuccess({
              type: "success",
              title: language === "am" ? "Կատարվել է" : "Done",
              text: data.message,
            })
          );

          store.dispatch(replaceMethod(index, method));
          store.dispatch(cleanForm());
        } else {
          dispatch(
            editMethodFailure({
              type: "fail",
              title: language === "am" ? "Սխալ" : "Error",
              text: data.message,
            })
          );
        }
        callback();
      })
      .catch((e) => {
        dispatch(
          editMethodFailure({
            type: "fail",
            title: language === "am" ? "Սխալ" : "Error",
            text: e.message,
          })
        );
      });
  };
};

const editMethodRequest = () => {
  return {
    type: EDIT_METHOD_REQUEST,
  };
};

const editMethodSuccess = (details) => {
  return {
    type: EDIT_METHOD_SUCCESS,
    payload: { details },
  };
};

const editMethodFailure = (details) => {
  return {
    type: EDIT_METHOD_FAILURE,
    payload: { details },
  };
};
