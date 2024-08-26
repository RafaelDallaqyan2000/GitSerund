import React, { useState } from "react";
import img from "../../../img/chat.svg";
import plusIcon from "../../../img/plusik.svg";
import imageIcon from "../../../img/downloadImg.svg";
import fileIcon from "../../../img/downloadFile.svg";
import { Loading } from "../../../img/Loading/Loading";
import "./FileInputs.css";

const wordDocumentType =
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
const pdfFileType = "application/pdf";
const imageFileType = "image/png, image/jpeg, image/jpg";

function FileInputs(props) {
  const { onInsertImage, onFileChange, loading } = props;

  const [openOptions, setOpenOptions] = useState(false);

  return (
    <div className="attach-files">
      {loading ? <Loading style={{ top: "23px", left: "12px" }} /> : null}

      <button
        className="attach-files-btn"
        onClick={() => setOpenOptions(!openOptions)}
      >
        <img src={plusIcon} />
      </button>
      {openOptions ? (
        <div className="attach-files-options">
            {/*Todo: custom image uploader
              <div>
                <input
                  type="file"
                  size={5242880} // 5mb
                  className="attach-files-input"
                  onChange={onInsertImage}
                  accept={imageFileType}
                  onClick={(e) => {
                      e.target.value = ''
                  }}
                />
                <img className="attach-files-icon" src={imageIcon} />
              </div>
             */}
          <div>
            <input
              type="file"
              size={5242880} // 5mb
              className="attach-files-input"
              onChange={onFileChange}
              accept={`${pdfFileType}, ${wordDocumentType}`}
              onClick={(e) => {
                  e.target.value = ''
              }}
            />
            <img className="attach-files-icon" src={fileIcon} />
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default FileInputs;
