import store from "../../../store";
import request from "../../request";
import { handleFormChange } from "../../form/actions";

export const editLessonPlan = (callback) => {
  const fields = [
    "materialsUsedFiles",
    "lessonObjectiveFiles",
    "finalResultsFiles",
    "termsFiles",
    "purposeFiles",
    "goalPart1Files",
    "goalPart2Files",
    "goalPart3Files",
    "goalPart4Files",
    "homeWorkFiles",
    "blackBoardFiles",
  ];
  let files = [];

  for (let field of fields) {
    let fieldFiles = store.getState().formReducer[field];
    fieldFiles = fieldFiles
      ? fieldFiles.filter((f) => {
          return { name: f.name, path: f.path };
        })
      : [];
    files.push({ field, files: fieldFiles });
  }

  const formReducer = store.getState().formReducer;
  let selectedMethods = [
    formReducer.selectedMethod1,
    formReducer.selectedMethod2,
    formReducer.selectedMethod3,
  ].filter((m) => !!m);
  const methods = selectedMethods.filter((el) => el !== 0);

  let semester = store.getState().formReducer.semester;

  let body = {
    id: parseInt(store.getState().formReducer.lessonProcId),
    subjectAndClassId: store.getState().formReducer.subjectAndClassId,
    semester: !!semester ? semester : 0,
    topic: store.getState().lessonPlanReducer?.lessDescriptions[0]?.text,
    usedMaterialsDescription:
      store.getState().lessonPlanReducer?.lessDescriptions[1]?.text,
    purpose: store.getState().lessonPlanReducer?.lessDescriptions[2]?.text,
    goalPart1: store.getState().lessonPlanReducer?.lessDescriptions[3]?.text,
    goalPart2: store.getState().lessonPlanReducer?.lessDescriptions[4]?.text,
    goalPart3: store.getState().lessonPlanReducer?.lessDescriptions[5]?.text,
    goalPart4: store.getState().lessonPlanReducer?.lessDescriptions[6]?.text,
    endResult: store.getState().lessonPlanReducer?.lessDescriptions[7].text,
    selectedMethods: JSON.stringify(methods),
    terms: store.getState().lessonPlanReducer?.lessDescriptions[8]?.text,
    homeWork: store.getState().lessonPlanReducer?.lessDescriptions[10]?.text,
    blackBoard: store.getState().lessonPlanReducer?.lessDescriptions[11]?.text,
    files,
    teacherId: store.getState().formReducer?.teacherId ?? 0,
    expertId: store.getState().formReducer?.expertId ?? 0,
    researcherId: store.getState().formReducer?.researcherId ?? 0,
    images: store.getState().formReducer?.uploadedImagesList ?? [],
    language: localStorage.getItem("language"),
  };

  return (dispatch) => {
    request(`/api/lessonPlan`, "PUT", body)
      .then((data) => {
        if (data.success) {
          const id = body.id;
          localStorage.setItem("lessonPlanId", id);

          dispatch(handleFormChange("lessonPlanId", id));

          callback(parseInt(store.getState().formReducer.lessonProcId));
          dispatch(
            handleFormChange("createOrEditLessonPlanSuccess", data.message)
          );
        } else {
          dispatch(handleFormChange("createOrEditLessPlanError", data.message));
        }
      })
      .catch((e) => {});
  };
};
