import {
  INIT_FORM,
  CLEAN_FROM,
  HANDLE_FORM_CHANGE,
  HANDLE_FORM_ON_CHANGE_ARRAY,
  DELETE_FILE_SUCCESS,
  INSERT_IMAGE_REQUEST,
  INSERT_IMAGE_SUCCESS,
  INSERT_IMAGE_FAILURE,
  UPLOAD_FILE_REQUEST,
  UPLOAD_FILE_SUCCESS,
  UPLOAD_FILE_FAILURE,
  DELETE_FILE_REQUEST,
  DELETE_FILE_FAILURE,
} from "./types";

const initialState = {
  selectValueAdminPage: "",
  selectIdOnAdminPage: 0,
  message: "",
  status: "",
  createOrEditLessPlanError: "",
  createOrEditLessonPlanSuccess: "",
  subjects: [],
  uploadedImagesList: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case DELETE_FILE_REQUEST:
      return {
        ...state,
        status: action.payload.status,
      };
    case DELETE_FILE_SUCCESS:
      return {
        ...state,
        [action.payload.key]: state[action.payload.key].filter(
          (temp, index) => index !== action.payload.index
        ),
      };
    case DELETE_FILE_FAILURE:
      return {
        ...state,
        status: action.payload.status,
        message: action.payload.message,
      };

    //insert image
    case INSERT_IMAGE_REQUEST:
      return {
        ...state,
        status: action.payload.status,
      };
    case INSERT_IMAGE_SUCCESS:
      return {
        ...state,
        status: action.payload.status,
        uploadedImagesList: [
          ...(state.uploadedImagesList || []),
          action.payload.value,
        ],
        [action.payload.key]: action.payload.value,
      };
    case INSERT_IMAGE_FAILURE:
      return {
        ...state,
        status: action.payload.status,
        message: action.payload.message,
      };

    //upload file
    case UPLOAD_FILE_REQUEST:
      return {
        ...state,
        status: action.payload.status,
      };
    case UPLOAD_FILE_SUCCESS:
      return {
        ...state,
        status: action.payload.status,
      };
    case UPLOAD_FILE_FAILURE:
      return {
        ...state,
        status: action.payload.status,
        message: action.payload.message,
      };

    //other
    case HANDLE_FORM_CHANGE:
      return {
        ...state,
        [action.payload.key]: action.payload.value,
      };
    case HANDLE_FORM_ON_CHANGE_ARRAY:
      return {
        ...state,
        [action.payload.firstKey]: {
          ...state[action.payload.firstKey],
          [action.payload.secondKey]: action.payload.value,
        },
      };
    case CLEAN_FROM:
      return {};
    case INIT_FORM:
      return { ...state, ...action.payload.form };
    default:
      return state;
  }
};

export default reducer;
