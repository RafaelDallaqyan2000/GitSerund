import axios from "axios";
import { handleFormChange } from "../../form/actions";
import { isLoadingScreen } from "./isLoadingScreen";

export function navigateToEmis() {
  return (dispatch) => {
    axios
      .get("/auth/login/emis")
      .then((data) => {
        if (data.data) {
          dispatch(handleFormChange("loadingForEmisBtn", false));
          window.location.replace(data.data.data);
        }
        return data.data.data;
      })
      .catch((error) => {
        return error;
      });
  };
}

export function signInWithEmis(emisKey = "", navigate = () => {}) {
  return (dispatch) => {
    axios
      .get(`auth/login/emis/last-step?_is=${emisKey}`)
      .then((data) => {
        if (data.data.user.token) {
          // navigate('/home');
          window.location.reload();
        }
        return data;
      })
      .catch((error) => {
        console.log(error, "error in emis last-step");
        return error;
      })
      .finally(() => {
        // dispatch(isLoadingScreen(false));
      });
  };
}
