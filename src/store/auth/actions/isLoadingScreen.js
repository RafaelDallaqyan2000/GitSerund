import {IS_LOADING_SCREEN} from "../../users/types";

export function isLoadingScreen(loading= false) {
    return {
        type: IS_LOADING_SCREEN,
        payload: {
            authLoading: loading
        }
    }
}
