import {
  defaultTeacherAction,
  defaultStudentAction,
  defaultLessonAction,
} from "../../pages/ChangeLessonProcess/MainContainer/MainContainer";
import { handleFormChange } from "../form/actions";
import {
  ADD_LESSON_PROCESS,
  CREATE_NEW_LESS_PROC_SUCCESS,
  CREATE_NEW_LESS_PROC_FAILURE,
  FETCH_METHOD_DATA_SUCCESS,
  LESSON_PROCESS_COUNT,
  LESSON_PROCESS_ID,
  FETCH_USER_METHOD_REQUEST,
  FETCH_USER_METHOD_SUCCESS,
  FETCH_USER_METHOD_FAILURE,
  LESSON_PROCESS_ID_AND_TYPE,
  ADD_NEW_LESSON_PROCESS,
  ADD_METHOD_NAME,
  PUSH_ADDED_METHOD,
  CREATE_METHOD_DETAILS_SUCCESS,
  REPLACE_METHOD,
  REMOVE_METHOD,
  REMOVE_ACTION_BY_INDEX,
  CLEAN_PROCESS_REDUCER,
  SET_SELECTED_ACTION,
  DELETE_LESSON_PROCESS,
  OPEN_CONFIRM_ACTION,
  ACTION_SAVED_VALUE,
  METHOD_AND_ACTION_INDEX,
  CHECK_MAIN_CONTAINER_INFO,
  DELETE_OR_RECOVER_ACTION_IF_NEXT,
  ACTION_AND_METHOD_ID,
  ORDER_AND_PREVIOUS_ORDER,
  HANDLE_CHANGE_LSN_PROC,
  CREATE_LSN_METHOD_FAILURE,
  DELETE_METHOD_FAILURE,
  EDIT_METHOD_SUCCESS,
  EDIT_METHOD_FAILURE,
  FETCH_METHOD_DATA_FAILURE,
  PATH_OF_CURRENT_IMAGE_FAILURE,
  RIGHT_SIDEBAR_FIRST_PAGE,
} from "./types";

const initialState = {
  addedMethods: [],
  methodIndex: 0,
  actionIndex: 0,
  minuteForAction: 0,
  loading: false,
  error: null,
  count: 0,
  methodId: null,
  methodName: "",
  lessonProcessId: undefined,
  action: null,
  addedLessonProcessId: null,
  userDefined: true,
  lessonProcess: [],
  addedLessonProcessCount: 0,
  ready: false,
  actionSavedValue: true,
  openConfirmValue: false,
  methodIndexInAction: 0,
  actionIndexInAction: 0,
  proc: {},
  mainChecked: false,
  studentOrTeacherActionId: null,
  nextConfirm: "",
  actionId: null,
  order: null,
  previousOrder: null,
  popupDetails: {},
  rightSidebarInfoFirstPage: [],
};

const lessonProcessReducer = (state = initialState, action) => {
  switch (action.type) {
    case REMOVE_ACTION_BY_INDEX: {
      const { methodIndex, actionIndex, type } = action.payload;
      let minuteForAction = state.minuteForAction;
      let actions = state.lessonProcess[methodIndex].actions;
      if (type === "student") {
        actions[actionIndex] = {
          ...actions[actionIndex],
          ...defaultStudentAction,
        };
      } else {
        actions[actionIndex] = {
          ...actions[actionIndex],
          ...defaultTeacherAction,
        };
      }
      if (
        !actions[actionIndex].teacherAction &&
        !actions[actionIndex].studentAction
      ) {
        minuteForAction -= actions[actionIndex].duration ?? 0;
        actions.splice(actionIndex, 1);
      }
      return {
        ...state,
        minuteForAction,
        lessonProcess: [...state.lessonProcess],
      };
    }
    case FETCH_METHOD_DATA_SUCCESS: {
      return {
        ...state,
        methodId: action.payload.id,
        lessonProcessId: action.payload.id,
        addedMethods: action.payload.data,
      };
    }
    case ADD_LESSON_PROCESS: {
      let minute = 0;
      if (action.payload?.length > 0) {
        action.payload.map((proc) => {
          proc.actions.forEach((action) => {
            minute += Number(action.duration ?? 0);
          });
        });
      }
      handleFormChange("minute", minute);

      return {
        ...state,
        lessonProcess: action.payload,
        minuteForAction: minute,
      };
    }
    case ADD_NEW_LESSON_PROCESS:
      return {
        ...state,
        lessonProcess: action.payload,
      };
    case CREATE_METHOD_DETAILS_SUCCESS:
      return {
        ...state,
        addedLessonProcessCount: state.addedMethods.length,
      };

    case PUSH_ADDED_METHOD:
      return {
        ...state,
        addedMethods: [...state.addedMethods, action.payload],
      };
    case REPLACE_METHOD:
      return {
        ...state,
        addedMethods: [
          ...state.addedMethods.slice(0, action.payload.index),
          action.payload.method,
          ...state.addedMethods.slice(action.payload.index + 1),
        ],
      };
    case REMOVE_METHOD: {
      state.addedMethods.splice(action.payload, 1);
      return {
        ...state,
        addedLessonProcessCount: 0,
        addedLessonProcessId: 0,

        addedMethods: [...state.addedMethods],
      };
    }

    case CREATE_NEW_LESS_PROC_SUCCESS:
      return {
        ...state,
      };

    case CREATE_NEW_LESS_PROC_FAILURE:
      return {
        ...state,
        error: action.payload.error,
        popupDetails: action.payload.details,
      };
    case LESSON_PROCESS_COUNT:
      return {
        ...state,
        count: action.payload,
      };
    case ADD_METHOD_NAME:
      return {
        ...state,
        methodName: action.payload.name,
        methodId: action.payload.id,
        lessonProcessId: action.payload.id,
      };
    case LESSON_PROCESS_ID:
      return {
        ...state,
        lessonProcessId: action.payload.id,
        action: action.payload.action,
      };
    case SET_SELECTED_ACTION:
      if (state.lessonProcess.length === action.payload.methodIndex) {
        state.lessonProcess = [
          ...state.lessonProcess,
          { methodId: null, methodName: null, actions: [defaultLessonAction] },
        ];
      }
      return {
        ...state,
        lessonProcess: state.lessonProcess,
        methodIndex: action.payload.methodIndex,
        actionIndex: action.payload.actionIndex,
      };
    case LESSON_PROCESS_ID_AND_TYPE:
      return {
        ...state,
        addedLessonProcessId: action.payload.procId,
        userDefined: action.payload.userDefined,
      };
    case FETCH_USER_METHOD_REQUEST:
      return {
        ...state,
        error: action.payload,
      };
    case FETCH_USER_METHOD_SUCCESS: {
      let minuteForAction = 0;
      for (let method of action.payload.methods) {
        for (let action of method.actions) {
          if (
            !action.isMethodDeleted &&
            (action.teacherActionActive || action.studentActionActive)
          ) {
            minuteForAction += action.duration ?? 0;
          }
        }
      }

      action.payload.methods.map((proc) => {
        proc.actions.map((action) => {
          let teacherActionTextFiles = [];

          let teacherActionDescNotInLessonPlanFiles = [];

          action.teacherActionDescNotInLessonPlanFiles.fileNames?.map(
            (file) => {
              let typeArry = file.split(".");
              let type =
                typeArry[typeArry.length - 1] === "pdf"
                  ? "application/pdf"
                  : "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
              teacherActionDescNotInLessonPlanFiles.push({
                path: action.teacherActionDescNotInLessonPlanFiles.fieldPath,
                uploading: false,
                error: false,
                name: file,
                file: { type, name: file },
              });
            }
          );
          action.teacherActionDescNotInLessonPlanFiles =
            teacherActionDescNotInLessonPlanFiles;

          action.teacherActionTextFiles.fileNames?.map((file) => {
            let typeArry = file.split(".");
            let type =
              typeArry[typeArry.length - 1] === "pdf"
                ? "application/pdf"
                : "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
            teacherActionTextFiles.push({
              path: action.teacherActionTextFiles.fieldPath,
              uploading: false,
              error: false,
              name: file,
              file: { type, name: file },
            });
          });
          action.teacherActionTextFiles = teacherActionTextFiles;
        });
      });

      action.payload.methods.map((proc) => {
        proc.actions.map((action) => {
          let arry = [];
          action.guideFiles.fileNames?.map((file) => {
            let typeArry = file.split(".");
            let type =
              typeArry[typeArry.length - 1] === "pdf"
                ? "application/pdf"
                : "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
            arry.push({
              path: action.guideFiles.fieldPath,
              uploading: false,
              error: false,
              name: file,
              file: { type, name: file },
            });
          });
          action.guideFiles = arry;
        });
      });

      action.payload.methods.map((proc) => {
        proc.actions.map((action) => {
          let arry = [];
          action.procImages.fileNames?.map((file) => {
            arry.push({
              path: action.procImages.fieldPath + file,
              uploading: false,
              error: false,
              name: file,
              file: { name: file },
            });
          });
          action.procImages = arry;
        });
      });
      return {
        ...state,
        minuteForAction,
        lessonProcess: action.payload.methods,
        ready: true,
      };
    }
    case FETCH_USER_METHOD_FAILURE:
      return {
        ...state,
        // lessonProcessId: action.payload.id,
        // action: action.payload.action,
      };
    case DELETE_LESSON_PROCESS: {
      let filteredLessonProcess = state.lessonProcess.filter((id) => {
        return id.methodId !== action.payload;
      });
      return {
        ...state,
        lessonProcess: filteredLessonProcess,
      };
    }
    case ACTION_SAVED_VALUE:
      return {
        ...state,
        actionSavedValue: action.payload.actionSavedValue,
      };
    case OPEN_CONFIRM_ACTION:
      return {
        ...state,
        openConfirmValue: action.payload.openConfirmValue,
      };
    case METHOD_AND_ACTION_INDEX:
      return {
        ...state,
        proc: action.payload.proc,
        methodIndexInAction: action.payload.methodIndexInAction,
        actionIndexInAction: action.payload.actionIndexInAction,
      };

    case CLEAN_PROCESS_REDUCER:
      return initialState;
    case CHECK_MAIN_CONTAINER_INFO:
      return {
        ...state,
        mainChecked: action.payload.mainChecked,
      };
    case DELETE_OR_RECOVER_ACTION_IF_NEXT:
      return {
        ...state,
        studentOrTeacherActionId: action.payload.studentOrTeacherActionId,
        lessonProcId: action.payload.lessonProcId,
        nextConfirm: action.payload.nextConfirm,
      };
    case ACTION_AND_METHOD_ID:
      return {
        ...state,
        actionId: action.payload.actionId,
        methodId: action.payload.methodId,
        order: action.payload.order,
      };

    case CREATE_LSN_METHOD_FAILURE:
      return {
        ...state,
        popupDetails: action.payload.details,
      };

    case DELETE_METHOD_FAILURE:
      return {
        ...state,
        popupDetails: action.payload.details,
      };

    case EDIT_METHOD_SUCCESS:
      return {
        ...state,
        popupDetails: action.payload.details,
      };

    case EDIT_METHOD_FAILURE:
      return {
        ...state,
        popupDetails: action.payload.details,
      };

    case FETCH_METHOD_DATA_FAILURE:
      return {
        ...state,
        popupDetails: action.payload.details,
      };

    case PATH_OF_CURRENT_IMAGE_FAILURE:
      return {
        ...state,
        popupDetails: action.payload.details,
      };

    case ORDER_AND_PREVIOUS_ORDER:
      return {
        order: action.payload.order,
        previousOrder: action.payload.order
          ? null
          : action.payload.previousOrder,
        ...state,
      };

    case HANDLE_CHANGE_LSN_PROC:
      return {
        ...state,
        [action.payload.key]: action.payload.value,
      };
    case RIGHT_SIDEBAR_FIRST_PAGE:
      return {
        ...state,
        rightSidebarInfoFirstPage: action.payload.rightSidebarInfoFirstPage,
      };

    default:
      return state;
  }
};

export default lessonProcessReducer;
