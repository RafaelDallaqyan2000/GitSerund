import axios from "axios";

export function editUserAction(
  teacheractionId,
  teacherAction,
  teacherActionDesc,
  teacherText,
  guide,
  studentActionId,
  studentAction,
  studentActionDesc,
  studentText,
  duration,
  teacherActionDescNotInLessonPlan,
  pupilWorkPart,
  callbackEditUserAction
) {
  return axios
    .post("/api/method/editUserAction", {
      teacherAction,
      teacherActionDesc,
      teacherText,
      guide,
      teacheractionId: +teacheractionId,
      studentActionId: +studentActionId,
      studentAction,
      studentActionDesc,
      studentText: null,
      duration: +duration,
      pupilWorkPart,
      teacherActionDescNotInLessonPlan,
    })
    .then((data) => {
      callbackEditUserAction();
    })
    .catch((error) => error);
}
