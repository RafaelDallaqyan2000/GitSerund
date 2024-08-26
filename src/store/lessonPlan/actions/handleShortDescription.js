import { SHOW_SHORT_DESC, BTN_DISABLE } from "../types";

export const handleShortDescription = (item) => {
  
  return {
    type: SHOW_SHORT_DESC,
    payload: item,
  };
};

export const buttonDisabled = (bool) => {
  return {
    type: BTN_DISABLE,
    payload: bool,
  };
};
