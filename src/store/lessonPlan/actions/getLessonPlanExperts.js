import store, {handleFormChange} from "../../../store"
import axios from "axios";

export function getLessonPlanExperts(searchtext, page = 1) {
    store.dispatch(handleFormChange("loadingExperts", true));
    return axios
        .post("/api/lessonPlan/experts", {
            searchtext,
            page
        })
        .then((res) => {
                store.dispatch(handleFormChange("experts", res.data.data));
        })
        .catch(error => error)
        .finally(() => store.dispatch(handleFormChange("loadingExperts", false)))
}