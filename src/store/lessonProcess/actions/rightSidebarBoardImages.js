import {RIGHT_SIDEBAR_IMAGES} from "../types";

export function rightSidebarBoardImages(clearArr, imageName) {

    return {
        type : RIGHT_SIDEBAR_IMAGES,
        payload : {
            boardImages : imageName,
            clearArr
        }
    }
}