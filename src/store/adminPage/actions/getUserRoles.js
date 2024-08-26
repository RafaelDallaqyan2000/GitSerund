import request from "../../request";
import { changeAdminPageProperty } from "./changeAdminPageProperty";

export function getUserRoles(language = "am") {
  return (dispatch) => {
    request(`/api/user/roles?language=${language}`)
      .then((res) => {
        if (res.success) {
          dispatch(changeAdminPageProperty("allRoles", res.data));
        }
      })
      .catch((e) => e);
  };
}
