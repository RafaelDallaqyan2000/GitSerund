import {api} from "./axiosConfig";

export default class ApiFiles {
  static deleteFile(filePath) {
    return api.post(`/files/remove`, { filePath });
  }

  
  static insertImage(params) {
    return api.post(`/imageUpload`, params, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  static uploadFile(params) {
    return api.post(`/files/upload`, params, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  static uploadLessonPlanImage(params, controller) {
    return api.post(`/lessonPlan/backgroundImage`, params, {
      signal: controller.signal,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }
}
