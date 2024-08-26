import {CHECK_MAIN_CONTAINER_INFO} from "../types";

export const checkMainContainerInfo = (value) => {
    return {
        type : CHECK_MAIN_CONTAINER_INFO,
        payload : {
            mainChecked : value
        }
    }
}