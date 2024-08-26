import React, { useCallback, useEffect, useState } from "react";
import FileInputs from "./FileInputs/FileInputs";
import { useParams } from "react-router";
import { connect } from "react-redux";
import wordIcon from "../../img/word.svg";
import deleteIcon from "../../img/deleteFile.svg";
import pdfIcon from "../../img/pdf-icon.png";
import { deleteFile, insertImage, uploadFile } from "../../store/form/actions";
import "./FileUploader.css";
import { ErrorPopup } from "../ErrorPopup";
import { useTranslation } from "react-i18next";

const wordDocumentType =
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
const pdfFileType = "application/pdf";
const imageFileType = "image/png, image/jpeg, image/jpg";

function FileUploaderComponent({
  currentAction,
  files,
  uploadFile,
  deleteFile,
  insertImage,
  status,
  message,
  order,
  actionId,
}) {
  const { t, i18n } = useTranslation();
  let link = window.location.href.split("/");
  let lessonId = link[link.length - 1];
  const { lessonPlanId, lessonProcId } = useParams();
  const [errMessage, setErrMessage] = useState("");

  const handleFileChange = useCallback(
    (e) => {
      const file = e?.target?.files[0];
      const target = e?.target;

      if (!file) return;

      if (file.size >= target.size) {
        setErrMessage(t("File size must not exceed 5mb"));
        return;
      }

      if (file.type !== wordDocumentType && file.type !== pdfFileType) {
        setErrMessage(t("Wrong format file"));
        return;
      }

      if (files.some((f) => f.name === file.name)) {
        setErrMessage(i18n.language === `${file.name} ${t("file already exists.")}`);
        return;
      }

      uploadFile({
        language: i18n.language,
        field: currentAction + "Files",
        id: lessonPlanId || +lessonId || +lessonProcId,
        file,
        order,
        currentAction,
        files,
        actionId,
      });
      return;
    },
    [currentAction, files, lessonPlanId, lessonProcId, lessonId, order]
  );

  const handleInsertImage = useCallback(
    (e) => {
      const file = e.target.files[0];
      const target = e?.target;

      if (!file) return;

      if (!imageFileType.includes(file.type)) {
        setErrMessage(t("Wrong format file"));
        return;
      }

      if (file.size >= target.size) {
        setErrMessage(t("File size must not exceed 5mb"));
        return;
      }

      insertImage({
        currentImage: file,
        field: currentAction,
        lessonPlanId: lessonPlanId || +lessonId || +lessonProcId,
        order,
      });
    },
    [currentAction, lessonPlanId, lessonProcId, order]
  );

  const handleDeleteFile = useCallback(
    (index) => {
      const tempFile = files[index].file;
      let filePath = files[index].path;
      const fileName = files[index].file.name;

      filePath =
        tempFile.lastModified && tempFile.path
          ? filePath
          : `${filePath}/${fileName}`;

      deleteFile({
        key: currentAction + "Files",
        filePath,
        index,
      });
    },
    [files, currentAction]
  );

  const handleCloseModal = useCallback(() => {
    if (errMessage) setErrMessage("");
  }, [errMessage]);

  useEffect(() => {
    if (status?.includes("Fail")) setErrMessage(message);
  }, [status]);

  return (
    <div>
      <div>
        {files?.length
          ? files.map((file, index) => {
              const fileType = file.file.name.split(".");

              return (
                <div key={file.file.name} className="file-uploader">
                  {fileType[fileType.length - 1] === "docx" && (
                    <img src={wordIcon} alt="Word" className="file-icon" />
                  )}
                  {file.file.type === pdfFileType && (
                    <img src={pdfIcon} alt="PDF" className="file-icon" />
                  )}
                  {(fileType[fileType.length - 1] === "docx" ||
                    file.file.type === pdfFileType) && (
                    <a
                      className="file-link"
                      target="_blank"
                      href={file.path + "/" + file.file.name}
                    >
                      {file.file.name}
                    </a>
                  )}
                  <div
                    className="file-delete"
                    onClick={() => handleDeleteFile(index)}
                  >
                    <img
                      src={deleteIcon}
                      alt="Delete"
                      className="file-icon file-delete-icon"
                    />
                  </div>
                </div>
              );
            })
          : null}
      </div>

      <FileInputs
        onInsertImage={handleInsertImage}
        onFileChange={handleFileChange}
        loading={status === `${currentAction}Request`}
      />
      {errMessage ? (
        <ErrorPopup message={errMessage} onClose={handleCloseModal} />
      ) : null}
    </div>
  );
}

const mapStateToProps = (state, { currentAction }) => {
  return {
    files: state.formReducer[currentAction + "Files"] || [],
    status: state.formReducer.status,
    message: state.formReducer.message,
    order: state.lessonProcessReducer.order,
    actionId: state.formReducer?.id,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteFile: (params) => dispatch(deleteFile(params)),
    insertImage: (params) => dispatch(insertImage(params)),
    uploadFile: (params) => dispatch(uploadFile(params)),
  };
};

export const FileUploader = connect(
  mapStateToProps,
  mapDispatchToProps
)(FileUploaderComponent);
