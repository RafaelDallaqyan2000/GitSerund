import { IS_PROFILE_EDITING } from "../types";

export const setProfileEdit = (isEditing) => {
  return (dispatch) => {
    dispatch({
      type: IS_PROFILE_EDITING,
      payload: { isEditing },
    });
  };
};
