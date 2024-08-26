import axios from "axios";
import store from "../../../store";

export function fetchAddUserAction(
  lessonplanid,
  methodid,
  methodorder,
  studentaction,
  studentactiondesc,
  teacheraction,
  teacheractiondesc,
  studenttext,
  teachertext,
  duration,
  previousorder,
  guide,
  teacherActionDescNotInLessonPlan,
  pupilWorkPart,
  callbackAddUserAction = () => {}
) {
  return axios
    .post("/api/method/addUserAction", {
      lessonplanid: +lessonplanid,
      methodid,
      methodorder,
      studentaction: studentaction.trim(),
      studentactiondesc,
      teacheraction: teacheraction.trim(),
      teacheractiondesc,
      studenttext: studenttext ? studenttext : null,
      pupilWorkPart,
      teachertext,
      teacherActionDescNotInLessonPlan,
      duration: duration ? duration : 0,
      previousorder: previousorder < 0 ? null : previousorder,
      boardImages: store.getState().lessonPlanReducer.boardImages,
      pdfFiles: store.getState().lessonPlanReducer.pdfFileArr,
      guide,
    })
    .then((data) => {
      callbackAddUserAction(data);
    })
    .catch((error) => {
      console.log(error);
      throw error;
    });
}
