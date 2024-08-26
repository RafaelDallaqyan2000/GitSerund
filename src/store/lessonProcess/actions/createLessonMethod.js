import request from "../../request";
import {
  CREATE_LSN_METHOD_REQUEST,
  CREATE_LSN_METHOD_SUCCESS,
  CREATE_LSN_METHOD_FAILURE,
} from "../types";

export const createLessonMethod = (method_name, callback) => {
  let language = localStorage.getItem("language");
  return (dispatch) => {
    dispatch(createLessonMethodRequest());
    request(`/api/method`, "POST", { method_name, language })
      .then((data) => {
        // alert(data.message);
        callback(data.result[0].id, method_name);
        dispatch(createLessonMethodSuccess());
      })
      .catch((e) => {
        dispatch(
          createLessonMethodFailure({
            type: "fail",
            title: language === "am" ? "Սխալ" : "Error",
            text: e.message,
          })
        );
      });
  };
};

const createLessonMethodRequest = () => {
  return {
    type: CREATE_LSN_METHOD_REQUEST,
  };
};

const createLessonMethodSuccess = (details) => {
  return {
    type: CREATE_LSN_METHOD_SUCCESS,
    payload: { details },
  };
};

const createLessonMethodFailure = (details) => {
  return {
    type: CREATE_LSN_METHOD_FAILURE,
    payload: { details },
  };
};
