import React, {
  Component,
  useRef,
  useState,
  useEffect,
  useCallback,
} from "react";
import { EditorState, ContentState, convertFromHTML } from "draft-js";
import Editor, { composeDecorators } from "draft-js-plugins-editor";
import createInlineToolbarPlugin from "draft-js-inline-toolbar-plugin";
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
import "draft-js-inline-toolbar-plugin/lib/plugin.css";
import createImagePlugin from "draft-js-image-plugin";
import createFocusPlugin from "draft-js-focus-plugin";
import createResizeablePlugin from "draft-js-resizeable-plugin";
import createBlockDndPlugin from "draft-js-drag-n-drop-plugin";
import createInlineStyleButton from "draft-js-buttons/lib/utils/createInlineStyleButton";
import {
  handleFormChange,
  fetchPathOfCurrentImage,
  uploadFile,
} from "../../../store";
import { connect } from "react-redux";
import editorStyles from "./editorStyles.css";
import { stateToHTML } from "draft-js-export-html";
import createToolbarLinkPlugin from "draft-js-toolbar-link-plugin";
// var stateFromHTML = require("draft-js-import-html").stateFromHTML;
import { useForceRender } from "../../../hooks/useForceRender";
import request from "../../../store/request";
import { dataURLtoBlob } from "../../../helpers/dataUrlToBlob";
import SnippingTool from "../../../components/SnippingTool";
import { MessagePopUp } from "../../../components/MessagePopUp/MessagePopUp";
import { useTranslation } from "react-i18next";

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

const toolbarLinkPlugin = createToolbarLinkPlugin({
  inputPlaceholder: "Insert URL here...",
});
const { LinkButton } = toolbarLinkPlugin;

class HeadlinesPicker extends Component {
  componentDidMount() {
    setTimeout(() => {
      window.addEventListener("click", this.onWindowClick);
    });
  }

  componentWillUnmount() {
    window.removeEventListener("click", this.onWindowClick);
  }

  onWindowClick = () =>
    // Call `onOverrideContent` again with `undefined`
    // so the toolbar can show its regular content again.
    this.props.onOverrideContent(undefined);

  render() {
    const buttons = [HeadlineOneButton, HeadlineTwoButton, HeadlineThreeButton];
    return (
      <div>
        {buttons.map(
          (
            Button,
            i // eslint-disable-next-line
          ) => (
            <Button key={i} {...this.props} />
          )
        )}
      </div>
    );
  }
}

class HeadlinesButton extends Component {
  // When using a click event inside overridden content, mouse down
  // events needs to be prevented so the focus stays in the editor
  // and the toolbar remains visible  onMouseDown = (event) => event.preventDefault()
  onMouseDown = (event) => event.preventDefault();

  onClick = () =>
    // A button can call `onOverrideContent` to replace the content
    // of the toolbar. This can be useful for displaying sub
    // menus or requesting additional information from the user.
    this.props.onOverrideContent(HeadlinesPicker);

  render() {
    return (
      <div
        onMouseDown={this.onMouseDown}
        className={editorStyles.headlineButtonWrapper}
      >
        <button onClick={this.onClick} className={editorStyles.headlineButton}>
          H
        </button>
      </div>
    );
  }
}

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
    LinkButton,
    SupButton,
    SubButton,

    // props => <MyButton {...props} createComment={(text) => alert(text)} />
  ],
});
// const toolbarLinkPlugin = createToolbarLinkPlugin({
//     inputPlaceholder: 'Insert URL here...'
// })
// const inlineToolbarPlugin = createInlineToolbarPlugin();
const { InlineToolbar } = inlineToolbarPlugin;
// const plugins = [inlineToolbarPlugin];

// const { LinkButton } = toolbarLinkPlugin

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
  toolbarLinkPlugin,
];

const TeacherEditorComponent = ({
  id,
  handleFormChange,
  currentAction,
  fetchPathOfCurrentImage,
  currentImagePath,
  teacherActionText,
  lessonId,
  files,
  popupDetails,
}) => {
  const { t, i18n } = useTranslation();
  const forceRender = useForceRender();
  const [snippingToolIsOpen, setSnippingToolIsOpen] = useState(false);
  const [openOptions, setOpenOptions] = useState(false);
  const [errorMessage, setErrorMessage] = useState({
    type: "fail",
    title: "",
    text: "",
  });

  let blocksFromHTML = convertFromHTML(teacherActionText);
  let content = ContentState.createFromBlockArray(
    blocksFromHTML.contentBlocks,
    blocksFromHTML.entityMap
  );
  // }
  const [editorState, setEditorState] = useState(
    EditorState.createWithContent(content)
  );

  useEffect(() => {
    let blocksFromHTML = convertFromHTML(teacherActionText);
    let content = ContentState.createFromBlockArray(
      blocksFromHTML.contentBlocks,
      blocksFromHTML.entityMap
    );
    setEditorState(EditorState.createWithContent(content));
  }, [lessonId]);

  const editor = useRef();
  const deleteRef = useRef();
  const onChange = (editorState) => {
    setEditorState(editorState);

    let htmlText = stateToHTML(
      editorState.getCurrentContent(),
      editorState.getCurrentInlineStyle()
    );

    handleFormChange("teacherActionText", htmlText);
  };

  const focus = () => {
    editor.current.focus();
  };

  useEffect(() => {
    if (currentImagePath !== "") {
      onChange(
        imagePlugin.addImage(
          editorState,
          `${window.location.origin}${currentImagePath}`
        )
      );
    }
  }, [currentImagePath]);

  const insertImage = (e) => {
    if (e.target.files && e.target.files[0]) {
      let file = e.target.files[0];

      fetchPathOfCurrentImage(file, currentAction);
    }
  };

  const onFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      let file = e.target.files[0];
      if (files.some((f) => f.name === file.name)) {
        setErrorMessage({
          type: "fail",
          title: t("Error"),
          text: `${file.name} անունով ֆայլ արդեն ավելացված է`,
        });
      } else {
        uploadFile(
          i18n.language,
          currentAction + "Files",
          file,
          files,
          forceRender
        );
      }
    }
  };

  const deleteFile = (name) => {
    let index = files.findIndex((f) => f.name === name);
    request("/api/files/remove", "POST", { filePath: files[index].path });
    files.splice(index, 1);
    handleFormChange(currentAction + "Files", files);
    forceRender();
  };

  const handleImageCapture = ({ imageDataUrl }) => {
    const blob = dataURLtoBlob(imageDataUrl);
    const file = new File([blob], "img" + Date.now() + ".png", {
      type: "image/png",
    });
    fetchPathOfCurrentImage(file, currentAction);
  };

  const handleClosePopup = useCallback(() => {
    setErrorMessage({
      type: "fail",
      title: "",
      text: "",
    });
  }, []);

  useEffect(() => {
    setErrorMessage(popupDetails);
  }, [popupDetails]);

  return (
    <div>
      <MessagePopUp
        onClosePopup={handleClosePopup}
        open={!!errorMessage?.text}
        title={errorMessage?.title}
        text={errorMessage?.text}
        closeBtnTitle={t("Close")}
        onAlertCancelClick={handleClosePopup}
        styleText={{ textAlign: "center" }}
        popUpContainerStyles={{ top: "50%" }}
        styleTitle={{
          color: errorMessage?.type === "success" ? "#1C1C1C" : "#EA6670",
        }}
        styleCancelBtn={{
          background:
            errorMessage?.type === "success"
              ? "linear-gradient(83.13deg, #6FD89C 0%, #46B776 100%)"
              : "#EA6670",
          color: "#FFF",
        }}
      />

      <SnippingTool
        isOpen={snippingToolIsOpen}
        close={() => setSnippingToolIsOpen(false)}
        onImageCapture={handleImageCapture}
      />
      <div>
        {files.map((file, index) => {
          return file.upLoading ? (
            <p key={file.file.name}>loading</p>
          ) : (
            <div
              key={file.file.name}
              className="attch-files"
              style={{ marginTop: "33px" }}
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
              <a
                target="_blank"
                href={file.path}
                style={{ fontSize: "12px", paddingLeft: "10px" }}
              >
                {file.file.name}
              </a>
              <div className="delete-file" ref={deleteRef}>
                <img
                  src={require("../../../img/deleteFile.svg").default}
                  style={{ height: "30px" }}
                />
                <button
                  className="delete-file-btn"
                  onClick={() => deleteFile(file.name)}
                >
                  {t("Delete")}
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <div
        style={{
          display: "flex",
          //  marginTop: "23px"
        }}
      >
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
            <div onClick={() => setSnippingToolIsOpen(true)}>
              <img
                src={require("../../../img/downloadImg.svg").default}
                style={{ width: "26px", height: "26px" }}
              />
            </div>
          </div>
        ) : null}
      </div>
      <div className="editor" onClick={focus}>
        <Editor
          editorState={editorState}
          onChange={onChange}
          plugins={plugins}
          ref={editor}
          customStyleMap={{
            SUBSCRIPT: { fontSize: "0.6em", verticalAlign: "sub" },
            SUPERSCRIPT: { fontSize: "0.6em", verticalAlign: "super" },
          }}
          key={id}
          placeholder={t("Type the text here")}
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
                {/* <HeadlineTwoButton {...externalProps} />
                                <HeadlineThreeButton {...externalProps} /> */}
                {/* <HeadlinesButton {...externalProps} /> */}
                <LinkButton {...externalProps} />
                {/* <HeadlinesButton {...externalProps}/> */}
              </div>
            )
          }
        </InlineToolbar>
      </div>
      {/* <div dangerouslySetInnerHTML={{ __html: html }}></div> */}
    </div>
  );
  //   }
};

const mapStateToProps = (state, ownProps) => {
  return {
    teacherActionText: state.formReducer.teacherActionText ?? "<p></p>",
    lessonId: state.formReducer.id,
    files: state.formReducer[ownProps.currentAction + "Files"] ?? [],
    imageInEditor: state.formReducer.imageInEditor,
    // lessFiles: state.formReducer.lessFiles ?? [],
    currentImagePath:
      state.formReducer["currentImagePath" + ownProps.currentAction] ?? "",
    popupDetails: state.lessonProcessReducer.popupDetails,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleFormChange: (key, value) => dispatch(handleFormChange(key, value)),
    fetchPathOfCurrentImage: (file, field) =>
      dispatch(fetchPathOfCurrentImage(file, field)),
    uploadFile: (language, field, file, files, forceRender) =>
      dispatch(uploadFile(language, field, file, files, forceRender)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TeacherEditorComponent);
