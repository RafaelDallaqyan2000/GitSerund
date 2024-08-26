import { HANDLE_FORM_ON_CHANGE_ARRAY } from "../types";

export const handleFormOnChangeArray = (firstKey, secondKey, value) => {
  return {
    type: HANDLE_FORM_ON_CHANGE_ARRAY,
    payload: {
      firstKey,
      secondKey,
      value,
    },
  };
};
