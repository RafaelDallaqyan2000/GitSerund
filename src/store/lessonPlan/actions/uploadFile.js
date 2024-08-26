import request from "../../request";
import store, { handleFormChange } from "../../../store";
import login from "../../../pages/Login/Login";
import {rightSidebarBoardImages} from "../../lessonProcess/actions/rightSidebarBoardImages";
import {pdfFilesInAction} from "../../lessonProcess/actions/pdfFilesInAction";

export const uploadFile = (
  field,
  file,
  files,
  forceRender,
  id = 1,
  setLoading,
  actionId,
  handleSuccess
) => {

  const formData = new FormData();
  const pathName = window.location.pathname.split("/");
  const procId = pathName[pathName.length - 1];
  const uniqueFolder = (store.getState().formReducer.fromTemplate !== undefined)
      ? `lessonPlans/${procId}/${actionId}/${field}`
      : `${field}${Date.now()}` ;   //${Date.now()}

  formData.append(uniqueFolder, file, file.name);
  formData.append("key", uniqueFolder);
  formData.append("lessonPlanId", parseInt(id));
  formData.append("isImage", false);

  return (dispatch) => {
    const fileObject = {
      file: file,
      path: "",
      upLoading: true,
      error: false,
    };
    dispatch(handleFormChange( field, files ));

    // forceRender();
    const formdata = true;

    let fileName = `${uniqueFolder}/${ file.name }`;
    setLoading(true);
    request(`/api/files/upload`, "POST", formData, formdata)
      .then((data) => handleSuccess(data, file, fileObject, fileName))
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
