import ReactDom from "react-dom";
import React from "react";
import "./Alert.css";

export function Alert({
    openConfirm,
    onCloseConfirm,
    children,
    backBackground = {},
    confirmContainerClass,
    popUpContainerStyles
}) {

    if (!openConfirm) {
        return null;
    }

    return ReactDom.createPortal(
        <>
            <div
                onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    onCloseConfirm(false)
                }}
                style={{background: backBackground}}
                className={`background_back`}
            />
            <div
                style={popUpContainerStyles}
                className={ confirmContainerClass || "alert_styles" }
            >
                { children }
            </div>
        </>,
        document.getElementById("portal")
    )
}
