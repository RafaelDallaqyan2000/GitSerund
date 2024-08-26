import {ORDER_AND_PREVIOUS_ORDER} from "../types";

export const actionOrderAndPreviousOrder = (
    order, previousOrder
) => {
    return {
        type : ORDER_AND_PREVIOUS_ORDER,
        payload : {
            order,
            previousOrder
        }
    }
}