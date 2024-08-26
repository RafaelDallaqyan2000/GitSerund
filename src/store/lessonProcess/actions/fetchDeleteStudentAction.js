import axios from "axios";
import store from "../../../store"
import {connect} from "react-redux";
import {handleFormChange} from "../../form/actions";

export const fetchDeleteStudentAction = (
    studentactionid,
    fetchUserMethod,
    lessonProcId,
    teacherAction,
) => {
    return axios
        .post("/api/method/deleteStudentAction", {
            "studentactionid" : +studentactionid
        })
        .then((data) => {
            store.dispatch(handleFormChange("studentActionActive", false))
            fetchUserMethod(lessonProcId);

            if(teacherAction === null) {
                store.dispatch(handleFormChange("teacherActionActive", false))
            }
        })
        .catch(error => error)
}