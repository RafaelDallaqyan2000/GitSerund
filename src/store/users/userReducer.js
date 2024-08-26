import {
    GET_USER_ACTIVITIES_REQUEST,
    GET_USER_ACTIVITIES_SUCCESS,
    GET_USER_ACTIVITIES_FAILURE,
    GET_USER_COMMENTS_REQUEST,
    GET_USER_COMMENTS_SUCCESS,
    GET_USER_COMMENTS_FAILURE,
} from "./types";

const initialState = {
    status: "",
    activities: [],
    comments: [],
};

const detailsLsnPlanAndProcReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_USER_ACTIVITIES_REQUEST:
            return {
                ...state,
                status: action.payload.status,
            };
        case GET_USER_ACTIVITIES_SUCCESS:
            return {
                ...state,
                status: action.payload.status,
                activities: action.payload.activities,
                pageCount: Math.ceil(+action.payload.count / +action.payload.rowCount)
            };
        case GET_USER_ACTIVITIES_FAILURE:
            return {
                ...state,
                status: action.payload.status,
                activities: [],
                pageCount: 0
            };

        case GET_USER_COMMENTS_REQUEST:
            return {
                ...state,
                status: action.payload.status,
            };
        case GET_USER_COMMENTS_SUCCESS:
            return {
                ...state,
                status: action.payload.status,
                comments: action.payload.comments,
                pageCount: Math.ceil(+action.payload.count / +action.payload.rowCount)
            };
        case GET_USER_COMMENTS_FAILURE:
            return {
                ...state,
                status: action.payload.status,
                comments: [],
                pageCount: 0
            };
        default:
            return state;
    }
};

export default detailsLsnPlanAndProcReducer;
