import axios from "axios";
import store from "../../../store";
import { handleHomeChange } from "./handleHomeChange";

export const getAllLikeSubjects = (
  lsnPlanCount = 10,
  searchString = "",
  viewedUserId
) => {
  const { orderBy, selectedColumn } = store.getState().tableReducer;
  const language = localStorage.getItem("language");
  return (dispatch) => {
    axios
      .post("/api/lessonPlan/userLessonPlans", {
        filterType: 2,
        page: 1,
        pageCount: lsnPlanCount,
        orderBy,
        selectedColumn,
        searchString,
        viewedUserId,
        isOrderAsc: false,
        orderColumn: "date",
        language,
      })
      .then((data) => {
        dispatch(handleHomeChange("tableDetails", data.data.data.details));
      })
      .catch((err) => {
        console.log(err);
        throw err;
      });
  };
};
