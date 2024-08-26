import axios from "axios";

export const fetchAddUserMethod = (
    lessonPlanId,
    previousMethodId,
    setOpen,
    fetchUserMethod,
    selectedMethod1,
    previousorder,
    callbackFunction
) => {
    return axios
        .post("/api/method/addUserMethod", {
            lessonplanid : +lessonPlanId,
            methodid : selectedMethod1,
            previousorder
        })
        .then((data) => {
                setOpen(false)
            if(data.data.success) {
                callbackFunction()
            }
                return fetchUserMethod(lessonPlanId)
            }
        )
        .catch(error => error)
}
