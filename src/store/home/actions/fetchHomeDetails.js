import request from "../../request";
import {
  FETCH_HOME_DETAILS_SUCCESS,
  FETCH_HOME_DETAILS_FAILURE,
} from "../types";
import { initForm, handleFormChange } from "../../form/actions";

export const fetchHomeDetails = () => {
  return (dispatch) => {
    request("/auth/userData/info")
      .then((data) => {
        dispatch(initForm(data.data[0]));
        dispatch(handleFormChange("fullName", data.data[0].fullName))
        dispatch(handleFormChange("userId", data.userId));
        dispatch(fetchHomeDetailsSuccess(data.data[0], data.userId));
      })

      .catch((e) => {
        dispatch(fetchHomeDetailsFailure(e.message));
      });
  };
};

const fetchHomeDetailsSuccess = (data, id) => {
  const details = data ? data : [];
  const userId = id;

  return {
    type: FETCH_HOME_DETAILS_SUCCESS,
    payload: {
      details,
      userId,
    },
  };
};

const fetchHomeDetailsFailure = (error) => {
  return {
    type: FETCH_HOME_DETAILS_FAILURE,
    payload: { error },
  };
};
