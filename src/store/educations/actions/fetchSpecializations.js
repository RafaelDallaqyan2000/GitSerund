import {
  FETCH_SPECIALIZATIONS_REQUEST,
  FETCH_SPECIALIZATIONS_SUCCESS,
  FETCH_SPECIALIZATIONS_FAILURE,
} from "../types";

export const fetchSpecializations = (callback) => {
  const language = localStorage.getItem("language");
  return (dispatch) => {
    dispatch(fetchSpecializationsRequest);
    fetch(`/api/specializations?language=${language}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          callback();
          dispatch(fetchSpecializationsSuccess(data));
        }
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(fetchSpecializationsFailure(errorMsg));
      });
  };
};

export const fetchSpecializationsRequest = () => {
  return {
    type: FETCH_SPECIALIZATIONS_REQUEST,
  };
};

const fetchSpecializationsSuccess = (data) => {
  const specialization = data ? data : [];
  return {
    type: FETCH_SPECIALIZATIONS_SUCCESS,
    payload: specialization,
  };
};

const fetchSpecializationsFailure = (error) => {
  return {
    type: FETCH_SPECIALIZATIONS_FAILURE,
    payload: error,
  };
};
