import React, { Component, useRef, useState, useEffect } from "react";
import {
  EditorState,
  ContentState,
  convertFromHTML,
  AtomicBlockUtils,
} from "draft-js";
import Editor, {
  composeDecorators,
  createEditorStateWithText,
} from "draft-js-plugins-editor";
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
import "draft-js-inline-toolbar-plugin/lib/plugin.css";
// import "./editorStyles.css";
import createImagePlugin from "draft-js-image-plugin";
import createFocusPlugin from "draft-js-focus-plugin";
import createResizeablePlugin from "draft-js-resizeable-plugin";
import createBlockDndPlugin from "draft-js-drag-n-drop-plugin";
import createInlineStyleButton from "draft-js-buttons/lib/utils/createInlineStyleButton";

import {
  handleFormChange,
  fetchHomeDetails,
  fetchPathOfCurrentImage,
} from "../../../../store";
import { connect } from "react-redux";
import editorStyles from "../editorStyles.css";
import { stateToHTML } from "draft-js-export-html";
import createToolbarLinkPlugin from "draft-js-toolbar-link-plugin";

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
  ],
});

const { InlineToolbar } = inlineToolbarPlugin;

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
  teacherActionDesc,
  lessonId,
  addedProcessLength,
}) => {
  let blocksFromHTML = convertFromHTML(teacherActionDesc);
  let content = ContentState.createFromBlockArray(
    blocksFromHTML.contentBlocks,
    blocksFromHTML.entityMap
  );
  const [editorState, setEditorState] = useState(
    EditorState.createWithContent(content)
  );

  useEffect(() => {
    let blocksFromHTML = convertFromHTML(teacherActionDesc);
    let content = ContentState.createFromBlockArray(
      blocksFromHTML.contentBlocks,
      blocksFromHTML.entityMap
    );
    setEditorState(EditorState.createWithContent(content));
  }, [addedProcessLength, lessonId]);

  const editor = useRef();

  const [deleteIndex, setDeleteIndex] = useState();
  const deleteRef = useRef();
  const onChange = (editorState) => {
    setEditorState(editorState);

    let htmlText = stateToHTML(
      editorState.getCurrentContent(),
      editorState.getCurrentInlineStyle()
    );

    handleFormChange("teacherActionDesc", htmlText);
  };

  const focus = () => {
    editor.current.focus();
  };

  return (
    <div>
      <p className="method-editor-label">Գործողության նկարագիր</p>

      <div className="method-editor" onClick={focus}>
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
          // placeholder="Այստեղ շարադրեք տեքստը"
        />
        <InlineToolbar>
          {(externalProps) => (
            <div>
              <BoldButton {...externalProps} />
              <ItalicButton {...externalProps} />
              <UnderlineButton {...externalProps} />
              <UnorderedListButton {...externalProps} />
              <OrderedListButton {...externalProps} />
              <SubButton {...externalProps} />
              <SupButton {...externalProps} />
              <HeadlineOneButton {...externalProps} />

              <LinkButton {...externalProps} />
            </div>
          )}
        </InlineToolbar>
      </div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    teacherActionDesc: state.formReducer.teacherActionDesc ?? "<p></p>",
    lessonId: state.formReducer.id,
    addedProcessLength: state.lessonProcessReducer.addedLessonProcessCount,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleFormChange: (key, value) => dispatch(handleFormChange(key, value)),
    fetchHomeDetails: () => dispatch(fetchHomeDetails()),
    fetchPathOfCurrentImage: (file) => dispatch(fetchPathOfCurrentImage(file)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TeacherEditorComponent);
