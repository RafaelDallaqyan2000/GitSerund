import React, { useCallback, useEffect, useState } from "react";
import uploadCloud from "./icons/uploadCloud.svg";
import pictureIcon from "./icons/imageIcon.svg";
import deleteIcon from "../../img/delete_medium.svg";
import defaultImage from "../../img/defaultProfile.png";
import closeIcon from "../../img/multiselectCross.svg";
import "./lessonPlanImageUploader.css";
import { Crop } from "./components";
import { GreenButton } from "../GreenButton";
import { GreyButton } from "../GreyButton";
import pencilWhite from "../../img/Edit.svg";
import { uploadLessonPlanImage } from "../../store/lessonPlan/actions/uploadLessonPlanImage";
import { connect } from "react-redux";
import { MessagePopUp } from "../MessagePopUp/MessagePopUp";
import { CircularLoading } from "../CircularLoading/CircularLoading";
import { handleLsnPlanAndLsnProcChange } from "../../store";
import { shortText } from "../../helpers/shortText";
import { fileSizeConverter } from "../../helpers/fileSizeConverter";
import { useTranslation } from "react-i18next";

const imageMimeTypes = ".jpg, .png";
const acceptedTypes = "image/png image/jpg image/jpeg";

const imageFileCheck = (image) => {
  let splitType = image.name.split(".");
  let imageType = splitType[splitType.length - 1];

  return (
    acceptedTypes.includes(image.type) &&
    imageMimeTypes.includes(imageType) &&
    image.size <= 5 * 1024 ** 2
  );
};

function LessonPlanImageUploaderComponent(props) {
  const {
    handleLsnPlanAndLsnProcChange,
    fileUploadMessage,
    uploadLessonPlanImage,
    fileUploadStatus,
    lessonPlan,
    onClose,
  } = props;

  const [openCrop, setOpenCrop] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [croppedPhoto, setCroppedPhoto] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [disableBtn, setDisableBtn] = useState(true);
  const { t, i18n } = useTranslation();

  let splitImageUrl = lessonPlan.backgroundImg.split("/");
  let imageName = splitImageUrl[splitImageUrl.length - 1];
  let splitImageName = imageName.split(".");
  let imageType = splitImageName[splitImageName.length - 1];

  const [file, setFile] = useState({
    _src: lessonPlan.backgroundImg,
    name: imageName,
    type: `image/${imageType ?? "png"}`,
  });
  const controller = new AbortController();

  const handleClosePopUp = useCallback(() => {
    setErrorMessage("");
  }, []);

  const handleOpenCloseCrop = useCallback(() => {
    setOpenCrop(true);
  }, [file]);

  const handleCrop = useCallback(({ file, url }) => {
    setCroppedPhoto({
      ...file,
      name: file.name,
      size: file.size,
      type: file.type,
      _src: url,
    });
    setOpenCrop(false);
    setDisableBtn(false);
  }, []);

  const handleCloseCrop = useCallback(() => {
    setOpenCrop(false);
  }, []);

  const handleUploadFile = useCallback((e) => {
    const { files } = e.target;
    const file = files[0];
    file._src = URL.createObjectURL(file);

    e.target.value = "";
    if (!imageFileCheck(file)) {
      return setErrorMessage(
        t("Image must be JPG or PNG and no larger than 5MB")
      );
    }

    setFile(file);
    setCroppedPhoto(file);
    setDisableBtn(false);
    setOpenCrop(true);
  }, []);

  const handleRemoveFile = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();

      controller.abort();

      setFile({});

      setCroppedPhoto({});
      setDisableBtn(false);
    },
    [controller]
  );

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    const { files } = e.dataTransfer;
    const file = files[0];
    file._src = URL.createObjectURL(file);

    if (!imageFileCheck(file)) {
      return setErrorMessage(
        t("Image must be JPG or PNG and no larger than 5MB")
      );
    }

    setFile(file);

    setCroppedPhoto(file);
  }, []);

  const handleDragEnter = useCallback(() => {
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const onDragOver = useCallback((e) => {
    e.stopPropagation();
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleSave = useCallback(
    (e) => {
      e.stopPropagation();

      //Todo:
      // if ((!croppedPhoto || !croppedPhoto._src) && !file || !file._src) return;

      uploadLessonPlanImage({
        langauge: i18n.language,
        backgroundImg: (croppedPhoto || file) ?? null,
        // wholeImage: lessonPlan.wholeImage ?? null,
        // file: file,
        lessonPlanId: lessonPlan.id,
        controller,
      });
    },
    [lessonPlan, croppedPhoto, file, controller]
  );

  useEffect(() => {
    if (fileUploadStatus === "success") {
      handleLsnPlanAndLsnProcChange("fileUploadStatus", "");
      return onClose();
    }

    if (fileUploadStatus === "fail") {
      setErrorMessage(fileUploadMessage);
    }
  }, [fileUploadStatus]);

  return openCrop && (!!file._src || croppedPhoto._src) ? (
    <Crop
      photoURL={file?._src || croppedPhoto._src}
      image={file}
      onCancel={handleCloseCrop}
      onCrop={handleCrop}
    />
  ) : (
    <div
      className="image_uploader_wrapper"
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <div className="image_uploader_container">
        <figure className="image_uploader_close" onClick={onClose}>
          <img
            src={closeIcon}
            alt={t("Close")}
            className="image_uploader_close_icon"
          />
        </figure>
        <div className="image_uploader_body">
          <div
            className={`image_uploader_area ${isDragging ? "drag" : ""}`}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={onDragOver}
            onDrop={handleDrop}
          >
            <img
              src={uploadCloud}
              alt="cloud"
              className="image_uploader_icon"
            />
            <div className="image_uploader_info">
              <h3 className="image_uploader_info_title">
                {t("Select Lesson Display Image")}
              </h3>
              <p className="image_uploader_info_desc">
                {t("Image must be JPG or PNG and no larger than 5MB")}
              </p>
            </div>
            <input
              type="file"
              onChange={handleUploadFile}
              className="image_uploader_input"
              accept={imageMimeTypes}
              id="file-input"
            />
            <label htmlFor="file-input" className="image_uploader_select_btn">
              {t("Select")}
            </label>
          </div>
          {!!file && !!file.name && (
            <div className="image_uploader_file">
              <div className="image_uploader_file_info">
                {fileUploadStatus === "request" ? (
                  <CircularLoading />
                ) : (
                  <img
                    src={pictureIcon}
                    alt="Image"
                    className="image_uploader_file_icon"
                  />
                )}

                <p className="image_uploader_file_name">{file.name}</p>
                {file.size && (
                  <p className="image_uploader_file_size">
                    {fileSizeConverter(file.size)}
                  </p>
                )}
              </div>
              <figure
                className="image_uploader_file_delete"
                onClick={handleRemoveFile}
              >
                <img
                  src={deleteIcon}
                  alt={t("Delete")}
                  className="image_uploader_file_delete_icon"
                />
              </figure>
            </div>
          )}

          <div className="image_uploader_actions">
            <GreyButton onClick={onClose} style={{ marginRight: "12px" }}>
              {t("Cancel")}
            </GreyButton>
            <GreenButton
              onClick={handleSave}
              disabled={disableBtn}
              style={{
                background: disableBtn && "gray",
                cursor: disableBtn ? "not-allowed" : "pointer",
              }}
              // disabled={fileUploadStatus === 'request'}
            >
              {t("Confirm")}
            </GreenButton>
          </div>
        </div>
        <article className="image_uploader_card">
          <figure
            className="image_uploader_card_image_figure"
            onClick={handleOpenCloseCrop}
          >
            <img
              src={
                croppedPhoto._src ||
                file._src ||
                lessonPlan?.subjectDefaultImg ||
                defaultImage
              }
              alt="Lesson plan image"
              className="image_uploader_card_image"
              onError={(e) => {
                e.target.error = null;
                e.target.src = defaultImage;
              }}
            />
            <div className="image_uploader_card_image_edit">
              <img src={pencilWhite} alt={t("Edit")} />
            </div>
          </figure>
          <div className="image_uploader_card_body">
            <figure className="image_uploader_card_profile_image_figure">
              <img
                src={`/files/${lessonPlan.userId}/${lessonPlan.imageName}`}
                alt="Profile image"
                className="image_uploader_card_profile_image"
                onError={(e) => {
                  e.target.error = null;
                  e.target.src = defaultImage;
                }}
              />
            </figure>
            <h2 className="image_uploader_card_name">{lessonPlan.fullName}</h2>
            <p className="image_uploader_card_title">
              {shortText(lessonPlan.topic, 50)}
            </p>
          </div>
        </article>
      </div>

      <MessagePopUp
        onClosePopup={handleClosePopUp}
        open={!!errorMessage}
        title={t("Error")}
        text={errorMessage}
        closeBtnTitle={t("Close")}
        onAlertCancelClick={handleClosePopUp}
        styleText={{ textAlign: "center" }}
        popUpContainerStyles={{ top: "50%" }}
        styleTitle={{ color: "#EA6670" }}
        styleCancelBtn={{
          background: "#EA6670",
          color: "#FFF",
        }}
      />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    fileUploadStatus: state.lessonPlanReducer.fileUploadStatus,
    fileUploadMessage: state.lessonPlanReducer.fileUploadMessage,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    uploadLessonPlanImage: (params) => dispatch(uploadLessonPlanImage(params)),
    handleLsnPlanAndLsnProcChange: (key, value) =>
      dispatch(handleLsnPlanAndLsnProcChange(key, value)),
  };
};
export const LessonPlanImageUploader = connect(
  mapStateToProps,
  mapDispatchToProps
)(LessonPlanImageUploaderComponent);
