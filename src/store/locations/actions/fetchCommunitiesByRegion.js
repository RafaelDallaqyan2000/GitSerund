import {
  FETCH_COMMUNITIES_BY_REGION_REQUEST,
  FETCH_COMMUNITIES_BY_REGION_SUCCESS,
  FETCH_COMMUNITIES_BY_REGION_FAILURE,
} from "../types";
import {handleFormChange} from "../../form/actions";

export const fetchCommunitiesByRegion = (callback = () => {}, id) => {
  // const id = store.getState()?.formReducer?.selectedRegion?.id
  return (dispatch) => {
    dispatch(fetchCommunitiesByRegionRequest);
    fetch(`/api/communitiesByRegion${id ? "/" + id : ''}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.success) {
          callback();
          dispatch(handleFormChange('communities', data.communities));
          dispatch(fetchCommunitiesByRegionSuccess(data));
        }
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(fetchCommunitiesByRegionFailure(errorMsg));
      });
  };
};

const fetchCommunitiesByRegionRequest = () => {
  return {
    type: FETCH_COMMUNITIES_BY_REGION_REQUEST,
  };
};

const fetchCommunitiesByRegionSuccess = (data) => {
  const communities = data ? data : [];
  return {
    type: FETCH_COMMUNITIES_BY_REGION_SUCCESS,
    payload: {
      communities,
    },
  };
};

const fetchCommunitiesByRegionFailure = (error) => {
  return {
    type: FETCH_COMMUNITIES_BY_REGION_FAILURE,
    payload: { error },
  };
};
