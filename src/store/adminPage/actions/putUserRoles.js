import request from "../../request";


export function putUserRoles( userId, roleId, callbackFunction) {
    return () => {
        request(`/api/user/roles`, "PUT", {
            userId,
            roleId
        })
            .then(res => callbackFunction(res))
            .catch(err => err)
    }
}


