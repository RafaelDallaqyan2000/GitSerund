import store, { handleFormChange } from "../..";
import { initForm } from "../../form/actions";
import request from "../../request";
import { FETCH_METHOD_DATA_SUCCESS, FETCH_METHOD_DATA_FAILURE } from "../types";

export const fetchMethodData = (id) => {
  let languageAm = localStorage.getItem("language") === "am";
  return (dispatch) => {
    request(`/api/method/methodDetails`, "POST", {
      methodid: id,
    })
      .then((data) => {
        if (data.success && data.result.length > 0) {
          dispatch(fetchMethodDataSuccess(id, data.result));
        } else {
          dispatch(fetchMethodDataSuccess(id, []));
        }
      })
      .catch(() => {
        dispatch(
          fetchMethodDataFailure({
            type: "fail",
            title: languageAm ? "Սխալ" : "Error",
            text: languageAm
              ? "Չհաջողվեց վերցնել մեթոդի տվյալները"
              : "Failed to fetch method data",
          })
        );
      });
  };
};

const fetchMethodDataSuccess = (id, data) => {
  return {
    type: FETCH_METHOD_DATA_SUCCESS,
    payload: { id, data },
  };
};

const fetchMethodDataFailure = (details) => {
  return {
    type: FETCH_METHOD_DATA_FAILURE,
    payload: { details },
  };
};

export const fetchMethodDetails = (proc) => {
  return (dispatch) => {
    dispatch(initForm(proc));
    dispatch(
      handleFormChange("guideFiles", store.getState().formReducer.guideFiles)
    );
    dispatch(
      handleFormChange(
        "teacherActionTextFiles",
        store.getState().formReducer.teacherActionTextFiles
      )
    );
  };
};
export const showMethodDetails = (index) => {
  const data = store.getState().lessonProcessReducer.addedMethods[index];

  return (dispatch) => {
    // dispatch(changeCount());
    dispatch(initForm(data));
  };
};

// export const getLessonProcessDuration = (index) => {
//   const duration = store.getState().lessonProcessReducer.lessonProcess[index].duration;
//   return (dispatch) => {
//     dispatch(initForm(duration));
//   };
// };
