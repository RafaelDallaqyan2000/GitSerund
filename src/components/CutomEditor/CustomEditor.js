import React, { useEffect, useState } from "react";
import "draft-js-inline-toolbar-plugin/lib/plugin.css";
import "./CustomEditor.css";
import {
  handleFormChange,
  fetchPathOfCurrentImage,
  uploadFile,
} from "../../store";
import { connect } from "react-redux";
import { MyEditor } from "../MyEditor/MyEditor";
import { useParams } from "react-router";
import { useTranslation } from "react-i18next";

const CustomEditorComponent = ({
  id,
  handleFormChange,
  onFocus,
  containerClassName = "",
  containerStyle,
  cleanState,
  editorState = "",
  currentAction,
  setCleanState = () => {},
  imageUploadParams,
  onlyRead,
  disabled,
  placeholder,
}) => {
  const [showPlaceholderInEditor, setShowPlaceholderInEditor] = useState(true);
  const setEditorState = (state) => handleFormChange(`${id}`, state);
  const { lessonPlanId } = useParams();

  const onChange = (value) => {
    setEditorState(value ? value : "");
  };

  useEffect(() => {
    if (cleanState) {
      setCleanState(false);
    }
  }, [cleanState]);
  const imageParams = {
    ...imageUploadParams,
    lessonPlanId,
    subFolder:
      currentAction === "guide"
        ? `/${currentAction}Files`
        : `/${currentAction}Image`,
  };

  if (onlyRead) {
    return (
      <div className={"only-read-text-container"}>
        {editorState ? (
          <p dangerouslySetInnerHTML={{ __html: editorState }} />
        ) : (
          <p>________________________________________</p>
        )}
      </div>
    );
  }

  const handlePlaceholderClick = (value = false) => {
    setShowPlaceholderInEditor(value);
  };

  return (
    <div>
      {/*!disabled && canAttachFile && <FileUploader currentAction={currentAction} />}*/}
      <div
        id={id}
        className={`editor ${containerClassName}`}
        style={{
          backgroundColor: disabled ? "lightgray" : "#FFF",
          ...containerStyle,
        }}
      >
        <MyEditor
          placeholder={placeholder}
          disabled={disabled}
          onChange={onChange}
          editorState={editorState}
          onFocus={onFocus}
          imageUploadParams={imageParams}
          onPlaceholderClick={handlePlaceholderClick}
          showPlaceholder={showPlaceholderInEditor}
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state, { id, currentAction }) => {
  return {
    editorState: state.formReducer[`${id}`] ?? "",
    currentImagePath:
      state.formReducer["currentImagePath" + currentAction + "Image"] ?? "",
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    uploadFile: (
      language,
      field,
      file,
      files,
      forceRender,
      id,
      setLoading,
      actionId,
      handleSuccess
    ) =>
      dispatch(
        uploadFile(
          language,
          field,
          file,
          files,
          forceRender,
          id,
          setLoading,
          actionId,
          handleSuccess
        )
      ),
    handleFormChange: (key, value) => dispatch(handleFormChange(key, value)),
    fetchPathOfCurrentImage: (file, field, setLoading) =>
      dispatch(fetchPathOfCurrentImage(file, field, setLoading)),
  };
};

export const CustomEditor = connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomEditorComponent);
