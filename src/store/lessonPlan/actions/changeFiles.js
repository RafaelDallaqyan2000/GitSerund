import { CHANGE_FILES } from "../types";

export const changeFiles = (files) => {
  return  {
    
      type: CHANGE_FILES,
      payload: files
    }
};