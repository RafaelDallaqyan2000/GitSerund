import { cleanForm } from "../..";
import {
  ON_REGISTER_REQUEST,
  ON_REGISTER_SUCCESS,
  ON_REGISTER_FAILURE,
  ON_REGISTER_DONE,
} from "../types";

export const onRegister = (reg, changePath) => {
  const formData = new FormData();
  formData.append("schoolId", reg.schoolId);
  formData.append("fullName", reg.fullName);
  formData.append("specializationId", reg.specializationId);
  formData.append("educationId", reg.educationId);
  formData.append("email", reg.email);
  formData.append("phone", reg.phone);
  formData.append("password", reg.password);
  formData.append("confirmPassword", reg.confirmPassword);
  formData.append("image", reg.image);
  formData.append("subjectsIds", reg.subjectsIds);
  formData.append("captcha", reg?.captcha);

  let languageAm = localStorage.getItem("language") === "am";

  return (dispatch) => {
    dispatch(onRegisterRequest());
    return fetch("/auth/register", {
      method: "POST",
      body: formData,
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.success) {
          dispatch(onRegisterSuccess());
          dispatch(cleanForm());
          changePath();
        } else {
          dispatch(
            onRegisterFailure({
              type: "fail",
              title: languageAm ? "Սխալ" : "Error",
              text: data.errorMessage,
            })
          );
        }
      })
      .catch((error) => {
        dispatch(
          onRegisterFailure({
            type: "fail",
            title: languageAm ? "Սխալ" : "Error",
            text: error.message,
          })
        );
      });
  };
};

export const onRegisterRequest = () => {
  return {
    type: ON_REGISTER_REQUEST,
  };
};

const onRegisterSuccess = (data) => {
  return {
    type: ON_REGISTER_SUCCESS,
    payload: data,
  };
};

export const onRegisterDone = () => {
  return {
    type: ON_REGISTER_DONE,
  };
};

const onRegisterFailure = (details) => {
  return {
    type: ON_REGISTER_FAILURE,
    payload: {
      details,
    },
  };
};
