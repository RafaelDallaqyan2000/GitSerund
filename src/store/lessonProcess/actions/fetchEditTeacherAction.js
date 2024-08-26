import axios from "axios";

export function fetchEditTeacherAction(
    teacheractionid,
    teacheraction,
    teacheractiondesc,
    teachertext,
    guide,
    callbackEditUserAction
){
    return axios
        .post("/api/method/editTeacherAction", {
            teacheractionid,
            teacheraction,
            teacheractiondesc,
            teachertext,
            guide
        })
        .then(data => {callbackEditUserAction()})
}