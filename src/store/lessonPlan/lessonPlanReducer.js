import {
  CREATE_NEW_LESSON_PLAN,
  SHOW_SHORT_DESC,
  FETCH_METHODS_SUCCESS,
  FETCH_METHODS_FAILURE,
  CHANGE_METHODS,
  CHANGE_FILES,
  CHANGE_MINUTE,
  BTN_DISABLE,
  ADD_IMAGE,
  FETCH_SUBJECTS_SUCCESS,
  FETCH_SUBJECTS_FAILURE,
  FETCH_CLASSES_SUCCESS,
  FETCH_CLASSES_FAILURE,
  FETCH_LSNPLAN_DETAILS_SUCCESS,
  FETCH_LSNPLAN_DETAILS_FAILURE,
  CHANGE_DESC,
  USER_LESSON_PLANS_FAILURE,
  USER_LESSON_PLANS_SUCCESS,
  LESSON_PLANS_FAILURE,
  LESSON_PLANS_SUCCESS,
  USER_DEVELOPED_LESSON_PLANS_SUCCESS,
  USER_DEVELOPED_LESSON_PLANS_FAILURE,
  CAN_EDIT_LESSON_PLAN_SUCCESS,
  CAN_EDIT_LESSON_PLAN_FAILURE,
  LESSON_PAN_EXPERTS,
  GET_LESSON_PLAN_PRINT_FILES,
  COPY_FILES_ARR,
  HANDLE_LSN_PLAN_AND_LSN_PROC,
  USER_LESSON_PLANS_REQUEST,
  UPLOAD_LESSON_PLAN_IMAGE_REQUEST,
  UPLOAD_LESSON_PLAN_IMAGE_SUCCESS,
  UPLOAD_LESSON_PLAN_IMAGE_FAILURE,
  DELETE_LESSON_PLAN_SUCCESS,
  DELETE_LESSON_PLAN_FAILURE,
} from "./types";
import {DELETE_BOARD_IMAGE, PDF_FILE_ARR, RIGHT_SIDEBAR_IMAGES} from "../lessonProcess/types";
import {HANDLE_ADMIN_PAGE_CHANGE} from "../adminPage/types";
import {UPLOAD_FILE_SUCCESS} from "../form/types";
import {RESET_USER_DATA} from "../users/types";
import {LOGOUT_FAILURE} from "../auth/types";

const initialState = {
  showCreateLessPlan: false,
  lessDescriptions: [],
  files: [],
  formDataFiles: {},
  images: [],
  allMethods: [],
  selectedMethods: [],
  error: "",
  minute: 45,
  buttonDisable: true,
  subjects: [],
  classes: [],
  lessonPlanDetails: {},
  headerDetails: {},
  userLessonPlans: [],
  allDevelopedLessonPlans: [],
  fileMethods: [],
  canEditLsnPlan: false,
  boardImages : [],
  pdfFileArr : [],
  clearArr : false,
  deleteBoardImage: "",
  copyFiles : [],
  hideAllCommentIcons : false,
  commentCount: 0,
  status: '',
  popupDetails: {
    text: '',
    type: 'fail',
    title: '',
    cancelBtnTitle: '',
    submitBtnTitle: '',
    titleStyle: {},
    cancelBtnStyle: {}
  },
};

const lessonPlanReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_NEW_LESSON_PLAN:
      return {
        ...state,
        showCreateLessPlan: action.payload,
      };
    case SHOW_SHORT_DESC:
      let array = [];

      let bool = state.lessDescriptions.some(
        (item) => {
          return item.id === action.payload.id

        }
      );
      if (bool) {
        state.lessDescriptions.map((item) => {
          if (item.id === action.payload.id) {
            // item.shortDescription = action.payload.shortDescription;
            item.files = action.payload.files ?? [];
            item.methods = action.payload.methods;
            item.text = action.payload.text;
            item.title = action.payload.title;
            item.itemId = action.payload.itemId ?? 0;
          }
        });
      } else {
        state.lessDescriptions.push(action.payload);
      }

      state.lessDescriptions.map((item) => {
        array[item.index] = item;
      });
      const arry = array.filter((x) => x !== null);

      return {
        ...state,
        lessDescriptions: arry,
      };

    case FETCH_METHODS_SUCCESS:
      return {
        ...state,
        allMethods: action.payload.methods,
      };
    case FETCH_METHODS_FAILURE:
      return {
        ...state,
        error: action.payload.error,
      };
    case CHANGE_METHODS:
      return {
        ...state,
        selectedMethods: action.payload,
      };
    case CHANGE_FILES:
      return {
        ...state,
        formDataFiles: action.payload,
      };
    case CHANGE_MINUTE:
      return {
        ...state,
        minute: action.payload,
      };
    case BTN_DISABLE:
      return {
        ...state,
        buttonDisable: action.payload,
      };
    case FETCH_SUBJECTS_SUCCESS:
      return {
        ...state,
        subjects: action.payload.subjects,
      };
    case FETCH_CLASSES_SUCCESS:
      return {
        ...state,
        classes: action.payload.classes,
      };
    case FETCH_LSNPLAN_DETAILS_SUCCESS:
      return {
        ...state,
        lessonPlanDetails: action.payload.details,
        commentCount: +action.payload.details.commentCount,
      };
    case FETCH_LSNPLAN_DETAILS_FAILURE:
      return {
        ...state,
        lessonPlanDetails: {},
      };
    case CHANGE_DESC:
      return {
        ...state,
        lessDescriptions: action.payload,
      };

    case USER_LESSON_PLANS_REQUEST:
      return {
        ...state,
        pageCount: action.payload.pageCount,
        userLessonPlans: action.payload.userLessonPlans,
        status: action.payload.status,
      };

    case USER_LESSON_PLANS_SUCCESS:
      return {
        ...state,
        pageCount: action.payload.pageCount,
        userLessonPlans: action.payload.userLessonPlans,
        status: action.payload.status,
      };

    case USER_LESSON_PLANS_FAILURE:
      return {
        ...state,
        userLessonPlans: [],
        error: action.payload.error,
        status: action.payload.status,
      };

    case USER_DEVELOPED_LESSON_PLANS_SUCCESS:
      return {
        ...state,
        allDevelopedLessonPlans: action.payload.allDevelopedLessonPlans,
      };

    case USER_DEVELOPED_LESSON_PLANS_FAILURE:
      return {
        ...state,
        allDevelopedLessonPlans: [],
        error: action.payload.error,
      };

    case LESSON_PLANS_SUCCESS:
      return {
        ...state,
        lessonPlans: action.payload.lessonPlans,
      };

    case LESSON_PLANS_FAILURE:
      return {
        ...state,
        lessonPlans: [],
        error: action.payload.error,
      };
    case CAN_EDIT_LESSON_PLAN_SUCCESS:
      return {
        ...state,
        popupDetails: action.payload.details,
      };

    case CAN_EDIT_LESSON_PLAN_FAILURE:
      return {
        ...state,
        error: action.payload.error,
      };
    case RIGHT_SIDEBAR_IMAGES:

      if(action.payload.clearArr) {
          state.boardImages = []
      } else {
        state.boardImages.push(action.payload.boardImages)
      }

      return {
        ...state,
        clearArr: action.payload.clearArr,
        rightSidebarBoardImages: state.boardImages
      }

      //todo pdf-file-uploader

      case PDF_FILE_ARR :
        if(action.payload.clearPdfArr) {
          state.pdfFileArr = [];
        } else {
          state.pdfFileArr.push(action.payload.pdfFileArr);
        }

        return {
          ...state,
          clearPdfArr : action.payload.clearPdfArr,
          pdfFileArr : state.pdfFileArr
        }

      case UPLOAD_FILE_SUCCESS :
        if(action.payload.clearPdfArr) {
          state.pdfFileArr = [];
        } else {
          state.pdfFileArr.push(action.payload.pdfFileArr);
        }

        return {
          ...state,
          clearPdfArr : action.payload.clearPdfArr,
          pdfFileArr : state.pdfFileArr
        }

    case LESSON_PAN_EXPERTS :

      return {
        ...state,
        expertArr : action.payload.expertArr
      }
    case GET_LESSON_PLAN_PRINT_FILES :
      return {
        ...state,
        printFiles : action.payload.printFiles
      }
    case HANDLE_LSN_PLAN_AND_LSN_PROC :
      return {
        ...state,
        [action.payload.key]: action.payload.value,
      };

    case UPLOAD_LESSON_PLAN_IMAGE_REQUEST :
      return {
        ...state,
        fileUploadStatus: action.payload.status,
        fileUploadMessage: action.payload.message,
      };

    case UPLOAD_LESSON_PLAN_IMAGE_SUCCESS :
      const {lessonPlanId, status, message, backgroundImg} = action.payload;

      const userLsnPlansCard = state?.userLessonPlans?.details?.map(lsnPlan => {

        if( lessonPlanId === lsnPlan.id ) {

          return { ...lsnPlan, backgroundImg };
        }

          return lsnPlan;
      })

      return {
        ...state,
        userLessonPlans: {details: userLsnPlansCard, userLessonPlanDetails: state?.userLessonPlans?.userLessonPlanDetails},
        fileUploadMessage: message,
        fileUploadStatus: status,
      };

    case UPLOAD_LESSON_PLAN_IMAGE_FAILURE :
      return {
        ...state,
        fileUploadStatus: action.payload.status,
        fileUploadMessage: action.payload.message,
      };

    case RESET_USER_DATA:
      return {
        ...state,
        userLessonPlans: [],
        allDevelopedLessonPlans: [],
      };

    case DELETE_LESSON_PLAN_SUCCESS:
      let details = state?.userLessonPlans?.details?.filter(lsnPlan => lsnPlan.id !== action.payload.lessonPlanId);
      return {
        ...state,
        popupDetails: action.payload.popupDetails,
        userLessonPlans: {
          userLessonPlanDetails : state.userLessonPlans.userLessonPlanDetails,
          details
        }
      };

    case DELETE_LESSON_PLAN_FAILURE:
      return {
        ...state,
        popupDetails: action.payload.popupDetails,
      };

    default:
      return state;
  }
};

export default lessonPlanReducer;
