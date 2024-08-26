import axios from "axios";
import { handleFormChange } from "../../form/actions";

export const getAllSchoolData = () => {
  return (dispatch) => {
    axios
      .get("/auth/userData/school/data")
      .then((data) => {
        if (data.data.success) {
          dispatch(handleFormChange("allSchoolDataForEdit", data.data.data));
          return data.data.data;
        }
      })
      .catch((error) => {
        console.log(error.message);
        throw error.message;
      });
  };
};
