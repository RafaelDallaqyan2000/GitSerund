import request from "../../request";
import store, {handleFormChange} from "../..";
import {
  FETCH_USER_METHOD_REQUEST,
  FETCH_USER_METHOD_SUCCESS,
  FETCH_USER_METHOD_FAILURE,
} from "../types";
import login from "../../../pages/Login/Login";

export const fetchUserMethod = (lessonPlanId) => {
  return (dispatch) => {
    dispatch(fetchUserMethodRequest());
    request(`/api/lessonPlan/userMethod`, "POST", {
      lessonPlanId,
    })
      .then((data) => {
        if (data.success && data.result.length > 0) {

          let minute = 0;

          data.result.map(e => {
            return e.actions.map(action => {
              if(!e.isMethodDeleted && (action.studentActionActive || action.teacherActionActive)) {
                minute += Number(action?.duration);
              }
                if(action.duration === 0){
                  action.duration = null
                }
                return action
            })
          })

          localStorage.setItem('lessonPlanMinute', minute);
          if(minute < 45) {
            localStorage.setItem('lessonPlanMinuteFlag', 'false');
          }

          dispatch(fetchUserMethodSuccess(data.result));

        } else {
          dispatch(
            fetchUserMethodSuccess([
              { methodId: null, methodName: "Մեթոդ", actions: [] },
            ])
          );
        }
      })
      .catch((e) => {
        dispatch(fetchUserMethodFailure(e.message));
      });
  };
};

const fetchUserMethodRequest = () => {
  return {
    type: FETCH_USER_METHOD_REQUEST,
  };
};

export const fetchUserMethodSuccess = (data) => {
  const methods = data ? data : [];
  return {
    type: FETCH_USER_METHOD_SUCCESS,
    payload: {
      methods,
    },
  };
};

const fetchUserMethodFailure = (error) => {
  return {
    type: FETCH_USER_METHOD_FAILURE,
    payload: { error },
  };
};
