import {
  FETCH_CLASSES_REQUEST,
  FETCH_CLASSES_SUCCESS,
  FETCH_CLASSES_FAILURE,
} from "../types";
import axios from "axios";

export const getClassesBySubject = (subjectId) => {
  return (dispatch) => {
    // dispatch(fetchRequest());
    axios
      .post("/api/classesBySubjectId", { subjectId })
      .then((data) => {
        // callback();
        if (data.data.success) {
          dispatch(fetchSuccess(data.data.result));
        }
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(fetchFailure(errorMsg));
      });
  };
};

export const fetchRequest = () => {
  return {
    type: FETCH_CLASSES_REQUEST,
  };
};

const fetchSuccess = (data) => {
  const classesBySubject = data ? data : [1];
  return {
    type: FETCH_CLASSES_SUCCESS,
    payload: { classesBySubject },
  };
};

const fetchFailure = (error) => {
  return {
    type: FETCH_CLASSES_FAILURE,
    payload: { error },
  };
};
