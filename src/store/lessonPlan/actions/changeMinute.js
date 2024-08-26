import { CHANGE_MINUTE } from "../types";

export const changeMinute = (minute) => {
  return  {
    
      type: CHANGE_MINUTE,
      payload: minute
    }
};
