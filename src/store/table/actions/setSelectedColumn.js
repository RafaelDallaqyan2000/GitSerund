import { TOGGLE_COLUMN } from "../types";

export const setSelectedColumn = (selectedColumn) => {
  return (dispatch) => {
    dispatch({
      type: TOGGLE_COLUMN,
      payload: {
        selectedColumn,
      },
    });
  };
};
