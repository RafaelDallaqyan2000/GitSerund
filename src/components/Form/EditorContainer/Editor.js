import React, { Component, useRef, useState } from "react";
import { convertFromRaw, EditorState, RichUtils, convertToRaw } from "draft-js";
import Editor, { composeDecorators } from "draft-js-plugins-editor";
import createInlineToolbarPlugin, {
  Separator,
} from "draft-js-inline-toolbar-plugin";
import {
  ItalicButton,
  BoldButton,
  UnderlineButton,
  HeadlineOneButton,
  HeadlineTwoButton,
  HeadlineThreeButton,
  UnorderedListButton,
  OrderedListButton,
  SupButton,
  SubButton,
} from "draft-js-buttons";
// import "draft-js/dist/Draft.css";
import "draft-js-inline-toolbar-plugin/lib/plugin.css";
import "./editorStyles.css";
import createImagePlugin from "draft-js-image-plugin";
import createFocusPlugin from "draft-js-focus-plugin";
import createResizeablePlugin from "draft-js-resizeable-plugin";
import createBlockDndPlugin from "draft-js-drag-n-drop-plugin";
// import createLinkPlugin from '@draft-js-plugins/anchor';
// import createLinkPlugin from 'draft-js-link-plugin'
// import 'draft-js-link-plugin/lib/plugin.css'
import createInlineStyleButton from "draft-js-buttons/lib/utils/createInlineStyleButton";
import { useParams } from "react-router";
// import Link from "draft-js-link-plugin/lib/Link";
import {
  handleFormChange,
  fetchHomeDetails,
  fetchPathOfCurrentImage,
} from "../../../store";
import { connect } from "react-redux";
createInlineStyleButton({
  style: "SUBSCRIPT",
  children: (
    <div className="SubButton-button ToolbarButton-button">
      x<sub>2</sub>
    </div>
  ),
});

createInlineStyleButton({
  style: "SUPERSCRIPT",
  children: (
    <div className="SupButton-button ToolbarButton-button">
      x<sup>2</sup>
    </div>
  ),
});

const inlineToolbarPlugin = createInlineToolbarPlugin({
  structure: [
    ItalicButton,
    BoldButton,
    UnderlineButton,

    HeadlineOneButton,
    HeadlineTwoButton,
    HeadlineThreeButton,
    UnorderedListButton,
    OrderedListButton,

    SupButton,
    SubButton,

    // props => <MyButton {...props} createComment={(text) => alert(text)} />
  ],
});
// const inlineToolbarPlugin = createInlineToolbarPlugin();
const { InlineToolbar } = inlineToolbarPlugin;
// const plugins = [inlineToolbarPlugin];

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
// const linkPlugin = createLinkPlugin()
const plugins = [
  blockDndPlugin,
  focusPlugin,
  resizeablePlugin,
  imagePlugin,
  inlineToolbarPlugin,
];

const EditorComponent = ({
  id,
  handleFormChange,
  actionId,
  fetchHomeDetails,
  fetchPathOfCurrentImage,
  currentImagePath,
  studentFiles,
  teacherFiles,
  currentAction,
  scrollTop,
}) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const editor = useRef();
  const { auth } = useParams();
  const { action } = useParams();
  const [files, setFiles] = useState([]);
  const [uploadedImages, setUploadedImages] = useState([]);

  // const [teacherFiles, setTeacherFiles] = useState([]);

  const [deleteIndex, setDeleteIndex] = useState();
  const deleteRef = useRef();
  const [openOptions, setOpenOptions] = useState(false);
  const onChange = (e) => {
    setEditorState(e);
  };

  const focus = () => {
    editor.current.focus();
  };

  const insertImage = (e) => {
    if (e.target.files && e.target.files[0]) {
      let file = e.target.files[0];
      let path = URL.createObjectURL(file);
      onChange(imagePlugin.addImage(editorState, path));
    }
  };

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

  const handleMouseOut = () => {
    // deleteRef.current.style.display = "none"
    setDeleteIndex(undefined);
  };

  const deleteFile = (index) => {
    if (action === "teacher") {
      // teacherFiles.splice(index, 1)

      files.splice(index, 1);
      setFiles([...files]);
      handleFormChange("teacherFiles", files);
    } else {
      // studentFiles.splice(index, 1)

      files.splice(index, 1);
      setFiles([...files]);
      handleFormChange("studentFiles", files);
    }
  };

  return (
    <div>
      <div>
        {files?.map((file, index) => {
          return (
            <div
              key={index}
              className="attch-files"
              onMouseOut={handleMouseOut}
              onMouseOver={() => handleMouseOver(index)}
            >
              {file.file.type ===
              "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ? (
                <img
                  style={{ width: "25px", height: "30px", marginTop: "-11px" }}
                  src={require("../../../img/word.svg").default}
                />
              ) : null}
              {file.file.type === "application/pdf" ? (
                <img
                  style={{ width: "30px", height: "30px", marginTop: "-11px" }}
                  src="https://img.icons8.com/ultraviolet/40/000000/pdf--v1.png"
                />
              ) : null}

              <p style={{ fontSize: "12px", paddingLeft: "10px" }}>
                {file.file.name}
              </p>
              {deleteIndex === index ? (
                <div
                  className="delete-file"
                  ref={deleteRef}
                  style={{ display: "inherit" }}
                >
                  <img
                    src={require("../../../img/deleteFile.svg").default}
                    style={{ height: "30px" }}
                  />
                  <button
                    className="delete-file-btn"
                    onClick={() => deleteFile(index)}
                  >
                    Ջնջել
                  </button>
                </div>
              ) : (
                <div
                  className="delete-file"
                  ref={deleteRef}
                  style={{ display: "none" }}
                >
                  <img src={require("../../../img/deleteFile.svg").default} />
                  <button
                    className="delete-file-btn"
                    onClick={() => deleteFile(index)}
                  >
                    Ջնջել
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
      {currentAction === "materialsUsed" ? (
        <div style={{ display: "flex" }}>
          <button
            className="plusik-lsn-proc1"
            onClick={() => setOpenOptions(!openOptions)}
          >
            <img src={require("../../../img/plusik.svg").default} />
          </button>
          {openOptions ? (
            <div className="all-opportunities">
              <div>
                <input
                  type="file"
                  onChange={(e) => insertImage(e)}
                  accept="image/png image/jpeg image/jpg"
                  style={{ fontSize: 0, height: "24px" }}
                />
                <img
                  src={require("../../../img/downloadImg.svg").default}
                  style={{ width: "26px", height: "26px" }}
                />
              </div>
              <div>
                <input
                  type="file"
                  onChange={(e) => onFileChange(e)}
                  accept="application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/pdf"
                  style={{ fontSize: 0, height: "24px" }}
                />
                <img
                  src={require("../../../img/downloadFile.svg").default}
                  style={{ width: "23px", height: "24px" }}
                />
              </div>
              {/* <div className="line backg-white">
                                <img src={require("../../../img/line.svg").default} style={{ paddingTop: "11px" }} />
                            </div> */}
            </div>
          ) : null}
        </div>
      ) : null}
      <div></div>
      <div className="editor" onClick={focus}>
        <Editor
          // onBlur={blur}
          editorState={editorState}
          // handleKeyCommand={handleKeyCommand}
          onChange={(e) => onChange(e)}
          plugins={plugins}
          ref={editor}
          // onTab={onTab}
          customStyleMap={{
            SUBSCRIPT: { fontSize: "0.6em", verticalAlign: "sub" },
            SUPERSCRIPT: { fontSize: "0.6em", verticalAlign: "super" },
          }}
          key={id}
        />
        {/* <Toolbar /> */}
        <InlineToolbar>
          {
            // may be use React.Fragment instead of div to improve perfomance after React 16
            (externalProps) => (
              <div>
                <BoldButton {...externalProps} />
                <ItalicButton {...externalProps} />
                <UnderlineButton {...externalProps} />
                <UnorderedListButton {...externalProps} />
                <OrderedListButton {...externalProps} />
                <SubButton {...externalProps} />
                <SupButton {...externalProps} />
                <HeadlineOneButton {...externalProps} />
                <HeadlineTwoButton {...externalProps} />
                <HeadlineThreeButton {...externalProps} />
              </div>
            )
          }
        </InlineToolbar>
      </div>
    </div>
  );
  //   }
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleFormChange: (key, value) => dispatch(handleFormChange(key, value)),
    fetchHomeDetails: () => dispatch(fetchHomeDetails()),
    fetchPathOfCurrentImage: (file) => dispatch(fetchPathOfCurrentImage(file)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditorComponent);
