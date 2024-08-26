import request from "../../request";
import {GET_LESSON_PLAN_PRINT_FILES} from "../types";

export function getAllPrintFiles(lessonPlanId = "" ) {
    return (dispatch) => {

        request(`/api/files/fileNames/${lessonPlanId}`, )
            .then((data) => {
                const editData = data.data?.map(e => {
                    return {
                        ...e,
                        isChecked : false
                    }

                })
                dispatch(reduxPrintFiles(editData));
            })
            .catch((e) => e);
    };
}

export const reduxPrintFiles = (printFiles) => {
    return {
        type : GET_LESSON_PLAN_PRINT_FILES,
        payload : {
            printFiles
        }
    }
}