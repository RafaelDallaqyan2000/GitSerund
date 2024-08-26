import React, { Component } from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
import './EditorContainer.css';
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from 'react-draft-wysiwyg';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

class EditorContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      editorState: null,
    };
  }

  onEditorStateChange: Function = (editorState) => {
    this.setState({
      editorState,
    });
  };
  render() {
    const { editorState } = this.state;
    return (
    <div className="editor" >
      <Editor
       toolbarClassName="toolbarClassName"
       wrapperClassName="wrapperClassName"
       editorClassName="editorClassName"
        editorState={editorState}
        onEditorStateChange={this.onEditorStateChange}
        toolbar={{
          options: ['inline',  'fontSize', 'fontFamily','list', 'link', ],
        }

        }

      />
    </div>

    )
  }
}

export default EditorContainer

