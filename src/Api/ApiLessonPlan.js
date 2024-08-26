import {api} from "./axiosConfig";

export default class ApiLessonPlan {
  static deleteLessonPlan(lessonPlanId) {
    return api.delete(`/lessonPlan/${lessonPlanId}`);
  }
}
