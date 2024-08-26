import { FETCH_PROF_DETAILS_FAILURE, SET_USER } from "../types";
import { initForm, handleFormChange } from "../../form/actions";
import { isLoadingScreen } from "./isLoadingScreen";
import axios from "axios";

export const fetchProfileDetails = (language, id) => {
  return (dispatch) => {
    axios
      .get(
        `/auth/userData${
          id ? `?id=${id}&language=${language}` : `?language=${language}`
        }`
      )
      .then((data) => {
        if (data.data.success) {
          const userData = data.data.data[0];
          userData.subjectIds = userData.subjects?.map((subject) => {
            return {
              id: subject.subjectId,
              name: subject.name,
              subArray: subject.classes,
            };
          });

          userData.phone_code = userData.phone.substring(0, 3);
          userData.phone_number = userData.phone.substring(
            3,
            userData.phone.length
          );
          dispatch(initForm(userData));
          dispatch(setUser(userData));
          dispatch(handleFormChange("inProfilePage", true));
          dispatch(handleFormChange("userData", userData));
          dispatch(handleFormChange("selectedRegionId", userData?.regionId));
          dispatch(handleFormChange("districtId", userData?.districtId));
          dispatch(handleFormChange("communityId", userData?.communityId));
          localStorage.setItem("showSubjects", userData?.showSubjects);
        }
        return data.data.data;
      })
      .catch((e) => {
        dispatch(fetchSelectedMethodsFailure(e.message));
        // if (localStorage.getItem("isAuthorized") === "true") {
        //   localStorage.removeItem("isAuthorized");
        //   window.location.reload();
        // }
      })
      .finally(() => {
        dispatch(isLoadingScreen(false));
      });
  };
};
const setUser = (user) => {
  return {
    type: SET_USER,
    payload: { user },
  };
};

const fetchSelectedMethodsFailure = (error) => {
  return {
    type: FETCH_PROF_DETAILS_FAILURE,
    payload: { error },
  };
};
