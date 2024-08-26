import {
  FETCH_REGIONS_FAILURE,
  FETCH_REGIONS_REQUEST,
  FETCH_REGIONS_SUCCESS,
} from "../types";

export const getDistricts = (callback = () => {}) => {
  return (dispatch) => {
    dispatch(fetchRegionsRequest());
    fetch("/api/districts")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.success) {
          dispatch(fetchDistrictsSuccess(data));
          callback(data);
        }
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(fetchRegionsFailure(errorMsg));
      });
  };
};

export const fetchRegionsRequest = () => {
  return {
    type: FETCH_REGIONS_REQUEST,
  };
};

const fetchDistrictsSuccess = (data) => {
  const districts = data ? data : [];
  return {
    type: FETCH_REGIONS_SUCCESS,
    payload: districts,
  };
};

const fetchRegionsFailure = (error) => {
  return {
    type: FETCH_REGIONS_FAILURE,
    payload: error,
  };
};
