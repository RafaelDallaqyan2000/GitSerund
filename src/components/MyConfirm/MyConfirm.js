import Button from "../Button/Button";
import ReactDom from "react-dom";
import React from "react";
import "./MyConfirm.css"

export function MyConfirm({
  openConfirm,
  setOpenConfirm,
  children,
  submitBtnTitle,
  submitBtnClick,
  submitBtnDisabled,
  cancelBtnTitle,
  cancelBtnClick,
  cancelBtnDisabled,
}) {
    if (!openConfirm) {
        return null;
    }
    return ReactDom.createPortal(
        <>
            <div onClick={() => setOpenConfirm(false)} className="backgroundBack"/>
            <div className="confirm_styles">
                <div className="closeConfirm" >
                    <img
                        width={20}
                        height={20}
                        src={require("../../img/delete-stop-svgrepo-com.svg").default}
                        style={{cursor:"pointer"}}
                        onClick={() => setOpenConfirm(false)}
                    />
                </div>
                <div className="children_div_confirm">
                    {children}
                </div>
                <div className="container_btn_confirm">
                    <Button
                        disabled={submitBtnDisabled}
                        className="btn_confirm submitBtnTitle"
                        title={submitBtnTitle}
                        onClick={submitBtnClick}
                    />
                    {
                        cancelBtnClick && cancelBtnTitle &&
                        <Button
                            disabled={cancelBtnDisabled}
                            className="btn_confirm cancelBtnTitle"
                            title={cancelBtnTitle}
                            onClick={cancelBtnClick}
                        />
                    }
                </div>
            </div>
        </>,
        document.getElementById("portal")
    )
}