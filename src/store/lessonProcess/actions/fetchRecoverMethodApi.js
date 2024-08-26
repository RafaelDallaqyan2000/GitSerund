import axios from "axios";

export function fetchRecoverMethodApi (lessonplanid, methodid, methodorder, fetchUserMethod) {
    return axios
        .post("/api/method/recoverMethod", {
            lessonplanid,
            methodid,
            methodorder
        })
        .then(data => fetchUserMethod(lessonplanid))
        .catch(error => error)
}