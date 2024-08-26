import {Alert} from "../Alert/Alert";
import React from "react";
import "./MessagePopUp.css";

export function MessagePopUp({
    onAlertCancelClick,
    onAlertSubmitClick,
    classNameCancelBtn = "alertCancelBtn",
    closeBtnTitle,
    styleCancelBtn,
    classNameSubmitBtn = "submit_delete_confirm",
    submitBtnTitle,
    styleSubmitBtn,
    title,
    text,
    onClosePopup,
    open,
    styleTitle,
    styleText,
    popUpContainerStyles
}) {
    return (
        <Alert
            onCloseConfirm={onClosePopup}
            openConfirm={open}
            confirmContainerClass="adminPageAlert"
            popUpContainerStyles={popUpContainerStyles}
        >
            <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start"
            }}
                 onClick={e => {
                     e.stopPropagation();
                     e.preventDefault();
                 }}
            >
                <h1 style={styleTitle} className="alertTitle">{title}</h1>
                <img
                    onClick={() => onClosePopup(false)}
                    src={require("../../img/delete.svg").default}
                    style={{cursor: "pointer"}}
                />
            </div>
            <div className="alertBody" style={styleText}>
                <p className="alertText">
                    {text}
                </p>
                <div className="alertButtons">
                    {
                        closeBtnTitle &&
                            <button
                                className={classNameCancelBtn}
                                style={styleCancelBtn}
                                onClick={onAlertCancelClick}
                            >
                                {closeBtnTitle}
                            </button>
                    }
                    {
                        submitBtnTitle &&
                            <button
                                className={classNameSubmitBtn}
                                style={styleSubmitBtn}
                                onClick={onAlertSubmitClick}
                            >
                                {submitBtnTitle}
                            </button>
                    }
                </div>
            </div>
        </Alert>
    )
}
