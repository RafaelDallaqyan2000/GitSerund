import {
  FETCH_HOME_DETAILS_REQUEST,
  FETCH_HOME_DETAILS_SUCCESS,
  FETCH_HOME_DETAILS_FAILURE,
  FETCH_TABLE_LSNPLAN_DETAILS_REQUEST,
  FETCH_TABLE_LSNPLAN_DETAILS_SUCCESS,
  HANDLE_HOME_CHANGE,
} from "./types";
import {UPLOAD_LESSON_PLAN_IMAGE_SUCCESS} from "../lessonPlan/types";

const initialState = {
  error: false,
  loading: false,
  tableDetails: [],
  pageCount: 0,
  details: [],
  userId: null,
};

const homeReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_HOME_DETAILS_REQUEST:
      return {
        ...state,
        error: false,
        loading: true,
      };
    case FETCH_HOME_DETAILS_SUCCESS:
      return {
        ...state,
        error: false,
        loading: true,
        details: action.payload.details,
        userId: action.payload.userId,
      };
    case FETCH_HOME_DETAILS_FAILURE:
      return {
        ...state,
        error: true,
        loading: true,
        pageCount: 0,
        tableDetails: [],
        details: [],
      };
    case FETCH_TABLE_LSNPLAN_DETAILS_SUCCESS:
      return {
        ...state,
        pageCount: action.payload.pageCount,
        tableDetails: action.payload.details,
      };

    case UPLOAD_LESSON_PLAN_IMAGE_SUCCESS :
      const {lessonPlanId, backgroundImg} = action.payload;

      return {
        ...state,
        tableDetails: state.tableDetails.map(lsnPlan => lessonPlanId === lsnPlan.id ? {...lsnPlan, backgroundImg} : lsnPlan),
      };
    case FETCH_TABLE_LSNPLAN_DETAILS_REQUEST:
      return {
        ...state,
        pageCount: 0,
        tableDetails: [],
      };
    case HANDLE_HOME_CHANGE:
      return {
        ...state,
        [action.payload.key]: action.payload.value,
      };

    default:
      return state;
  }
};

export default homeReducer;
