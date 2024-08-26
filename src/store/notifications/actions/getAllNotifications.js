import { GET_ALL_NOTIFICATIONS } from "../types";

export function getAllNotifications(page, typeId) {
  const language = localStorage.getItem("language");
  return (dispatch) => {
    fetch(
      `/api/notification?page=${page ? page : 1}&typeId=${
        typeId ? typeId : ""
      }&language=${language}`
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.success) {
          dispatch(allNotificationsArr(data));
        }
      })
      .catch((error) => error);
  };
}

const allNotificationsArr = (data) => {
  return {
    type: GET_ALL_NOTIFICATIONS,
    payload: {
      allNotifications: data.data.notifications,
      pageCount: Math.ceil(data.data.count / 7),
    },
  };
};
