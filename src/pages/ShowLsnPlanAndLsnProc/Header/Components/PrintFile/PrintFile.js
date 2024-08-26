import { PrintFileItem } from "./PrintFileItem/PrintFileItem";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useOutsideClick } from "../../../../../hooks/useOutsideClick";
import { getAllPrintFiles } from "../../../../../store/lessonPlan/actions/getAllPrintFiles";
import { connect } from "react-redux";
import { useParams } from "react-router";
import "./PrintFile.css";
import { useTranslation } from "react-i18next";

function PrintOnFile({
  setOpenPrint,
  title,
  className,
  getAllPrintFiles,
  onFilePrintClick,
  onLessonPlanPrintClick,
  printFiles,
}) {
  const { t } = useTranslation();
  const ref = useRef();
  const { procId } = useParams();
  const controller = useRef({});

  const handleClose = useCallback(() => {
    setOpenPrint(false);
    if (controller.current && controller.current.abort)
      controller.current.abort();
  }, [controller]);

  const handleClickPagePrint = useCallback((e) => {
    setOpenPrint(false);
    onLessonPlanPrintClick(e);
  }, []);

  const handleClickFilePrint = useCallback((e, file) => {
    const newController = new AbortController();
    onFilePrintClick(e, file, newController.signal);
    controller.current = newController;
  }, []);

  useOutsideClick(ref, handleClose);

  useEffect(() => {
    getAllPrintFiles(procId);
  }, []);

  return (
    <div ref={ref} className={className || "lesson-plan-print-files-pop-up"}>
      <div className="print-files-pop-up-header">
        <span>{title}</span>
        <img
          onClick={handleClose}
          style={{ cursor: "pointer" }}
          src={
            require("../../../../../img/showLsnPlanAndLsnProcess/delete.svg")
              .default
          }
        />
      </div>
      <div className="print-files-pop-up-body">
        <PrintFileItem
          title={t("Lesson Plan")}
          fileType=" "
          onPrintClick={handleClickPagePrint}
        />
        {printFiles
          ?.filter((e) => e.fileExtension !== "link")
          .map((file) => (
            <PrintFileItem
              title={file?.fileName}
              fileType={file?.fileExtension}
              onPrintClick={(e) => handleClickFilePrint(e, file)}
              key={file?.fileUrl}
            />
          ))}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    printFiles: state.lessonPlanReducer.printFiles,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllPrintFiles: (lessonPlanId) =>
      dispatch(getAllPrintFiles(lessonPlanId)),
  };
};

export const PrintFile = connect(
  mapStateToProps,
  mapDispatchToProps
)(PrintOnFile);
