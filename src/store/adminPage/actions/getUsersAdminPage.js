import request from "../../request";
import {USERS_IN_ADMIN_PAGE} from "../types";

export function getUsersAdminPage({
    page = 1,
    pageCount = 8,
    name
}) {
    return (dispatch) => {
        request(`/api/user?page=${page }&pageCount=${pageCount}&name=${name ?? ""}`)
            .then(( res ) => {
                if( res.success ) {
                    dispatch(userAdminSuccess( res.data ))
                }
            })
            .catch(er => er)
    }
}

const userAdminSuccess = (data) => {
    return {
        type : USERS_IN_ADMIN_PAGE,
        payload : {
            users : data
        }
    }
}
