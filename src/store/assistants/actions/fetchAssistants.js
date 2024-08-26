import request from "../../request";
import {
  FETCH_ASSISTANTS_REQUEST,
  FETCH_ASSISTANTS_SUCCESS,
  FETCH_ASSISTANTS_FAILURE,
} from "../types";

export const fetchAssistants = () => {
  return (dispatch) => {
    dispatch(fetchAssistantsRequest());
    request("/api/assistant/assistants")
      .then((data) => {
        dispatch(fetchAssistantsSuccess(data.assistants));
      })
      .catch((e) => {
        dispatch(fetchAssistantsFailure(e.message));
      });
  };
};

const fetchAssistantsRequest = () => {
  return {
    type: FETCH_ASSISTANTS_REQUEST,
  };
};

const fetchAssistantsSuccess = (data) => {
  const assistants = data ? data : [];

  return {
    type: FETCH_ASSISTANTS_SUCCESS,
    payload: {
      assistants,
    },
  };
};

const fetchAssistantsFailure = (error) => {
  return {
    type: FETCH_ASSISTANTS_FAILURE,
    payload: { error },
  };
};
