import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { useForceRender } from "../../../hooks/useForceRender";
import store, {
  addLessonProcess,
  fetchLessonPlanDetailsForEdit,
  handleFormChange,
  uploadImgBoard,
} from "../../../store";
import { Loading } from "../../../img/Loading/Loading";
import { useParams } from "react-router";
import "./RigthSideBar.css";
import request from "../../../store/request";
import "../../../img/Loading/Loading.css";
import { rightSidebarBoardImages } from "../../../store/lessonProcess/actions/rightSidebarBoardImages";
import { MessagePopUp } from "../../../components/MessagePopUp/MessagePopUp";
import { ChangeLessonProcessRightSidebar } from "../../../components/ChangeLessonProcessRightSidebar/ChangeLessonProcessRightSidebar";
import { useTranslation } from "react-i18next";

const RigthSideBar = ({
  files,
  addNewLessonProcess,
  lessonProcess,
  lessonProcessId,
  mainChecked,
  actionId,
  studentActionActive,
  teacherActionActive,
  uploadImage,
  order,
}) => {
  const forceRender = useForceRender();
  const { lessonProcId } = useParams();
  const deleteRef = useRef();
  const [loading, setLoading] = useState(false);
  const [showErrorPopUp, setShowErrorPopUp] = useState("");
  const { t, i18n } = useTranslation();

  const handleSuccessUploadImg = (data, fileObject, imageName, file) => {
    if (data.success) {
      files.push(fileObject);
      fileObject.name = fileObject.file.name;
      fileObject.path = data.path;
      fileObject.upLoading = false;

      const imagePathSplit = data.path.split("/");

      let newImagePath = imagePathSplit[imagePathSplit.length - 1];

      const newImageName = imageName.split("/");

      newImageName[newImageName.length - 1] = newImagePath;

      const uploadPath = newImageName.join("/");

      if (store.getState().formReducer.fromTemplate === undefined) {
        store.dispatch(rightSidebarBoardImages(false, uploadPath));
      }

      forceRender();
    } else {
      setShowErrorPopUp(data?.errorMessage);
    }
  };
  const onFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      let file = e.target.files[0];
      if (files.some((f) => f.name === file.name)) {
        setShowErrorPopUp(file.name + t("file already exists."));
      } else {
        if (store.getState().formReducer.procImages.length < 3) {
          if (
            file.type === "image/jpg" ||
            file.type === "image/png" ||
            file.type === "image/pjp" ||
            file.type === "image/pjpeg" ||
            file.type === "image/jpeg" ||
            file.type === "image/jfif"
          ) {
            uploadImage(
              i18n.language,
              "procImages",
              file,
              files,
              forceRender,
              lessonProcId,
              setLoading,
              actionId,
              handleSuccessUploadImg,
              order
            );
          } else {
            setShowErrorPopUp(t("Wrong format file"));
          }

          lessonProcess?.map((proc) => {
            proc.actions?.map((act) => {
              if (act.id === lessonProcessId) {
                act.procImages = store.getState().formReducer.procImages ?? [];
              }
            });
          });
          addNewLessonProcess([...lessonProcess]);
        } else {
          setShowErrorPopUp(t("Number of pictures should not exceed 3"));
        }
      }
    }
  };

  const deleteFile = (name) => {
    let index = files.findIndex((f) => f.name === name);
    request("/api/files/remove", "POST", {
      filePath: `${files[index].path}`,
    });
    files.splice(index, 1);
    handleFormChange("procImages", files);
    forceRender();
  };

  return (actionId || mainChecked) &&
    (teacherActionActive || studentActionActive) ? (
    <div className="create-new-lesson-process-right-sidebar-container-checked-action">
      <ChangeLessonProcessRightSidebar lessonProcId={lessonProcId} />

      <MessagePopUp
        onClosePopup={setShowErrorPopUp}
        open={showErrorPopUp}
        closeBtnTitle={t("Close")}
        title={t("Error")}
        onAlertCancelClick={() => setShowErrorPopUp("")}
        styleCancelBtn={{
          backgroundColor: "#EA6670",
          color: "#FFF",
        }}
        styleTitle={{
          color: "#EA6670",
        }}
        text={showErrorPopUp}
        styleText={{ textAlign: "center" }}
        popUpContainerStyles={{ top: "50%" }}
      />
      <fieldset
        disabled={loading}
        style={{ paddingLeft: "30px", paddingTop: "30px" }}
      >
        <div>
          <input
            type="file"
            className="editor-action-input input-picture-icon-width"
            onChange={(e) => {
              onFileChange(e);
              e.target.value = null;
            }}
            accept="image/png, image/jpeg, image/jpg"
            style={{ visibility: "none", fontSize: 0, height: "24px" }}
          />
          <div style={{ display: "flex", alignItems: "center" }}>
            <button className="plusik-lsn-proc1 add-pickure-for-proc">
              <img src={require("../../../img/plusik.svg").default} />
            </button>
            <span className="editor-action add-image-blackboard">
              {t("Add whiteboard image")}
            </span>
          </div>
        </div>
      </fieldset>

      {loading ? <Loading /> : null}

      <div className="proc-images">
        {files?.map((img) => {
          return (
            <>
              <div key={img.path} className="display-flex-img-delete-icon">
                <img src={img.path} className="proc-img" />

                <img
                  src={require("../../../img/deleteFile.svg").default}
                  onClick={() => deleteFile(img.name)}
                  className="delete-proc-img"
                  ref={deleteRef}
                />
              </div>
            </>
          );
        })}
      </div>
    </div>
  ) : (
    <div className="create-new-lesson-process-right-sidebar-container">
      <ChangeLessonProcessRightSidebar lessonProcId={lessonProcId} />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    files: state.formReducer["procImages"] ?? [],
    procImages: state.formReducer.procImages ?? [],
    lessonProcessId: state.formReducer?.id,
    lessonProcess: state.lessonProcessReducer.lessonProcess,
    actionId: state.formReducer?.id,
    teacherActionActive: state.formReducer?.teacherActionActive,
    studentActionActive: state.formReducer?.studentActionActive,
    mainChecked: state.lessonProcessReducer.mainChecked,
    boardImages: state.lessonPlanReducer.rightSidebarBoardImages,
    order: state.lessonProcessReducer.order,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    uploadImage: (
      language,
      field,
      file,
      files,
      forceRender,
      id,
      setLoading,
      actionId,
      handleSuccess,
      order
    ) =>
      dispatch(
        uploadImgBoard(
          language,
          field,
          file,
          files,
          forceRender,
          id,
          setLoading,
          actionId,
          handleSuccess,
          order
        )
      ),
    handleFormChange: (key, value) => dispatch(handleFormChange(key, value)),
    addNewLessonProcess: (lessonProcess) =>
      dispatch(addLessonProcess(lessonProcess)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RigthSideBar);
