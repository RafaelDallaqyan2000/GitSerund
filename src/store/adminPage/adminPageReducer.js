import {
  USERS_IN_ADMIN_PAGE,
  HANDLE_ADMIN_PAGE_CHANGE,
  OPEN_RIGHT_SIDEBAR_IN_ADMIN_PAGE,
  FETCH_ALL_CLASSES_SUCCESS,
} from "./types";

const initialState = {
  users: [],
  allUsers: [],
  openOrCloseRightSidebar: false,
  allClasses: [],
  searchText: null,
  checkedUsers: [],
};

const adminPageReducer = (state = initialState, action) => {
  switch (action.type) {
    case USERS_IN_ADMIN_PAGE:
      return {
        ...state,
        allUsers: action.payload.allUsers,
      };
    case HANDLE_ADMIN_PAGE_CHANGE:
      return {
        ...state,
        [action.payload.key]: action.payload.value,
      };
    case OPEN_RIGHT_SIDEBAR_IN_ADMIN_PAGE:
      return {
        ...state,
        openOrCloseRightSidebar: action.payload.openOrCloseRightSidebar,
      };
    case FETCH_ALL_CLASSES_SUCCESS:
      return {
        ...state,
        classes: action.payload.classes,
      };

    default:
      return { ...state };
  }
};

export default adminPageReducer;
