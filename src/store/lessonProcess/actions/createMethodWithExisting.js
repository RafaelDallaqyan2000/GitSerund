import store from "../..";
import request from "../../request";

export const createMethodWithExisting = (
  lessonplanid,
  statusid,
  isEdit,
  callback
) => {
  const lessonProcessWithNullData =
    store.getState().lessonProcessReducer.lessonProcess;

  lessonProcessWithNullData.map((proc) => {
    proc.actions.map((action) => {
      action.teacherActionTextFiles.map((file) => {
        if ((file.path + file.name).split(".")[0] !== file.path.split(".")[0]) {
          file.path = file.path + file.name;
        }
      });
    });
  });

  lessonProcessWithNullData.map((proc) => {
    proc.actions.map((action) => {
      action.guideFiles.map((file) => {
        if ((file.path + file.name).split(".")[0] !== file.path.split(".")[0]) {
          file.path = file.path + file.name;
        }
      });
    });
  });

  return () => {
    request(`/api/method/changeLessonPlanStatus`, "POST", {
      lessonplanid,
      statusid,
      isEdit,
    })
      .then((data) => {
        if (data.success) {
          callback(lessonplanid);
        }
      })
      .catch((e) => {});
  };
};
