import {
  RECOVER_PASSWORD_REQUEST,
  RECOVER_PASSWORD_SUCCESS,
  RECOVER_PASSWORD_FAILURE,
} from "../types";

export const recoverPassword = (
  recoverToken,
  password,
  confirmPassword,
  changePath
) => {
  let language = localStorage.getItem("language");

  return (dispatch) => {
    dispatch(recoverPasswordRequest());
    fetch("/auth/password/recover", {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({ recoverToken, password, confirmPassword }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.success) {
          dispatch(
            recoverPasswordSuccess({
              type: "success",
              title: language === "am" ? "Կատարվել է" : "Happened",
              text:
                language === "am"
                  ? "Գաղտնաբառը հաջողությամբ փոխված է։"
                  : "The password has been successfully changed.",
            })
          );
          changePath();
        } else {
          dispatch(
            recoverPasswordFailure({
              type: "fail",
              title: language === "am" ? "Սխալ" : "Error",
              text: data.message,
            })
          );
        }
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(
          recoverPasswordFailure({
            type: "fail",
            title: language === "am" ? "Սխալ" : "Error",
            text: errorMsg,
          })
        );
      });
  };
};

const recoverPasswordRequest = () => {
  return {
    type: RECOVER_PASSWORD_REQUEST,
  };
};

const recoverPasswordSuccess = (details) => {
  //   const login = data ? data : [];
  return {
    type: RECOVER_PASSWORD_SUCCESS,
    payload: {
      //   login,
      details,
    },
  };
};

const recoverPasswordFailure = (details) => {
  return {
    type: RECOVER_PASSWORD_FAILURE,
    payload: { details },
  };
};
