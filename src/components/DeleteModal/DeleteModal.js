import React from "react";
import PopupPassword from "../../pages/ChangePage/Data/PopupPassword";

export function DeleteModal({
  deleteModal,
  onAccept,
  onCancel,
  onDeleteModalClose,
  btnSuccessText = "Այո",
  btnCancelText = "Ոչ",
  text,
  title = "Ջնջել Բաժինը",
  styleText,
}) {
  return (
    deleteModal && (
      <PopupPassword
        func={() => onDeleteModalClose(false)}
        handleClose={() => onDeleteModalClose(false)}
        deleteIcon={true}
        content={
          <div>
            <h3 className="modal_title">{title}</h3>
            {text ? (
              <p className="mt-20 f-mardoto-16" style={styleText}>
                {text}
              </p>
            ) : null}
            <div className="mt-20 d-flex justify-content-end">
              <button onClick={onCancel} className="btn btn-light ">
                {btnCancelText}
              </button>
              <button onClick={onAccept} className="btn btn-danger ml-1">
                {btnSuccessText}
              </button>
            </div>
          </div>
        }
      />
    )
  );
}
