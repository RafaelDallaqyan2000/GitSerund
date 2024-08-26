import request from "../../request";
import { FETCH_SUBJECTS_SUCCESS, FETCH_SUBJECTS_FAILURE } from "../types";
import { handleFormChange } from "../../form/actions";

export const getSubjects = (teacherId = 0) => {
  let language = localStorage.getItem("language");
  return (dispatch) => {
    request(`/api/subjects/${teacherId}?language=${language}`)
      .then((data) => {
        dispatch(fetchSubjectsSuccess(data));
        if (data.result.length) {
          dispatch(handleFormChange("subjectsForRegistration", data.result));
        }
      })
      .catch((e) => {
        dispatch(fetchSubjectsFailure(e.message));
      });
  };
};

export const fetchSubjectsSuccess = (data) => {
  const subjects = data ? data.result : [];

  return {
    type: FETCH_SUBJECTS_SUCCESS,
    payload: {
      subjects,
    },
  };
};

const fetchSubjectsFailure = (error) => {
  return {
    type: FETCH_SUBJECTS_FAILURE,
    payload: { error },
  };
};
