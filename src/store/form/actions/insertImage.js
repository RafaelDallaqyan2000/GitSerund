import {
    INSERT_IMAGE_REQUEST,
    INSERT_IMAGE_SUCCESS,
    INSERT_IMAGE_FAILURE,
} from "../types";
import ApiFiles from "../../../Api/ApiFiles";

export function insertImage({currentImage, field, lessonPlanId, order}) {

    return async (dispatch) => {
        try {
            dispatch({
                type: INSERT_IMAGE_REQUEST,
                payload: {status: `${field}Request`}
            });

            const formData = new FormData();
            formData.append("file", currentImage);
            formData.append("subfolder", `/${field}Image`);
            formData.append("lessonPlanId", lessonPlanId || null);
            formData.append("order", order || null);

            const {data} = await ApiFiles.insertImage(formData);

            if (!data?.success) throw new Error();

            dispatch({
                type: INSERT_IMAGE_SUCCESS,
                payload: {
                    status: `${field}Success`,
                    value: data?.path,
                    key: 'currentImagePath' + `${field}Image`,
                },
            });
        } catch (e) {
            dispatch({
                type: INSERT_IMAGE_FAILURE,
                payload: {
                    status: `${field}Fail`,
                    message: e?.response?.data?.errorMessage,
                },
            });
        }
    }
}
