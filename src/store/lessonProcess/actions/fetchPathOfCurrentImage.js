import request from "../../request";
import { handleFormChange } from "../../form/actions";
import { PATH_OF_CURRENT_IMAGE_FAILURE } from "../types";

export const fetchPathOfCurrentImage = (
  currentImage,
  field,
  setLoading,
  order,
  previousOrder,
  lessonPlanId
) => {
  const formData = new FormData();

  formData.append("file", currentImage);
  formData.append("subfolder", "/" + field);
  formData.append("order", order);
  formData.append("previousOrder", order ? null : previousOrder);
  formData.append("lessonPlanId", lessonPlanId);
  setLoading(true);

  return (dispatch) => {
    let languageAm = localStorage.getItem("language") === "am";

    request(`/api/imageUpload`, "POST", formData, true)
      .then((data) => {
        if (data.success) {
          dispatch(handleFormChange("currentImagePath" + field, data.path));
        } else {
          dispatch(
            fetchPathOfCurrentImageFailure({
              type: "fail",
              title: languageAm ? "Սխալ" : "Error",
              text: data.errorMessage,
            })
          );
        }
      })
      .catch(() => {})
      .finally(() =>
        setTimeout(() => {
          setLoading(false);
        }, 1000)
      );
  };
};

const fetchPathOfCurrentImageFailure = (details) => {
  return {
    type: PATH_OF_CURRENT_IMAGE_FAILURE,
    payload: { details },
  };
};
