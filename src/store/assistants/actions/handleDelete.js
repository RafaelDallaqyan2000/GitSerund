import { HANDLE_DELETE } from "../types";

export const handleDelete = () => {
  return (dispatch) => {
    dispatch({
      type: HANDLE_DELETE,
    });
  };
};
