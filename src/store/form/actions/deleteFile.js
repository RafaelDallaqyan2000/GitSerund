import {
  DELETE_FILE_REQUEST,
  DELETE_FILE_SUCCESS,
  DELETE_FILE_FAILURE,
} from "../types";
import ApiFiles from "../../../Api/ApiFiles";

export function deleteFile(params) {
  const { filePath, key, index } = params;

  return async (dispatch) => {
    try {
      dispatch({
        type: DELETE_FILE_REQUEST,
        payload: { status: "request" },
      });

      const { data } = await ApiFiles.deleteFile(filePath);

      if (!data.success) throw new Error();

      dispatch({
        type: DELETE_FILE_SUCCESS,
        payload: {
          status: "success",
          key,
          index,
        },
      });
    } catch (e) {
      dispatch({
        type: DELETE_FILE_FAILURE,
        payload: {
          status: "fail",
          message: e?.response?.data?.errorMessage,
        },
      });
    }
  };
}
