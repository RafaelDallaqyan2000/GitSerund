import store, { handleFormChange } from "../..";
import {
  FETCH_SCHOOLS_BY_COMMUNITY_REQUEST,
  FETCH_SCHOOLS_BY_COMMUNITY_SUCCESS,
  FETCH_SCHOOLS_BY_COMMUNITY_FAILURE,
} from "../types";

export const fetchSchoolsByCommunity = (communityId, language) => {
  const id = store.getState().formReducer.communityId;

  return (dispatch) => {
    dispatch(fetchSchoolsByCommunityRequest);
    fetch(
      `/api/schoolsByCommunity${
        id || communityId ? `/${id || communityId}` : ""
      }`
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.success) {
          dispatch(handleFormChange("schools", data.schools));
          dispatch(fetchSchoolsByCommunitySuccess(data));
        }
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(fetchSchoolsByCommunityFailure(errorMsg));
      });
  };
};

const fetchSchoolsByCommunityRequest = () => {
  return {
    type: FETCH_SCHOOLS_BY_COMMUNITY_REQUEST,
  };
};

const fetchSchoolsByCommunitySuccess = (data) => {
  const schools = data ? data : [];
  return {
    type: FETCH_SCHOOLS_BY_COMMUNITY_SUCCESS,
    payload: {
      schools,
    },
  };
};

const fetchSchoolsByCommunityFailure = (error) => {
  return {
    type: FETCH_SCHOOLS_BY_COMMUNITY_FAILURE,
    payload: { error },
  };
};
