import {
    ON_LOGIN_REQUEST,
    ON_LOGIN_SUCCESS,
    ON_LOGIN_FAILURE,
    SET_USER,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAILURE,
    AUTHORIZE_REQUEST,
    AUTHORIZE_SUCCESS,
    AUTHORIZE_FAILURE,
    EDIT_PROFILE_REQUEST,
    EDIT_PROFILE_SUCCESS,
    EDIT_PROFILE_FAILURE,
    EDIT_PASSWORD_SUCCESS,
    EDIT_PASSWORD_FAILURE,
    ON_REGISTER_REQUEST,
    ON_REGISTER_SUCCESS,
    ON_REGISTER_FAILURE,
    ON_REGISTER_DONE,
    FETCH_NUMBER_CODE_FAILURE,
    FETCH_NUMBER_CODE_REQUEST,
    FETCH_NUMBER_CODE_SUCCESS,
    RECOVER_PASSWORD_SUCCESS,
    RECOVER_PASSWORD_FAILURE,
    HANDLE_AUTH_CHANGE, LOGOUT_FAILURE, FETCH_PROF_DETAILS_FAILURE,
} from "./types";
import {IS_LOADING_SCREEN, RESET_USER_DATA} from "../users/types";

const initialState = {
    loading: false,
    regLoading: false,
    login: false,
    error: null,
    errorMsg: null,
    token: "",
    checkEmail: false,
    submitEmail: false,
    userId: null,
    authLoading: true,
    phoneCode: [],
    user: {},
    typeId: null,
    popupDetails: {}
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                user: action.payload.user,
            };

        case FETCH_PROF_DETAILS_FAILURE:
            return {
                ...state,
                user: {}
            };
        case ON_LOGIN_REQUEST:
            return {
                ...state,
                regLoading: true,
            };
        case ON_LOGIN_SUCCESS:
            return {
                ...state,
                //   token: action.payload.login.token,
                regLoading: false,
                login: true,
                error: null,
                userId: action.payload.login.user.id,
            };
        case ON_LOGIN_FAILURE:
            return {
                ...state,
                regLoading: false,
                login: false,
                popupDetails: action.payload.details,
                // errorMsg: action.payload?.data.errorMessage,
                error: action.payload.error.errorMessage,
            };
        case FORGOT_PASSWORD_REQUEST:
            return {
                ...state,
                // loading: true,
            };
        case FORGOT_PASSWORD_SUCCESS:
            return {
                ...state,
                checkEmail: true, //   token: action.payload.login.token,
                // loading: false,
                // login: true,
                // error: null,
            };
        case FORGOT_PASSWORD_FAILURE:
            return {
                ...state,
                popupDetails: action.payload.details,
                // loading: false,
                // login: false,
                // error: action.payload.error,
            };

        case AUTHORIZE_REQUEST:
            return {
                ...state,
                authLoading: true,
            };
        case AUTHORIZE_SUCCESS:
            return {
                ...state,
                error: null,
                typeId: action.payload.typeId,
            };


        case EDIT_PROFILE_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case EDIT_PROFILE_SUCCESS:
            return {
                ...state,
                popupDetails: action.payload.details,
                loading: false,
                error: null,
            };
        case EDIT_PROFILE_FAILURE:
            return {
                ...state,
                loading: false,
                popupDetails: action.payload.details,
            };
        case EDIT_PASSWORD_SUCCESS:
            return {
                ...state,
                loading: false,
                popupDetails: action.payload.details,
                error: null,
            };
        case EDIT_PASSWORD_FAILURE:
            return {
                ...state,
                loading: false,
                popupDetails: action.payload.details,
                error: action.payload.error,
            };
        case ON_REGISTER_DONE:
            return {
                ...state,
                submitEmail: false,
            };
        case ON_REGISTER_REQUEST:
            return {
                ...state,
                regLoading: true,
            };
        case ON_REGISTER_SUCCESS:
            return {
                ...state,
                regLoading: false,
                submitEmail: true,
                error: null,
            };
        case ON_REGISTER_FAILURE:
            return {
                ...state,
                regLoading: false,
                popupDetails: action.payload.details,
            };

        case FETCH_NUMBER_CODE_REQUEST:
            return {
                ...state,
            };
        case FETCH_NUMBER_CODE_SUCCESS:
            return {
                ...state,
                phoneCode: action.payload.methods,
                error: null,
            };
        case FETCH_NUMBER_CODE_FAILURE:
            return {
                ...state,
                phoneCode: [],
            };

        case RECOVER_PASSWORD_SUCCESS:
            return {
                ...state,
                popupDetails: action.payload.details,
            };
        case RECOVER_PASSWORD_FAILURE:
            return {
                ...state,
                popupDetails: action.payload.details,
            };

        case LOGOUT_FAILURE:
            return {
                ...state,
                popupDetails: action.payload.details,
            };

        case HANDLE_AUTH_CHANGE:
            return {
                ...state,
                [action.payload.key]: action.payload.value,
            };

        case RESET_USER_DATA:
            return {
                ...state,
                user: {},
            };

        case IS_LOADING_SCREEN:
            return {
                ...state,
                authLoading: action.payload.authLoading
            }

        default:
            return state;
    }
};

export default reducer;
