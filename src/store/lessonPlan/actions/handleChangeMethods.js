import { CHANGE_METHODS } from "../types";

export const handleChangeMethods = (methods) => {
  return  {
    
      type: CHANGE_METHODS,
      payload: methods
    }
};