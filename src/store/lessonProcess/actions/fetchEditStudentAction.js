import axios from "axios";

export function fetchEditStudentAction(
    studentactionid,
    studentaction,
    studentactiondesc,
    studenttext
) {
    return axios
        .post("/api/method/editStudentAction", {
            studentactionid,
            studentaction,
            studentactiondesc,
            studenttext
        })
        .then(() => {
            // alert("Փոփոխված է")
        })
        .catch(error => error)
}