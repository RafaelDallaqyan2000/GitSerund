import {
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILURE,
} from "../types";

export const forgotPassword = (email) => {
  let language = localStorage.getItem("language");
  return (dispatch) => {
    dispatch(forgotPasswordRequest());
    fetch(`/auth/password/forgot`, {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({ email, language }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.success) {
          dispatch(forgotPasswordSuccess(data));
        }
        if (!data.success) {
          dispatch(
            forgotPasswordFailure({
              type: "fail",
              title: language === "am" ? "Սխալ" : "Error",
              text: data.message,
            })
          );
        }
      })
      .catch((error) => {
        dispatch(
          forgotPasswordFailure({
            type: "fail",
            title: language === "am" ? "Սխալ" : "Error",
            text: error.message,
          })
        );
      });
  };
};

const forgotPasswordRequest = () => {
  return {
    type: FORGOT_PASSWORD_REQUEST,
  };
};

const forgotPasswordSuccess = (data) => {
  const forgot = data ? data : [];
  return {
    type: FORGOT_PASSWORD_SUCCESS,
    payload: {
      forgot,
    },
  };
};

const forgotPasswordFailure = (details) => {
  return {
    type: FORGOT_PASSWORD_FAILURE,
    payload: { details },
  };
};
