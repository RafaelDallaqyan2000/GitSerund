import React, {
  Component,
  useRef,
  useState,
  useEffect,
  Fragment,
  useCallback,
} from "react";
import "./EditorContainer.css";
import { Editor } from "react-draft-wysiwyg";

import {
  EditorState,
  ContentState,
  convertFromHTML,
  AtomicBlockUtils,
  RichUtils,
  convertToRaw,
  convertFromRaw,
} from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import {
  handleFormChange,
  fetchHomeDetails,
  fetchPathOfCurrentImage,
} from "../../../store";
import { connect } from "react-redux";

import { useParams } from "react-router";
import editorStyles from "./EditorContainer.css";
import createImagePlugin from "draft-js-image-plugin";
import createFocusPlugin from "draft-js-focus-plugin";
import createResizeablePlugin from "draft-js-resizeable-plugin";
import createBlockDndPlugin from "draft-js-drag-n-drop-plugin";
import { composeDecorators } from "draft-js-plugins-editor";
import { handleLsnProcChange } from "../../../store/lessonProcess/actions/handleLsnProcChange";
import { MessagePopUp } from "../../MessagePopUp/MessagePopUp";
import { useTranslation } from "react-i18next";

const focusPlugin = createFocusPlugin();
const resizeablePlugin = createResizeablePlugin({
  vertical: "relative",
  horizontal: "relative",
});
const blockDndPlugin = createBlockDndPlugin();

const decorator = composeDecorators(
  resizeablePlugin.decorator,
  focusPlugin.decorator,
  blockDndPlugin.decorator
);
const imagePlugin = createImagePlugin({ decorator });

const plugins = [blockDndPlugin, focusPlugin, resizeablePlugin, imagePlugin];

const EditorContainer = ({
  id,
  value,
  handleFormChange,
  actionId,
  fetchHomeDetails,
  fetchPathOfCurrentImage,
  currentImagePath,
  studentFiles,
  teacherFiles,
  currentAction,
  scrollTop,
  handleLsnProcChange,
  popupDetails,
}) => {
  const { t } = useTranslation();
  const [editorState, setEditoreState] = useState(EditorState.createEmpty());
  const editorRef = useRef();
  const [uploadedImages, setUploadedImages] = useState([]);
  const { action } = useParams();
  const [files, setFiles] = useState([]);

  useEffect(() => {
    fetchHomeDetails();
  }, []);

  useEffect(() => {
    if (currentImagePath !== "" && id === "materialsUsedText") {
      // handleFormChange("currentImagePath","http://localhost:8080/files/10/1.jpg")
      const entityData = {
        src: "C:/UsersTable/Device9/Desktop/daser/1.jpg",
        height: 50,
        width: 50,
      };
      const contentStateWithEntity = editorState
        .getCurrentContent()
        .createEntity("IMAGE", "SEGMENTED", entityData);

      const entityKey = contentStateWithEntity.getLastCreatedEntityKey();

      let newEditorState = EditorState.set(editorState, {
        currentContent: contentStateWithEntity,
      });
      newEditorState = AtomicBlockUtils.insertAtomicBlock(
        editorState,
        entityKey,
        " "
      );

      setEditoreState(newEditorState);
    }
  }, [currentImagePath]);

  useEffect(() => {
    if (value === undefined || value === "") {
      setEditoreState(EditorState.createEmpty());
    } else {
      let content = ContentState.createFromBlockArray(convertFromHTML(value));
      setEditoreState(EditorState.createWithContent(content));
    }

    if (action === "teacher") {
      setFiles(teacherFiles);
    } else {
      setFiles(studentFiles);
    }
  }, [action, actionId]);

  document.onMouseDown = (e) => {};

  const onFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      let file = e.target.files[0];

      const newArr = [
        ...files,
        {
          // type: file.type,
          // name: file.name,
          // size: parseInt(file.size / 1024),
          file: file,
        },
      ];

      setFiles([...newArr]);
      handleFormChange("usedMaterials", newArr);
    }
  };

  const handleMouseOver = (index) => {
    // deleteRef.current.style.display = "block"
    setDeleteIndex(index);
  };
  // }, [action, actionId]);

  const onEditorStateChange = (e) => {
    setEditoreState(e);

    handleFormChange(id, editorRef.current.editor.editor.innerHTML);

    if (
      (window.getSelection().toString() !== "" &&
        editorState.getSelection().hasFocus) ||
      editorRef.current.focusHandler.inputFocused
    ) {
      var sel = window.getSelection();

      if (sel) {
        // let s = window.getSelection();
        var oRange = sel.getRangeAt(0);
        let oRect = oRange.getBoundingClientRect();
        var top = oRect.top;
        var left = oRect.left;
        var right = oRect.right;
      }

      editorRef.current.wrapper.previousSibling.className =
        "edit toolbarClassName toolbarHidden";
      editorRef.current.wrapper.previousSibling.style.position = "absolute";
      //   editorRef.current.wrapper.previousSibling.style.top = `0px`;
      editorRef.current.wrapper.previousSibling.style.top = `${top - 143}px`;
      //   editorRef.current.wrapper.previousSibling.style.top = `${top - 20}px`;
      if (scrollTop === undefined) {
        editorRef.current.wrapper.previousSibling.style.top = `${top - 143}px`;
      } else {
        editorRef.current.wrapper.previousSibling.style.top = `${
          scrollTop + top - 143
        }px`;
      }
      if (right >= 989) {
        editorRef.current.wrapper.previousSibling.style.marginLeft = `550px`;
      } else {
        editorRef.current.wrapper.previousSibling.style.marginLeft = `${
          left - 430
        }px`;
      }
    } else {
      editorRef.current.wrapper.previousSibling.className =
        "rdw-editor-toolbar toolbarClassName toolbarHidden";
    }
  };

  document.onMouseDown = (e) => {};

  const _uploadImageCallBack = (e) => {
    if (e.target.files && e.target.files[0]) {
      let file = e.target.files[0];
      let arry = uploadedImages;
      fetchPathOfCurrentImage(file);
    }
  };

  const handleClosePopup = useCallback(() => {
    handleLsnProcChange("popupDetails", {
      type: "fail",
      title: "",
      text: "",
    });
  }, []);

  return (
    <div style={{ marginTop: "35px" }}>
      <MessagePopUp
        onClosePopup={handleClosePopup}
        open={!!popupDetails?.text}
        title={popupDetails?.title}
        text={popupDetails?.text}
        closeBtnTitle={t("Close")}
        onAlertCancelClick={handleClosePopup}
        styleText={{ textAlign: "center" }}
        popUpContainerStyles={{ top: "50%" }}
        styleTitle={{
          color: popupDetails?.type === "success" ? "#1C1C1C" : "#EA6670",
        }}
        styleCancelBtn={{
          background:
            popupDetails?.type === "success"
              ? "linear-gradient(83.13deg, #6FD89C 0%, #46B776 100%)"
              : "#EA6670",
          color: "#FFF",
        }}
      />

      <Editor
        ref={editorRef}
        toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName"
        editorClassName="editorClassName"
        editorState={editorState}
        onEditorStateChange={(e) => onEditorStateChange(e)}
        toolbar={{
          options: [
            "inline",
            "fontSize",
            "fontFamily",
            "list",
            "link",
            "image",
          ],
          image: {
            className: undefined,
            component: undefined,
            popupClassName: undefined,
            urlEnabled: true,
            uploadEnabled: true,
            alignmentEnabled: true,
            uploadCallback: _uploadImageCallBack,
            previewImage: false,
            inputAccept:
              "application/pdf,image/jpeg,image/jpg,image/png,image/svg,application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            alt: { present: false, mandatory: false },
            defaultSize: {
              height: "auto",
              width: "auto",
            },
          },
          inline: {
            options: [
              "bold",
              "italic",
              "underline",
              "superscript",
              "subscript",
            ],
            // bold: { icon: require('./image/bold.svg').default, className: undefined },
            // italic: {icon: require('./image/italic.svg').default}
          },
        }}
        key="editorr"
        placeholder={t("Type the text here")}
      />
      {/* <div dangerouslySetInnerHTML={{ __html: html }}></div> */}
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    studentText: state.formReducer.studentText ?? "",
    teacherText: state.formReducer.teacherText ?? "",
    value: state.formReducer[ownProps.id],
    actionId: state.formReducer.actionId,
    imageInEditor: state.formReducer.imageInEditor,
    // lessFiles: state.formReducer.lessFiles ?? [],
    currentImagePath: state.formReducer.currentImagePath ?? "",
    studentFiles: state.formReducer.studentFiles ?? [],
    teacherFiles: state.formReducer.teacherFiles ?? [],
    procOfLesson: state.lessonProcessReducer.procOfLesson ?? [],
    scrollTop: state.formReducer.scrollTop,
    popupDetails: state.lessonProcessReducer.popupDetails,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleFormChange: (key, value) => dispatch(handleFormChange(key, value)),
    fetchHomeDetails: () => dispatch(fetchHomeDetails()),
    fetchPathOfCurrentImage: (file) => dispatch(fetchPathOfCurrentImage(file)),
    handleLsnProcChange: (key, value) =>
      dispatch(handleLsnProcChange(key, value)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditorContainer);
