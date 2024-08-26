import axios from "axios";
import store from "../../../store"
import {handleFormChange} from "../../form/actions";

export function fetchRecoverStudentAction(
    studentactionid,
    fetchUserMethod,
    lessonProcId,
) {
    return axios
        .post("/api/method/recoverStudentAction", {
            "studentactionid": +studentactionid
        })
        .then(() => {
            store.dispatch(handleFormChange("studentActionActive", true))
            fetchUserMethod(lessonProcId);
        })
        .catch(error => error)
}