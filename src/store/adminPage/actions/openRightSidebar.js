import {OPEN_RIGHT_SIDEBAR_IN_ADMIN_PAGE} from "../types";

export function openRightSidebar(openOrCloseRightSidebar) {
    return {
        type : OPEN_RIGHT_SIDEBAR_IN_ADMIN_PAGE,
        payload : {
            openOrCloseRightSidebar
        }
    }
}