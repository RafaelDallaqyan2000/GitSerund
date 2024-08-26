import {DELETE_OR_RECOVER_ACTION_IF_NEXT} from "../types";

export function deleteOrRecoverActionIfNext(
    studentOrTeacherActionId,
    lessonProcId,
    nextConfirm
) {
    return {
       type : DELETE_OR_RECOVER_ACTION_IF_NEXT,
       payload : {
           studentOrTeacherActionId,
           lessonProcId,
           nextConfirm
       }
    }
}