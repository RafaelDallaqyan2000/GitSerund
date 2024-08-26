import {
  SHOW_CHANGE_PAGE,
  IS_PROFILE_EDITING,
  SET_PROFILE_DATA_IN_SIDEBAR,
  FETCH_CLASSES_REQUEST,
  FETCH_CLASSES_SUCCESS,
  FETCH_CLASSES_FAILURE,
  FETCH_SUBJECTS_AND_CLASSES_FAILURE,
  FETCH_SUBJECTS_AND_CLASSES_REQUEST,
  FETCH_SUBJECTS_AND_CLASSES_SUCCESS,
} from "./types";

const initialState = {
  showChangePage: false,
  isEditing: null,
  showProfileData: true,
  classesBySubject: [],
};

const changePageReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_CHANGE_PAGE:
      return {
        ...state,
        showChangePage: action.payload,
      };

    case IS_PROFILE_EDITING:
      return {
        ...state,
        isEditing: action.payload.isEditing,
      };

    case SET_PROFILE_DATA_IN_SIDEBAR:
      return {
        ...state,
        showProfileData: action.payload.showData,
      };

    // case FETCH_CLASSES_REQUEST:
    //   return {
    //     ...state,
    //     loading: true,
    //   };
    case FETCH_CLASSES_SUCCESS:

      return {
        ...state,
        classesBySubject: action.payload.classesBySubject,
        // loading: false,

        error: null,
      };
    case FETCH_CLASSES_FAILURE:
      return {
        ...state,
        // loading: false,
        classesBySubject: [],
        error: action.payload.error,
      };

    case FETCH_SUBJECTS_AND_CLASSES_REQUEST:
      return {
        ...state,
        // loading: false,
        subjectsAndClasses: [],
        // error: action.payload.error,
      };
    case FETCH_SUBJECTS_AND_CLASSES_SUCCESS:
      return {
        ...state,
        // loading: false,
        subjectsAndClasses: action.payload,
        // error: action.payload.error,
      };
    case FETCH_SUBJECTS_AND_CLASSES_FAILURE:
      return {
        ...state,
        // loading: false,
        subjectsAndClasses: [],
        // error: action.payload.error,
      };

    default:
      return state;
  }
};

export default changePageReducer;
