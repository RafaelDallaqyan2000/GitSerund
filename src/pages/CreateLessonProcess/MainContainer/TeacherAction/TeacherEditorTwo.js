import React, { Component, useRef, useState, useEffect } from "react";
import {
  EditorState,
  ContentState,
  convertFromHTML,
  convertToRaw,
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
import { stateToHTML } from "draft-js-export-html";
import createToolbarLinkPlugin from "draft-js-toolbar-link-plugin";
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

const TeacherEditorTwo = ({
  id,
  handleFormChange,
  guide,
  lessonId,
  addedProcessLength,
}) => {
  let blocksFromHTML = convertFromHTML(guide);
  let content = ContentState.createFromBlockArray(
    blocksFromHTML.contentBlocks,
    blocksFromHTML.entityMap
  );
  const [editorState, setEditorState] = useState(
    EditorState.createWithContent(content)
  );

  useEffect(() => {
    let blocksFromHTML = convertFromHTML(guide);
    let content = ContentState.createFromBlockArray(
      blocksFromHTML.contentBlocks,
      blocksFromHTML.entityMap
    );
    setEditorState(EditorState.createWithContent(content));
  }, [addedProcessLength, lessonId]);

  const editor = useRef();
  const { t } = useTranslation();

  const focus = () => {
    editor.current.focus();
  };

  return (
    <div className="method-editor-large-container">
      <p className="method-editor-label">{t("Clarifications, guidelines")}</p>

      <div className="method-editor-large" onClick={focus}>
        <Editor
          editorState={editorState}
          onChange={(editorState) => {
            setEditorState(editorState);

            let htmlText = stateToHTML(editorState.getCurrentContent());

            handleFormChange("guide", htmlText);
          }}
          plugins={plugins}
          ref={editor}
          customStyleMap={{
            SUBSCRIPT: { fontSize: "0.6em", verticalAlign: "sub" },
            SUPERSCRIPT: { fontSize: "0.6em", verticalAlign: "super" },
          }}
          key={id}
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
    guide: state.formReducer.guide ?? "<p></p>",
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

export default connect(mapStateToProps, mapDispatchToProps)(TeacherEditorTwo);
