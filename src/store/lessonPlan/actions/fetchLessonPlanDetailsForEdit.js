import {
  FETCH_LSNPLAN_DETAILS_FOR_EDIT_SUCCESS,
  FETCH_LSNPLAN_DETAILS_FOR_EDIT_FAILURE,
} from "../types";
import store from "../../../store";
import { handleFormChange, initForm } from "../../form/actions";
import { getLessonPlanTeachers } from "./getLessonPlanTeachers";
import { getLessonPlanExperts } from "./getLessonPlanExperts";
import { getLessonPlanResearcher } from "./getLessonPlanResearcher";

export const fetchLessonPlanDetailsForEdit = (procId) => {
  return (dispatch) => {
    const id = Number(store.getState().formReducer.lessonProcId);
    const language = localStorage.getItem("language");

    fetch("/api/lessonPlan/lessonPlanDetailsForEdit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ lessonPlanId: procId || id, language }),
    })
      .then((r) => r.json())
      .then((data) => {
        data.files.map((file) => {
          const arry = [];

          file.files.map((f) => {
            let typeArry = f.split(".");
            let type =
              typeArry[typeArry.length - 1] === "pdf" ? "application/pdf" : "";

            arry.push({
              path: file.folderPath ?? "",
              uploading: false,
              error: false,
              name: f ?? "",
              file: { type, name: f },
            });
          });
          dispatch(handleFormChange(file.field, arry));
        });
        dispatch(fetchLessonPlanDetailsForEditSuccess(data));

        dispatch(handleFormChange("createOrEditLessPlanError", data.message));

        return data.data[0];
      })
      .then((data) => {
        const obj = {
          selectedMethod1: data.methods[0],
          selectedMethod2: data.methods[1],
          selectedMethod3: data.methods[2],
          topicText: data.topic,
          materialsUsedText: data.usedMaterialsDescription,
          finalResultsText: data.endResult,
          termsText: data.terms,
          // lessonObjectiveText: data.data[0].goal,
          homeWorkText: data.homeWork,
          semester: data.semester,
          teacherId: data.teacherId ?? null,
          teacherName: data.teacherName ?? null,
          researcherId: data.researcherId ?? null,
          researcherName: data.researcherName ?? null,
          expertId: data.expertId ?? null,
          expertName: data.expertName ?? null,
          className: data.className ?? null,
          subjectName: data.subjectName ?? null,
          lessonObjectiveText: data.purpose ?? null,
          goalPart1: data?.goalPart1,
          goalPart2: data?.goalPart2,
          goalPart3: data?.goalPart3,
          goalPart4: data?.goalPart4,
          blackBoardText: data?.blackBoard,
        };
        if (obj.teacherId) {
          obj["teachers"] = [{ id: obj.teacherId, fullName: obj.teacherName }];
        } else {
          getLessonPlanTeachers("");
        }
        if (obj.teacherId) {
          obj["experts"] = [{ id: obj.expertId, fullName: obj.expertName }];
        } else {
          getLessonPlanExperts("");
        }
        if (obj.teacherId) {
          obj["researchers"] = [
            { id: obj.researcherId, fullName: obj.researcherName },
          ];
        } else {
          getLessonPlanResearcher("");
        }
        dispatch(initForm(obj));
        setTimeout(() => {
          dispatch(handleFormChange("subjectAndClassId", data.class));
          dispatch(handleFormChange("className", data.className));

          dispatch(handleFormChange("subjectForLsnPlan", data.subjectId));
          dispatch(handleFormChange("subjectName", data.subjectName));
        }, 0);
      })
      .catch((err) => {
        dispatch(fetchLessonPlanDetailsForEditFailure(err));
      });
  };
};

const fetchLessonPlanDetailsForEditSuccess = (details) => {
  return {
    type: FETCH_LSNPLAN_DETAILS_FOR_EDIT_SUCCESS,
    payload: {
      details,
    },
  };
};

const fetchLessonPlanDetailsForEditFailure = (error) => {
  return {
    type: FETCH_LSNPLAN_DETAILS_FOR_EDIT_FAILURE,
    payload: { error },
  };
};
