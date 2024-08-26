import {DELETE_BOARD_IMAGE} from "../types";

export function deleteRightSidebarBoardImage(imageName) {

    return {
        key : DELETE_BOARD_IMAGE,
        payload : {
            deleteBoardImage : imageName
        }
    }
}