import { USERS_IN_ADMIN_PAGE } from "../types";

export function getFilterArrAdminPage(
  language = "am",
  userTypeId = null,
  subjectId = null,
  classId = null,
  page = 1,
  searchText = null,
  pageCount = 8
) {
  return (dispatch) => {
    fetch(`api/user/byFilters`, {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({
        page,
        pageCount,
        userTypeId,
        subjectId,
        classId: classId ? classId : null,
        searchText,
        language,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.success) {
          dispatch(allUserAdminSuccess(data.data));
        }
      })
      .catch((error) => error);
  };
}

const allUserAdminSuccess = (data) => {
  return {
    type: USERS_IN_ADMIN_PAGE,
    payload: {
      allUsers: data,
    },
  };
};
