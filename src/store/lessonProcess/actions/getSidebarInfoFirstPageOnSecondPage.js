import { RIGHT_SIDEBAR_FIRST_PAGE } from "../types";
import axios from "axios";

export function getSidebarInfoFirstPageOnSecondPage(lessonProcId) {
  const language = localStorage.getItem("language");
  return (dispatch) => {
    axios
      .get(
        `/api/lessonPlan/newCreatedInfo?id=${+lessonProcId}&language=${language}`
      )
      .then((data) => {
        dispatch(typeSidebarInfoSecondPage(data.data.data));
      })
      .catch((error) => {
        throw error;
      });
  };
}

function typeSidebarInfoSecondPage(rightSidebarInfoFirstPage) {
  return {
    type: RIGHT_SIDEBAR_FIRST_PAGE,
    payload: {
      rightSidebarInfoFirstPage,
    },
  };
}
