import { CLEAN_FROM } from "../types";

export const cleanForm = () => {

  return (dispatch) => {
    dispatch({
      type: CLEAN_FROM,
    });
  };
};
