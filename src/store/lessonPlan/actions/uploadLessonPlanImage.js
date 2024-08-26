import {
  UPLOAD_LESSON_PLAN_IMAGE_REQUEST,
  UPLOAD_LESSON_PLAN_IMAGE_SUCCESS,
  UPLOAD_LESSON_PLAN_IMAGE_FAILURE,
} from "../types";
import ApiFiles from "../../../Api/ApiFiles";

export function uploadLessonPlanImage(params) {
  const { backgroundImg, lessonPlanId, controller } = params;
  const bgImagePrepositionDate = backgroundImg?.name?.split("?Date=");

  if (
    Array.isArray(bgImagePrepositionDate) &&
    bgImagePrepositionDate.length > 1
  ) {
    bgImagePrepositionDate.pop();
  }

  return async (dispatch) => {
    let image = null;
    let blob = null;

    if (Object.keys(backgroundImg).length) {
      blob = await fetch(backgroundImg._src).then((r) => r.blob());
      blob.name = bgImagePrepositionDate;
      blob.lastModified = new Date();

      image = new File([blob], bgImagePrepositionDate, {
        type: blob.type,
      });
    }

    try {
      dispatch({
        type: UPLOAD_LESSON_PLAN_IMAGE_REQUEST,
        payload: {
          status: "request",
          message: "",
        },
      });

      const formData = new FormData();

      formData.append("backgroundImg", image);
      formData.append("lessonPlanId", lessonPlanId);

      const { data } = await ApiFiles.uploadLessonPlanImage(
        formData,
        controller
      );

      if (!data.success) {
        throw new Error(data.message);
      }

      dispatch({
        type: UPLOAD_LESSON_PLAN_IMAGE_SUCCESS,
        payload: {
          backgroundImg: `${data.data}?Date=${Date.now()}`,
          status: "success",
          message: "",
          lessonPlanId,
        },
      });
    } catch (e) {
      dispatch({
        type: UPLOAD_LESSON_PLAN_IMAGE_FAILURE,
        payload: {
          status: "fail",
          message: e.response.data.message,
        },
      });
    }
  };
}
