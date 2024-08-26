import momentWL from "moment-with-locales-es6";

export function editDateToToday(data = "2023-03-23T12:15:34.247Z") {
    let localDate = new Date();
    let localMonth = localDate.getMonth() + 1;
    let localDay = localDate.getDate();


    if((+localDay === +momentWL(data).format("D")) &&
        (+localMonth === +momentWL(data).format("M"))) {
        let newDate =  new Date(data + "Z");
        return momentWL(newDate).format("LT");
    } else if((localDay - 1) === +momentWL(data).format("D")){
        return "Երեկ"
    }

    return momentWL(data).format("D MMM")

}
