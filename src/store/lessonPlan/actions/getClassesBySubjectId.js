import {FETCH_CLASSES_FAILURE, FETCH_CLASSES_SUCCESS} from "../types";
import store from '../../../store';


export const getClassesBySubjectId = ( id = 0) => {

  const creatorId = store.getState().formReducer.teacherId ?? '';

  return (dispatch) => {

    fetch(`/api/class/${ id }`)
      .then((res) => {
        return res.json();
      })
      .then(( data ) => {
        if (data.success) {
          dispatch(fetchClassesSuccess(data));
        }
      })
      .catch((error) => {
        dispatch(fetchClassesFailure(error.message));
      });
  };
};

export const fetchClassesSuccess = (data) => {
  const classes = data ? data.result : [];

  return {
    type: FETCH_CLASSES_SUCCESS,
    payload: {
      classes,
    },
  };
};

const fetchClassesFailure = (error) => {
  return {
    type: FETCH_CLASSES_FAILURE,
    payload: { error },
  };
};
