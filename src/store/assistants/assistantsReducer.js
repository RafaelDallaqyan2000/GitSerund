import {
    FETCH_ASSISTANTS_REQUEST,
    FETCH_ASSISTANTS_SUCCESS,
    FETCH_ASSISTANTS_FAILURE,
    ADD_ASSISTANTS_REQUEST,
    ADD_ASSISTANTS_SUCCESS,
    ADD_ASSISTANTS_FAILURE,
    HANDLE_DELETE,
} from "./types";

const initialState = {
    assistants: [],
    success: true,
    error: null,
    loading: true,
    count: 0,
    fetch: false,
};

const assistantsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ASSISTANTS_REQUEST:
            return {
                ...state,
                loading: true,
                fetch: true,
            };
        case FETCH_ASSISTANTS_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                error: null,
                assistants: action.payload.assistants.data,
                count: action.payload.assistants.count,
                // fetch: false,
            };
        case FETCH_ASSISTANTS_FAILURE:
            return {
                ...state,
                loading: false,
                success: false,
                error: action.payload.error,
                helpers: [],
                // fetch: false,
            };

        case ADD_ASSISTANTS_REQUEST:
            return {
                ...state,
                loading: true,
                fetch: !state.fetch,
            };
        case ADD_ASSISTANTS_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                error: null,
                fetch: false,
            };
        case ADD_ASSISTANTS_FAILURE:
            return {
                ...state,
                loading: false,
                success: false,
                error: action.payload.error,
                // fetch: false,
            };
        case HANDLE_DELETE:
            return {
                ...state,
                fetch: !state.fetch,
            };

        default:
            return {...state};
    }
};

export default assistantsReducer;
