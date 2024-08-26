import { api } from "./axiosConfig";

const language = localStorage.getItem("language");

export default class ApiComments {
  static getReplyComments(commentId) {
    return api.post(`/lessonPlan/getRepliesComments`, { commentId });
  }

  static addComment(params) {
    return api.post(`/lessonPlan/addComment`, params);
  }

  static getAllLessonPlanComments(params) {
    return api.post(`/lessonPlan/getAllComments`, params);
  }

  static getCommentsFromSidebar(params) {
    return api.post(`/lessonPlan/getCommentsFromSidebar`, params);
  }

  static getCommentFromNotification(commentId) {
    return api.get(`/lessonPlan/comment/${commentId}`);
  }

  static deleteComment(commentId) {
    return api.post(`/lessonPlan/deleteComment`, { commentId });
  }

  static getComments(params) {
    return api.post(`/lessonPlan/getComments`, params);
  }

  static getCommentTypes() {
    return api.get(`/lessonPlan/getCommentTypes?language=${language}`);
  }

  static commentResolve(commentId, lessonPlanId) {
    return api.post(`/lessonPlan/resolveComment`, { commentId, lessonPlanId });
  }

  static updateComment(params) {
    return api.post(`/lessonPlan/updateComment`, params);
  }

  static getCommentTypesOfLocation() {
    return api.get(`/lessonPlan/getCommentTypesOfLocation`);
  }
}
