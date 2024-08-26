import { INIT_FORM } from "../types";

export const initForm = (form = {}) => {
  return (dispatch) => {
    dispatch({
      type: INIT_FORM,
      payload: {
        form,
      },
    });
  };
};
