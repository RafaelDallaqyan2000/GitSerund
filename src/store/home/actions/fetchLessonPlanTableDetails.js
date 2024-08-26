import request from "../../request";
import {
  FETCH_TABLE_LSNPLAN_DETAILS_SUCCESS,
  FETCH_TABLE_LSNPLAN_DETAILS_FAILURE,
  FETCH_TABLE_LSNPLAN_DETAILS_REQUEST,
} from "../types";
import { initForm, handleFormChange } from "../../form/actions";
import store from "../..";

export const fetchLessonPlanTableDetails = (
  language = "am",
  id,
  classs = null,
  searchString = null,
  page = 1,
  orderColumn = "date",
  isOrderAsc = false,
  rowCount = 10,
  callbackFunction = () => {}
) => {
  const { orderBy, selectedColumn } = store.getState().tableReducer;
  const { likedSubjects = false } = store.getState().formReducer;
  return (dispatch) => {
    // there is no loading property
    // dispatch(fetchLessonPlanTableDetailsRequest());
    //
    fetch("/api/lessonPlan/lessonPlans", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        subjectId: id,
        classs,
        searchString: searchString?.trim(),
        page,
        pageCount: rowCount,
        orderBy,
        selectedColumn,
        isOrderAsc,
        orderColumn,
        favourites: likedSubjects,
        language,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        // dispatch(handleFormChange("tableDetails",data.data))
        callbackFunction(data.data);
        dispatch(handleFormChange("lsnRowCount", data.count));

        dispatch(handleFormChange("tableDetails", data.data));

        data.rowCount = rowCount;
        dispatch(fetchLessonPlanTableDetailsSuccess(data));
      });
  };
};

const fetchLessonPlanTableDetailsRequest = () => {
  return {
    type: FETCH_TABLE_LSNPLAN_DETAILS_REQUEST,
  };
};

const fetchLessonPlanTableDetailsSuccess = (data) => {
  let details = [];
  let pageCount = 0;
  if (data.data) {
    details = data.data;
    if (details.length > 0) {
      pageCount = Math.ceil(details[0].count / data.rowCount);
    }
  }
  return {
    type: FETCH_TABLE_LSNPLAN_DETAILS_SUCCESS,
    payload: {
      details,
      pageCount,
    },
  };
};

const fetchLessonPlanTableDetailsFailure = (error) => {
  return {
    type: FETCH_TABLE_LSNPLAN_DETAILS_FAILURE,
    payload: { error },
  };
};
