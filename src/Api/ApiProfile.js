import { api } from "./axiosConfig";

export default class ApiProfile {
  static getActivities(userId, page, limit, language) {
    return api.get(
      `/activity?page=${page}&limit=${limit}${
        userId ? `&id=${userId}` : ""
      }&language=${language}`
    );
  }

  static getComments(userId, page, limit) {
    return api.get(
      `/lessonPlan/getAllComments?page=${page}&limit=${limit}${
        userId ? `&id=${userId}` : ""
      }`
    );
  }
}
