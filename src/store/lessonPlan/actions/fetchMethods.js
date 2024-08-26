import request from "../../request";
import { FETCH_METHODS_SUCCESS, FETCH_METHODS_FAILURE } from "../types";
import axios from 'axios';

export const fetchMethods = () => {

  return (dispatch) => {

    request('/api/methods')
      .then((data) => {
        dispatch(fetchSelectedMethodsSuccess(data));
      })
      .catch((e) => {
        dispatch(fetchSelectedMethodsFailure(e.message));
      });

  };
};

const fetchSelectedMethodsSuccess = (data) => {
  // const methods = data ? [{id:0,name:"yntrel"}].concat(data.methods) : [];
  const methods = data ?data.methods : [];

  return {
    type: FETCH_METHODS_SUCCESS,
    payload: {
      methods,
    },
  };
};

const fetchSelectedMethodsFailure = (error) => {
  return {
    type: FETCH_METHODS_FAILURE,
    payload: { error },
  };
};
