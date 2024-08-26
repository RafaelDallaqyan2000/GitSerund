import {
  UPLOAD_FILE_REQUEST,
  UPLOAD_FILE_SUCCESS,
  UPLOAD_FILE_FAILURE,
} from "../types";
import ApiFiles from "../../../Api/ApiFiles";
import store from "../../configureStore";
import { handleFormChange } from "./handleFormChange";

export function uploadFile({
  language,
  id = 1,
  field,
  file,
  currentAction,
  files,
  order,
  isImage = false,
  actionId,
}) {
  return async (dispatch) => {
    try {
      dispatch({
        type: UPLOAD_FILE_REQUEST,
        payload: { status: `${currentAction}Request` },
      });

      const formData = new FormData();
      const uniqueFolder =
        store.getState().formReducer.fromTemplate !== undefined
          ? `lessonPlans/${id}/${order}/${field}`
          : `${field}${Date.now()}`;

      let fileName = `${uniqueFolder}/${file.name}`;

      formData.append(uniqueFolder, file);
      formData.append("key", uniqueFolder);
      formData.append("lessonPlanId", +id || null);
      formData.append("isImage", isImage);
      formData.append("order", order || null);
      formData.append("actionId", actionId || null);
      formData.append("language", language || "am");

      const fileObject = {
        file: file,
        path: "",
        upLoading: true,
        error: false,
      };
      dispatch(handleFormChange(field, files));

      const { data } = await ApiFiles.uploadFile(formData);

      if (!data.success) throw new Error();

      files.push(fileObject);
      fileObject.name = fileObject.file.name;
      fileObject.path = data.path;
      fileObject.upLoading = false;
      file.path = data.path;

      const filePathSplit = data.path.split("/");
      let newFilePath = filePathSplit[filePathSplit.length - 1];
      const newFileName = fileName.split("/");
      newFileName[newFileName.length - 1] = newFilePath;
      const uploadPath = newFileName.join("/");

      dispatch({
        type: UPLOAD_FILE_SUCCESS,
        payload: {
          status: `${currentAction}Success`,
          key: field,
          value: { file },
          pdfFileArr: uploadPath,
          clearPdfArr: false,
        },
      });
    } catch (e) {
      dispatch({
        type: UPLOAD_FILE_FAILURE,
        payload: {
          status: `${currentAction}Fail`,
          message: e?.response?.data?.errorMessage,
        },
      });
    }
  };
}
