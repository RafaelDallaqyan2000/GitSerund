import axios from "axios";
import store from "../../configureStore";
import {handleFormChange} from "../../form/actions";

export function getLessonPlanResearcher(searchtext, page = 1) {
    store.dispatch(handleFormChange("loadingResearchers", true));
    return axios
        .post("/api/lessonPlan/researchers", {
            searchtext,
            page
        })
        .then((res) => {
                store.dispatch(handleFormChange("researchers", res.data.data));
        })
        .catch(error => error).finally(() => {
            store.dispatch(handleFormChange("loadingResearchers", false));
        });
}