import axios from "axios";


export function deleteUsers (
    userId,
    callback = () => {}
) {

    const language = localStorage.getItem("language");
    return (dispatch) => {
        axios
            .delete(`/api/user?id=${userId}&language=${language}`)
            .then((res) => {
                callback(res.data);
                return res;
            })
            .catch((er) => {
                console.error(er.message, 'deleteUsers api');
                return er;
            });
    }
}
