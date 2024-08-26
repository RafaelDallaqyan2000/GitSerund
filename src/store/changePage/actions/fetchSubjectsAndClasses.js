import axios from "axios";
import {
  FETCH_SUBJECTS_AND_CLASSES_FAILURE,
  FETCH_SUBJECTS_AND_CLASSES_REQUEST,
  FETCH_SUBJECTS_AND_CLASSES_SUCCESS,
} from "../types";

export const fetchSubjectsAndClasses = (language = "am") => {
  return (dispatch) => {
    dispatch(fetchSubjectsAndClassesRequest());
    axios(`/api/getSubjectsAndClasses?language=${language}`)
      .then((data) => {
        if (data.data) {
          // callback()
          dispatch(fetchSubjectsAndClassesSuccess(data.data));
        }
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(fetchSubjectsAndClassesFailure(errorMsg));
      });
  };
};

export const fetchSubjectsAndClassesRequest = () => {
  return {
    type: FETCH_SUBJECTS_AND_CLASSES_REQUEST,
  };
};

const fetchSubjectsAndClassesSuccess = (data) => {
  const subjectsAndClasses = data ? data : [];
  return {
    type: FETCH_SUBJECTS_AND_CLASSES_SUCCESS,
    payload: subjectsAndClasses,
  };
};

const fetchSubjectsAndClassesFailure = (error) => {
  return {
    type: FETCH_SUBJECTS_AND_CLASSES_FAILURE,
    payload: error,
  };
};
