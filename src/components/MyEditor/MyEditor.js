import "./MyEditor.css";
import React, { useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import ApiFiles from "../../Api/ApiFiles";
import { MessagePopUp } from "../MessagePopUp/MessagePopUp";
import { useTranslation } from "react-i18next";

const fileInfo = {};

export function MyEditor({
  onChange = () => {},
  onFocus = () => {},
  onBlur = () => {},
  editorState,
  imageUploadParams,
  disabled,
  placeholder,
  showPlaceholder,
  onPlaceholderClick,
}) {
  const { order = 0, lessonPlanId, subFolder } = imageUploadParams;
  const editorRef = useRef(null);
  const { t, i18n } = useTranslation();

  const plugins = [
    "autoresize",
    "fullscreen",
    "advlist",
    "autolink",
    "lists",
    "link",
    "image",
    "charmap",
    "preview",
    "anchor",
    "searchreplace",
    "visualblocks",
    "code",
    "fullscreen",
    "insertdatetime",
    "media",
    "table",
    "code",
    "help",
    "wordcount",
  ];

  const toolbar = `undo redo  | link image bold | bullist numlist`;
  const [editorMessage, setEditorMessage] = useState({});

  const filePickerCallback = (cb, value, meta) => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "․jpg, .png, .jfif");

    input.onchange = function () {
      let file = input.files[0];
      let reader = new FileReader();

      if (file.size > 5e6) {
        return setEditorMessage({
          title: t("Error"),
          text: t("File size must not exceed 5mb"),
        });
      }

      fileInfo.file = file;
      reader.onload = function (e) {
        const footerOfImgPopUp = document.querySelectorAll(
          '[class="tox-dialog__footer"]'
        );
        const button = footerOfImgPopUp[0]?.children[1]?.children[1];

        button.removeAttribute("disabled");

        cb(e.target.result);
      };
      reader.readAsDataURL(file);
    };
    input.click();
  };

  const imageUploadHandler = async (blobInfo, progressfn) => {
    const formData = new FormData();

    formData.append("file", fileInfo.file ?? "");
    formData.append("subfolder", subFolder ?? null);
    formData.append("lessonPlanId", +lessonPlanId || null);
    formData.append("order", order ? order : null);
    progressfn(0);
    const path = await ApiFiles.insertImage(formData)
      .then((res) => res.data.path)
      .catch((err) => {
        console.log(err, "error");
        throw err;
      });
    progressfn(100);
    return path;
  };

  function onTinyMCELoaded() {
    const headerOfEditor = document.querySelectorAll(
      '[class="tox-toolbar-overlord"]'
    );

    headerOfEditor?.forEach((e) => {
      const imageButtonsInPage = e.children[0]?.children[1]?.children[1];

      if (imageButtonsInPage) {
        imageButtonsInPage.addEventListener("click", () => {
          setTimeout(() => {
            const saveButton = document.querySelector(
              '[class="tox-dialog__footer-end"]'
            )?.children[1];
            const inputFilled = document.querySelector(
              '[class="tox-textfield"]'
            );

            saveButton.setAttribute("disabled", true);

            inputFilled.addEventListener("input", (e) => {
              if (e.target.value) {
                saveButton.removeAttribute("disabled");
              } else {
                saveButton.setAttribute("disabled", true);
              }
            });
          }, 0);
        });
      }
    });
  }

  const handleFocus = (e) => {
    onPlaceholderClick(false);
    return onFocus(e);
  };

  const handleBlur = () => {
    if (!editorState) {
      onPlaceholderClick(true);
    }
    return onBlur();
  };

  const handleClosePopup = () => {
    setEditorMessage({});
  };

  return (
    <div className="myEditor">
      <MessagePopUp
        onClosePopup={handleClosePopup}
        open={!!editorMessage?.text}
        title={editorMessage?.title}
        text={editorMessage?.text}
        closeBtnTitle={t("Close")}
        onAlertCancelClick={handleClosePopup}
        styleText={{ textAlign: "center" }}
        popUpContainerStyles={{ top: "50%" }}
        styleTitle={{
          color: editorMessage?.type === "success" ? "#1C1C1C" : "#EA6670",
        }}
        styleCancelBtn={{
          background:
            editorMessage?.type === "success"
              ? "linear-gradient(83.13deg, #6FD89C 0%, #46B776 100%)"
              : "#EA6670",
          color: "#FFF",
        }}
      />

      <Editor
        tinymceScriptSrc={process.env.PUBLIC_URL + "/tinymce/tinymce.min.js"}
        disabled={disabled}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onEditorChange={onChange}
        value={
          !editorState
            ? editorState
            : editorState.replace("../../files/", "/files/")
        }
        onInit={(evt, editor) => (editorRef.current = editor)}
        init={{
          selector: "textarea",
          language: i18n.language === "am" ? "hy" : "en",
          language_url: process.env.PUBLIC_URL + "/languages/hy.js",
          height: 200,
          plugins,
          toolbar,
          menubar: false,
          link_title: false,
          link_current_window: false,
          link_default_target: "_blank",
          images_upload_credentials: false,
          image_title: false,
          automatic_uploads: true,
          file_picker_types: "image",
          content_style: "body { font-family: sans-serif; font-size:16px }",
          images_upload_base_path: `/api/imageUpload`,
          images_upload_handler: imageUploadHandler,
          file_picker_callback: filePickerCallback,
          init_instance_callback: onTinyMCELoaded,
          images_dataimg_filter: function (img) {
            return !img.hasAttribute("internal-blob"); // blocks the upload of <img> elements with the attribute "internal-blob".
          },
        }}
      />

      {placeholder && !editorState && showPlaceholder ? (
        <p
          className="placeholderTinymce"
          dangerouslySetInnerHTML={{ __html: placeholder }}
          onClick={() => {
            editorRef.current.focus();
            onPlaceholderClick(false);
          }}
          style={{
            height:
              editorRef.current?.contentDocument?.children[0]?.clientHeight -
              20,
            width:
              editorRef.current?.contentDocument?.children[0].clientWidth -
                40 ?? 80,
          }}
        />
      ) : null}
    </div>
  );
}
