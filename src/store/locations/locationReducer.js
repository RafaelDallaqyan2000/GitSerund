import {
  FETCH_REGIONS_FAILURE,
  FETCH_REGIONS_REQUEST,
  FETCH_REGIONS_SUCCESS,
  FETCH_COMMUNITIES_BY_REGION_REQUEST,
  FETCH_COMMUNITIES_BY_REGION_SUCCESS,
  FETCH_COMMUNITIES_BY_REGION_FAILURE,
  FETCH_SCHOOLS_BY_COMMUNITY_REQUEST,
  FETCH_SCHOOLS_BY_COMMUNITY_SUCCESS,
  FETCH_SCHOOLS_BY_COMMUNITY_FAILURE,
} from "./types";

const initialState = {
  loading: true,
  login: false,
  error: null,
  regions: [],
  communities: [],
  schools: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_REGIONS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_REGIONS_SUCCESS:
      return {
        ...state,
        districts: action.payload.districts,
        loading: false,
        login: true,
        error: null,
      };
    case FETCH_REGIONS_FAILURE:
      return {
        ...state,
        loading: false,
        login: false,
        error: action.payload.error,
      };

    case FETCH_COMMUNITIES_BY_REGION_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_COMMUNITIES_BY_REGION_SUCCESS:
      return {
        ...state,
        communities: action.payload.communities.communities,
        loading: false,
        login: true,
        error: null,
      };
    case FETCH_COMMUNITIES_BY_REGION_FAILURE:
      return {
        ...state,
        loading: false,
        login: false,
        error: action.payload.error,
      };

    case FETCH_SCHOOLS_BY_COMMUNITY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_SCHOOLS_BY_COMMUNITY_SUCCESS:
      return {
        ...state,
        schools: action.payload.schools.schools,
        loading: false,
        login: true,
        error: null,
      };
    case FETCH_SCHOOLS_BY_COMMUNITY_FAILURE:
      return {
        ...state,
        loading: false,
        login: false,
        error: action.payload.error,
      };

    default:
      return state;
  }
};

export default reducer;
