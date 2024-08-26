import { TOGGLE_COLUMN } from "./types";

const initialState = {
  orderBy: false,
  selectedColumn: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_COLUMN:
      return {
        ...state,
        orderBy:
          state.selectedColumn === action.payload.selectedColumn
            ? !state.orderBy
            : false,
        selectedColumn: action.payload.selectedColumn,
      };
    default:
      return state;
  }
};

export default reducer;
