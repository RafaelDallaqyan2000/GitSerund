import { EDIT_PASSWORD_SUCCESS, EDIT_PASSWORD_FAILURE } from "../types";
import request from "../../request";

export const editPassword = (passwords) => {
  const language = localStorage.getItem("language");
  return (dispatch) => {
    request(`/auth/password/edit`, "POST", { ...passwords, language })
      .then((data) => {
        if (data.success) {
          return dispatch(
            editPasswordSuccess({
              title: language === "am" ? "Կատարված է" : "Done",
              text: data.message,
              type: "success",
            })
          );
        }

        dispatch(
          editPasswordFailure({
            title: language === "am" ? "Սխալ" : "Error",
            text: data.message,
            type: "fail",
          })
        );
      })
      .catch((e) => {
        dispatch(
          editPasswordFailure(
            {
              title: language === "am" ? "Սխալ" : "Error",
              text: e.message,
              type: "fail",
            },
            e
          )
        );
      });
  };
};

const editPasswordSuccess = (details) => {
  return {
    type: EDIT_PASSWORD_SUCCESS,
    payload: {
      details,
    },
  };
};

const editPasswordFailure = (details, error) => {
  return {
    type: EDIT_PASSWORD_FAILURE,
    payload: {
      details,
      error,
    },
  };
};
