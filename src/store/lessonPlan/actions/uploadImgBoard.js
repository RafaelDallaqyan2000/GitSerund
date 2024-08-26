import request from "../../request";
import { handleFormChange } from "../../../store";

export const uploadImgBoard = (
  language,
  field,
  file,
  files,
  forceRender,
  id = 1,
  setLoading,
  actionId,
  handleSuccess,
  order
) => {
  const formData = new FormData();
  const uniqueFolder = actionId
    ? `lessonPlans/${id}/${order}/${field}`
    : `${field}${Date.now()}`; //${Date.now()}

  formData.append(uniqueFolder, file, file.name);
  formData.append("key", uniqueFolder);
  formData.append("lessonPlanId", parseInt(id));
  formData.append("isImage", true);
  formData.append("order", order);
  formData.append("language", language);

  return (dispatch) => {
    const fileObject = {
      file: file,
      path: "",
      upLoading: true,
      error: false,
    };
    dispatch(handleFormChange(field, files));

    // forceRender();
    const isFormdata = true;
    let imageName = `${uniqueFolder}/${file.name}`;

    setLoading(true);
    request(`/api/files/upload`, "POST", formData, isFormdata)
      .then((data) => handleSuccess(data, fileObject, imageName, file))
      .catch((e) => {
        fileObject.upLoading = false;
        fileObject.error = true;
        forceRender();
      })
      .finally(() =>
        setTimeout(() => {
          setLoading(false);
        }, 1000)
      );
  };
};
