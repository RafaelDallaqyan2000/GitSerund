import { FETCH_TABLE_LSNPLAN_DETAILS_SUCCESS } from "../types";
import { handleFormChange } from "../../form/actions";
import store from "../..";

export const fetchResponsiveLessonPlanTableDetails = ({
  subjectId,
  classs = null,
  searchString = null,
  page = 1,
  orderColumn = "date",
  rowCount = 10,
  favourites = false,
  callbackFunction = () => {},
  language = "am",
}) => {
  const { orderBy, selectedColumn } = store.getState().tableReducer;
  return (dispatch) => {
    fetch("/api/lessonPlan/lessonPlans", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        subjectId,
        classs,
        searchString: searchString?.trim(),
        page,
        pageCount: rowCount,
        orderBy,
        selectedColumn,
        isOrderAsc: false,
        orderColumn,
        favourites,
        language,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        // dispatch(handleFormChange("tableDetails",data.data))
        callbackFunction(data.data);
        dispatch(handleFormChange("lsnRowCount", data.count));

        data.rowCount = rowCount;
        dispatch(fetchLessonPlanTableDetailsSuccess(data));
      });
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
