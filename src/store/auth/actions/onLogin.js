import { ON_LOGIN_REQUEST, ON_LOGIN_SUCCESS, ON_LOGIN_FAILURE } from "../types";
import { handleFormChange, initForm } from "../../form/actions";

export const onLogin = ({
  email,
  password,
  remember,
  captcha,
  callback = () => {},
}) => {
  let language = localStorage.getItem("language");

  return (dispatch) => {
    dispatch(onLoginRequest());
    fetch("/auth/login", {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({
        language,
        email,
        password,
        remember,
        captcha,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.success) {
          dispatch(initForm(data.user));
          dispatch(onLoginSuccess(data));
          callback(data);
          localStorage.setItem("isAuthorized", data.success);
          window.location.reload();
        } else {
          dispatch(onLoginFailure(data));
          dispatch(handleFormChange("errorMsg", data.errorMessage));
        }
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(
          onLoginFailure(errorMsg, {
            type: "fail",
            title: language === "am" ? "Սխալ" : "Error",
            text:
              language === "am" ? "Չհաջողվեց մուտք գործել" : "Could not log in",
          })
        );
      });
  };
};

const onLoginRequest = () => {
  return {
    type: ON_LOGIN_REQUEST,
  };
};

const onLoginSuccess = (data) => {
  const login = data ? data : [];
  return {
    type: ON_LOGIN_SUCCESS,
    payload: {
      login,
    },
  };
};

const onLoginFailure = (error, details) => {
  return {
    type: ON_LOGIN_FAILURE,
    payload: { error, details },
  };
};
