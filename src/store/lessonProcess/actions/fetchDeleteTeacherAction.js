import axios from "axios";
import store from "../../../store"
import {handleFormChange} from "../../form/actions";

export const fetchDeleteTeacherAction = (
    teacherActionId,
    fetchUserMethod,
    lessonProcId,
    studentAction,
) => {
    return axios
        .post("/api/method/deleteTeacherAction", {
            "teacherActionId": +teacherActionId
        })
        .then((data) => {
            store.dispatch(handleFormChange("teacherActionActive", false))
            fetchUserMethod(lessonProcId);

            if(studentAction === null) {
                store.dispatch(handleFormChange("studentActionActive", false))
            }
        })
        .catch(error => error)
}