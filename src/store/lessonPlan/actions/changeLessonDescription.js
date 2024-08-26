import { CHANGE_DESC } from "../types";

export const changeLessonDescription = (array) => {
  return  {

      type: CHANGE_DESC,
      payload: array
    }
};
