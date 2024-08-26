import { SET_PROFILE_DATA_IN_SIDEBAR } from "../types";

export const setProfileDataForSidebar = (showData) => {
  return (dispatch) => {
    dispatch({
      type: SET_PROFILE_DATA_IN_SIDEBAR,
      payload:{showData}
    });
  };
};
