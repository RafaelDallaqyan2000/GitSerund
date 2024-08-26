import { FETCH_ALL_CLASSES_SUCCESS, FETCH_ALL_CLASSES_FAILURE } from "../types";

export const getAllClasses = (subjectId) => {

    return (dispatch) => {

        fetch(`/api/classes/${ subjectId ? subjectId : 0 }`)
            .then((res) => {
                return res.json();
            })
            .then(( data ) => {
                if (data.success) {
                    dispatch(fetchAllClassesSuccess(data));
                }
            })
            .catch((error) => {
                dispatch(fetchAllClassesFailure(error.message));
            });
    };
};

export const fetchAllClassesSuccess = (data) => {

    const classes = data.result[0].classes ?? [];

    return {
        type: FETCH_ALL_CLASSES_SUCCESS,
        payload: {
            classes,
        },
    };
};

const fetchAllClassesFailure = (error) => {
    return {
        type: FETCH_ALL_CLASSES_FAILURE,
        payload: { error },
    };
};
