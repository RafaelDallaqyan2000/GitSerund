import axios from "axios";
import store, {handleFormChange} from "../../../store"

export function fetchRecoverTeacherAction(
    teacherActionId,
    fetchUserMethod,
    lessonProcId,
) {
    return axios
        .post("/api/method/recoverTeacherAction", {
            "teacheractionid": +teacherActionId
        })
        .then((data) => {
            store.dispatch(handleFormChange("teacherActionActive", true))
            fetchUserMethod(lessonProcId);
        })
        .catch(error => error)
}
