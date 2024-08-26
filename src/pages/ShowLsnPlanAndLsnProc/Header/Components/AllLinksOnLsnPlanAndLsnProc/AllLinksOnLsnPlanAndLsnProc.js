import "./AllLinksOnLsnPlanAndLsnProc.css";
import { connect } from "react-redux";
import { useCallback, useEffect, useRef, useState } from "react";
import { useOutsideClick } from "../../../../../hooks/useOutsideClick";
import {
  getAllPrintFiles,
  reduxPrintFiles,
} from "../../../../../store/lessonPlan/actions/getAllPrintFiles";
import { LinkItem } from "./LinkItem/LinkItem";
import { useParams } from "react-router";
import { MessagePopUp } from "../../../../../components";
import { useTranslation } from "react-i18next";

function AllLinksOnLsnPlanAndLsnProc({
  setOpen,
  title,
  getAllPrintFiles,
  printFiles = [],
  button,
  subjectOnPdf,
  topicOnPdf,
  classAndSemesterOnPdf,
}) {
  const { t } = useTranslation();
  const ref = useRef();
  const { procId } = useParams();
  const [checkedFiles, setCheckedFiles] = useState([]);
  const [openPopUp, setOpenPopUp] = useState(false);
  const host = window.location.origin;

  useEffect(() => {
    getAllPrintFiles(procId);
  }, []);

  useOutsideClick(ref, () => {
    setOpen(false);
  });

  const handleChange = useCallback(
    (file) => {
      if (
        checkedFiles.some(
          (f) =>
            f.fileUrl === file.fileUrl &&
            f.fileExtension === file.fileExtension &&
            f.fileName === file.fileName &&
            f?.id === file?.id
        )
      ) {
        setCheckedFiles((prev) =>
          prev?.filter((e) => {
            return (
              e.fileUrl !== file.fileUrl ||
              e.fileExtension !== file.fileExtension ||
              e.fileName !== file.fileName ||
              e?.id !== file?.id
            );
          })
        );
      } else {
        setCheckedFiles((prev) => [...prev, file]);
      }
    },
    [checkedFiles, printFiles]
  );

  const toggleAllFiles = useCallback(() => {
    if (printFiles.length === checkedFiles.length) {
      setCheckedFiles([]);
    } else {
      setCheckedFiles(printFiles);
    }
  }, [checkedFiles, printFiles]);

  const onClickCopyButton = () => {
    if (checkedFiles.length > 0) {
      let classes = classAndSemesterOnPdf.split("-")[0];

      navigator?.clipboard?.writeText([
        `${subjectOnPdf} - ${classes} - ${t("Topic")} - ${topicOnPdf}`,
        checkedFiles.map((e, i) => {
          return `\n ${i + 1}. ${
            e?.fileName !== e.fileUrl ? `${e?.fileName} - ` : ""
          } ${e?.fileExtension !== "link" ? host : ""}${e?.fileUrl.replace(
            "../../",
            "/"
          )}`;
        }),
      ]);

      setOpenPopUp(true);
    }
  };

  return (
    <div
      ref={ref}
      className="all-links-on-lsn-plan-pdf"
      onDrag={(e) => {
        e.stopPropagation();
        e.preventDefault();
      }}
      onScroll={(e) => {
        e.stopPropagation();
        e.preventDefault();
      }}
    >
      {openPopUp && (
        <MessagePopUp
          onClosePopup={setOpenPopUp}
          open={openPopUp}
          closeBtnTitle={t("Close")}
          title={t("Done")}
          text={
            checkedFiles.length === 1 ? t("Link copied") : t("Links copied")
          }
          styleCancelBtn={{
            background: "linear-gradient(83.13deg, #6FD89C 0%, #46B776 100%)",
            borderRadius: "6px",
            color: "#fff",
          }}
          styleText={{ textAlign: "center" }}
          popUpContainerStyles={{ top: "50%" }}
        />
      )}
      <header>
        <span>{title}</span>
        <img
          alt="close"
          style={{ cursor: "pointer" }}
          onClick={() => setOpen(false)}
          src={
            require("../../../../../img/showLsnPlanAndLsnProcess/delete.svg")
              .default
          }
        />
      </header>
      <div className="body">
        {printFiles.length > 0 && (
          <LinkItem
            title={t("Select all")}
            id={0}
            state={true}
            onChange={toggleAllFiles}
            isChecked={printFiles.length === checkedFiles.length}
          />
        )}
        {printFiles.map((file, index) => {
          return (
            <LinkItem
              key={index}
              id={file.fileUrl + index}
              title={file.fileName}
              type={file.fileExtension}
              isChecked={checkedFiles.some(
                (f) =>
                  f.fileUrl === file.fileUrl &&
                  f.fileExtension === file.fileExtension &&
                  f.fileName === file.fileName &&
                  f?.id === file?.id
              )}
              onChange={() => handleChange(file)}
            />
          );
        })}
      </div>
      {printFiles.length > 0 && (
        <footer className="footer">
          <button onClick={onClickCopyButton}>{button}</button>
        </footer>
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    printFiles: state.lessonPlanReducer.printFiles,
    subjectOnPdf: state.lessonPlanReducer.subjectOnPdf,
    classAndSemesterOnPdf: state.lessonPlanReducer.classAndSemesterOnPdf,
    topicOnPdf: state.lessonPlanReducer?.topicOnPdf,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllPrintFiles: (lessonPlanId) =>
      dispatch(getAllPrintFiles(lessonPlanId)),
    reduxPrintFile: (files) => dispatch(reduxPrintFiles(files)),
  };
};

export const AllLinksOnPdfPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(AllLinksOnLsnPlanAndLsnProc);
