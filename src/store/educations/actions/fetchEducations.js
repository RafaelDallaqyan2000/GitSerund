import {
  FETCH_EDUCATION_FAILURE,
  FETCH_EDUCATION_REQUEST,
  FETCH_EDUCATION_SUCCESS,
} from "../types";

export const fetchEducations = (callback) => {
  let language = localStorage.getItem("language");
  return (dispatch) => {
    dispatch(fetchEducationsRequest());
    fetch(`/api/educations?language=${language}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        callback();

        if (data.success) {
          dispatch(fetchEducationsSuccess(data));
        }
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(fetchEducationsFailure(errorMsg));
      });
  };
};

export const fetchEducationsRequest = () => {
  return {
    type: FETCH_EDUCATION_REQUEST,
  };
};

const fetchEducationsSuccess = (data) => {
  const educations = data ? data : [];
  return {
    type: FETCH_EDUCATION_SUCCESS,
    payload: educations,
  };
};

const fetchEducationsFailure = (error) => {
  return {
    type: FETCH_EDUCATION_FAILURE,
    payload: error,
  };
};
