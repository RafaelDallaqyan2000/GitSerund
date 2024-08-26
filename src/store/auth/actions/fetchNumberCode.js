import {
  FETCH_NUMBER_CODE_FAILURE,
  FETCH_NUMBER_CODE_REQUEST,
  FETCH_NUMBER_CODE_SUCCESS,
} from "../types";

export const fetchNumberCodes = () => {
  return (dispatch) => {
    dispatch(fetchNumberCodesRequest());
    fetch("/api/phoneCodes")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.success) {
          dispatch(fetchNumberCodesSuccess(data));
        }
      })
      .catch((error) => {

        const errorMsg = error.message;
        dispatch(fetchNumberCodesFailure(errorMsg));
      });
  };
};

export const fetchNumberCodesRequest = () => {
  return {
    type: FETCH_NUMBER_CODE_REQUEST,
  };
};

const fetchNumberCodesSuccess = (data) => {
  const numberCode = data ? data : [];
  return {
    type: FETCH_NUMBER_CODE_SUCCESS,
    payload: numberCode,
  };
};

const fetchNumberCodesFailure = (error) => {
  return {
    type: FETCH_NUMBER_CODE_FAILURE,
    payload: error,
  };
};
