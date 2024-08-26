import request from "../../request";
import {
  ADD_ASSISTANTS_REQUEST,
  ADD_ASSISTANTS_SUCCESS,
  ADD_ASSISTANTS_FAILURE,
} from "../types";

export const addAssistant = (email) => {
  let language = localStorage.getItem("language");
  return (dispatch) => {
    dispatch(addAssistantRequest());
    request("/api/assistant", "POST", { email, language })
      .then((data) => {
        if (data.success) {
          alert(
            language === "am" ? "Օգնականն ավելացված է" : "Assistant was added"
          );
          addAssistantSuccess(data.id);
        } else {
          alert(data.message);
        }
      })
      .catch((e) => {
        addAssistantFailure(e.message);
      });
  };
};

const addAssistantRequest = () => {
  return {
    type: ADD_ASSISTANTS_REQUEST,
  };
};

const addAssistantSuccess = (id) => {
  return {
    type: ADD_ASSISTANTS_SUCCESS,
    payload: { addedHelperId: id },
  };
};

const addAssistantFailure = (error) => {
  return {
    type: ADD_ASSISTANTS_FAILURE,
    payload: { error },
  };
};
