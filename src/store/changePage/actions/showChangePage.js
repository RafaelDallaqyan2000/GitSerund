import { SHOW_CHANGE_PAGE } from "../types";

export const showChangePage = (value) => {
  return (dispatch) => {
    dispatch({
      type: SHOW_CHANGE_PAGE,
      payload:value
    });
  };
};
