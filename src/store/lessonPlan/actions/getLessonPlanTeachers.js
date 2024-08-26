import axios from "axios";
import store from "../../configureStore";
import {handleFormChange} from "../../form/actions";

export function getLessonPlanTeachers(searchtext, page = 1) {
    store.dispatch(handleFormChange("loadingTeachers", true))
    return axios
        .post("/api/lessonPlan/teachers", {
            searchtext,
            page
        })
        .then((res) =>
                store.dispatch(handleFormChange("teachers", res.data.data)))
        .catch(error => error)
        .finally(() => {
            store.dispatch(handleFormChange("loadingTeachers", false))
        })
}