import {ADD_LESSON_PROCESS, DELETE_LESSON_PROCESS, REMOVE_ACTION_BY_INDEX} from "../types";
import {
  LESSON_PROCESS_COUNT,
  LESSON_PROCESS_ID,
  LESSON_PROCESS_ID_AND_TYPE,
  ADD_NEW_LESSON_PROCESS,
  ADD_METHOD_NAME,
  PUSH_ADDED_METHOD,
  REPLACE_METHOD,
  REMOVE_METHOD,
  SET_SELECTED_ACTION,
  CLEAN_PROCESS_REDUCER,
} from "../types";

export const addLessonProcess = (proc) => {
  return {
    type: ADD_LESSON_PROCESS,
    payload: proc,
  };
};

export const removeActionByIndex = (methodIndex, actionIndex, type) => {
  return {
    type: REMOVE_ACTION_BY_INDEX,
    payload: {
      methodIndex,
      actionIndex,
      type,
    },
  };
};

export const lessonProcessCount = (count) => {
  return {
    type: LESSON_PROCESS_COUNT,
    payload: count,
  };
};

export const lessonProcessId = (id, action) => {
  return {
    type: LESSON_PROCESS_ID,
    payload: { id, action },
  };
};

export const lessonProcessIdAndType = (procId, userDefined) => {
  return {
    type: LESSON_PROCESS_ID_AND_TYPE,
    payload: { procId, userDefined },
  };
};

export const setSelectedAction = (methodIndex, actionIndex) => {
  return {
    type: SET_SELECTED_ACTION,
    payload: { methodIndex, actionIndex },
  };
};

export const addNewLessonProcess = (lessonProcess) => {
  return {
    type: ADD_NEW_LESSON_PROCESS,
    payload: lessonProcess,
  };
};
export const addMethodName = (id, name) => {
  return {
    type: ADD_METHOD_NAME,
    payload: { id, name },
  };
};
export const pushAddedMethod = (method) => {
  return {
    type: PUSH_ADDED_METHOD,
    payload: method,
  };
};
export const replaceMethod = (index, method) => {
  return {
    type: REPLACE_METHOD,
    payload: { index, method },
  };
};
export const removeMethod = (index) => {
  return {
    type: REMOVE_METHOD,
    payload: index,
  };
};
export const cleanProcessReducer = () => {
  return {
    type: CLEAN_PROCESS_REDUCER,
    // payload: index,
  };
};
export const deleteLessonProcessMethod = (methodId)  => {
  return {
    type: DELETE_LESSON_PROCESS,
    payload : methodId
  };
};
