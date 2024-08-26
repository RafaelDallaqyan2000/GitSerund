import { AUTHORIZE_REQUEST, AUTHORIZE_SUCCESS } from "../types";
import { isLoadingScreen } from "./isLoadingScreen";

export const authorize = () => {
  let language = localStorage.getItem("language");
  return (dispatch) => {
    dispatch(authorizeRequest());
    fetch(`/auth/tokenVerify?language=${language}`)
      .then((res) => res.json())
      .then((data) => {
        localStorage.setItem("isAuthorized", data.success);
        dispatch(authorizeSuccess(data));
        if (data.success) {
        }
      })
      .catch((error) => {
        throw error.message;
      })
      .finally(() => {
        if (
          !!window.location.search.indexOf("_is=") ||
          window.location.search.indexOf("_is=") !== -1
        ) {
          dispatch(isLoadingScreen(false));
        }
      });
  };
};

const authorizeRequest = () => {
  return {
    type: AUTHORIZE_REQUEST,
  };
};

export const authorizeSuccess = (data) => {
  return {
    type: AUTHORIZE_SUCCESS,
    payload: data,
  };
};
