import { LOGOUT_FAILURE } from "../types";
import request from "../../request";

export const handleLogout = () => {
  let languageAm = localStorage.getItem("language") === "am";

  return (dispatch) => {
    request("/auth/logout")
      .then(() => {
        localStorage.removeItem("prevPath");
        localStorage.removeItem("isAuthorized");
        window.location.reload();
      })
      .catch((e) => {
        dispatch(
          fetchLogoutFailure({
            type: "fail",
            title: languageAm ? "Սխալ" : "Error",
            text: e,
          })
        );
      });
  };
};

//   export const fetchLogoutSuccess = () => {
//     return {
//       type: LOGOUT_SUCCESS,
//     };
//   };

export const fetchLogoutFailure = (details) => {
  return {
    type: LOGOUT_FAILURE,
    payload: {
      details,
    },
  };
};
