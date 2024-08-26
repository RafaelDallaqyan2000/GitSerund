import { CREATE_NEW_LESSON_PLAN } from "../types";

export const showLessonPlanCreate = (show) => {
  return  {
    
      type: CREATE_NEW_LESSON_PLAN,
      payload: show
    }
};
