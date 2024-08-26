import {PDF_FILE_ARR} from "../types";

export function pdfFilesInAction(clearPdfArr, pdfFileArr) {

    return {
        type : PDF_FILE_ARR,
        payload : {
            pdfFileArr : pdfFileArr,
            clearPdfArr,
        }
    }
}