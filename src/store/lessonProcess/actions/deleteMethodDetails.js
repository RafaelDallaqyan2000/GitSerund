import { DELETE_METHOD_FAILURE } from "../types";
import store from "../..";
import request from "../../request";
import { removeMethod, replaceMethod } from ".";

export const deleteMethodDetails = (id, actionType) => {
  let language = localStorage.getItem("language");

  const methods = store.getState().lessonProcessReducer.addedMethods;
  const index = methods.findIndex((method) => id === method.id);
  if (index === -1) {
    return store.dispatch(
      deleteMethodFailure({
        type: "fail",
        title: language === "am" ? "Սխալ" : "Error",
        text:
          language === "am"
            ? "Չհաջողվեց հեռացնել գործողությունը"
            : "Failed to remove operation",
      })
    );
  }
  let method = methods[index];
  if (actionType === "student") {
    method.teacherAction = method.teacherAction ? method.teacherAction : null;
    method.teacherActionDesc = method.teacherActionDesc
      ? method.teacherAction
      : null;
    method.studentAction = null;
    method.studentActionDesc = null;
  } else if (actionType === "teacher") {
    method.studentAction = method.studentAction ? method.studentAction : null;
    method.studentActionDesc = method.studentActionDesc
      ? method.studentActionDesc
      : null;
    method.teacherAction = null;
    method.teacherActionDesc = null;
    method.guide = null;
    method.textPlaceholder = null;
    method.language = language;
  }
  return (dispatch) => {
    request(`/api/method/deleteMethodDetails`, "POST", { method })
      .then((data) => {
        if (data.success) {
          if (method.studentAction === null && method.teacherAction === null) {
            dispatch(removeMethod(index));
            return;
          }
          dispatch(replaceMethod(index, method));
        } else {
        }
      })
      .catch((e) => {
        dispatch(
          deleteMethodFailure({
            type: "fail",
            title: language === "am" ? "Սխալ" : "Error",
            text: e.message,
          })
        );
      });
  };
};

const deleteMethodFailure = (details) => {
  return {
    type: DELETE_METHOD_FAILURE,
    payload: { details },
  };
};
