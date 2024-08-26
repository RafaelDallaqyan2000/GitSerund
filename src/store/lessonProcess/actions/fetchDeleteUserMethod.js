import axios from "axios";

export const fetchDeleteUserMethodApi = (lessonplanid, methodid, methodorder, fetchUserMethod) => {
    return axios
        .post("/api/method/deleteUserMethod", {
            lessonplanid: +lessonplanid,
            methodid,
            methodorder
        })
        .then(data => {
            fetchUserMethod(lessonplanid)
        })
        .catch(error => error)
}







