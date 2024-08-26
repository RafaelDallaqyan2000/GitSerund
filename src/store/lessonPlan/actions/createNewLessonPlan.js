import store from "../../../store";
import request from "../../request";
import { handleFormChange } from "../../form/actions";

export const createNewLessonPlan = (callback) => {
  const fields = [
    "topic",
    "materialsUsedFiles",
    "lessonObjectiveFiles",
    "goalPart1Files",
    "goalPart2Files",
    "goalPart3Files",
    "goalPart4Files",
    "finalResultsFiles",
    "termsFiles",
    "homeWorkFiles",
    "purposeFiles",
    "blackBoardFiles",
  ];

  let files = [];

  for (let field of fields) {
    let fieldFiles = store.getState().formReducer[field];

    if (fieldFiles) {
      fieldFiles = fieldFiles.filter((f) => {
        return { name: f.name, path: f.path };
      });
    } else {
      fieldFiles = [];
    }

    files.push({ field, files: fieldFiles });
  }

  const formReducer = store.getState().formReducer;
  let selectedMethods = [
    formReducer.selectedMethod1,
    formReducer.selectedMethod2,
    formReducer.selectedMethod3,
  ].filter((m) => !!m);
  const methods = selectedMethods.filter((el) => el !== 0);

  selectedMethods.filter((item) => item === 0);

  let semester = store.getState().formReducer.semester;
  let body = {
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
    terms: store.getState().lessonPlanReducer?.lessDescriptions[9]?.text,
    homeWork: store.getState().lessonPlanReducer?.lessDescriptions[11]?.text,
    blackBoard: store.getState().lessonPlanReducer?.lessDescriptions[12]?.text,
    files,
    teacherId: store.getState().formReducer?.teacherId ?? 0,
    expertId: store.getState().formReducer?.expertId ?? 0,
    researcherId: store.getState().formReducer?.researcherId ?? 0,
    images: store.getState().formReducer?.uploadedImagesList ?? [],
    language: localStorage.getItem("language"),
  };

  return (dispatch) => {
    request(`/api/lessonPlan`, "POST", body)
      .then((data) => {
        if (data.success) {
          dispatch(handleFormChange("lsnPlanId", data.result[0].lessonPlanId));
          localStorage.setItem("lessonPlanId", data.result[0].lessonPlanId);

          const id = data.result[0].lessonPlanId;
          dispatch(handleFormChange("lessonPlanId", id));
          callback(id);
        } else {
          dispatch(handleFormChange("createOrEditLessPlanError", data.message));
        }
      })
      .catch(() => {});
  };
};
