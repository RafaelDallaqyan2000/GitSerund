import {
  FETCH_SPECIALIZATIONS_REQUEST,
  FETCH_SPECIALIZATIONS_SUCCESS,
  FETCH_SPECIALIZATIONS_FAILURE,
  FETCH_EDUCATION_FAILURE,
  FETCH_EDUCATION_REQUEST,
  FETCH_EDUCATION_SUCCESS,
} from "./types";

const initialState = {
  loading: true,
  login: false,
  error: null,
  specializations: [],
  educations: [],
  // schools: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SPECIALIZATIONS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_SPECIALIZATIONS_SUCCESS:
      return {
        ...state,
        specializations: action.payload.specializations,
        loading: false,

        error: null,
      };
    case FETCH_SPECIALIZATIONS_FAILURE:
      return {
        ...state,
        loading: false,

        specializations: [],
        error: action.payload.error,
      };

    case FETCH_EDUCATION_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_EDUCATION_SUCCESS:
      return {
        ...state,
        educations: action.payload.educations,
        loading: false,

        error: null,
      };
    case FETCH_EDUCATION_FAILURE:
      return {
        ...state,
        loading: false,
        educations: [],
        error: action.payload.error,
      };

    default:
      return state;
  }
};

export default reducer;
