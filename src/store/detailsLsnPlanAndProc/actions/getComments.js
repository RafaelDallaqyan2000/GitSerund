import {GET_COMMENTS_SUCCESS, GET_COMMENTS_FAILURE} from "../types";
import axios from "axios";
import {handleFormChange} from "../../../store";

export const getComments = (obj) => {
    return (dispatch) => {
        axios.post("/api/lessonPlan/getComments", {
                lessonPlanId: obj.lessonPlanId,
                typeId: obj.typeId,
                userMethodId: obj.userMethodId,
                rowCount: obj.rowCount,
                page: obj.page,
            })
            .then((data) => {
                if (data.data.data.length > 0) {
                    dispatch(handleFormChange("allComments", data.data.data));
                } else {
                    dispatch(handleFormChange("allComments", []));
                }
                // dispatch(fetchCommentsSuccess(data));
            })
            .catch((e) => {
                dispatch(handleFormChange("allComments", []));
                // dispatch(fetchCommentsFailure(e.message));
                // alert(e.message)
            });
    };
};

const fetchCommentsSuccess = (data) => {
    return {
        type: GET_COMMENTS_SUCCESS,
        payload: {},
    };
};

const fetchCommentsFailure = (error) => {
    return {
        type: GET_COMMENTS_FAILURE,
        payload: {error},
    };
};
