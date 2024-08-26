import "./PrintFileItem.css";
import React from "react";
import print from '../../../../../../img/showLsnPlanAndLsnProcess/Group 959.svg';

export function PrintFileItem({
    title = "Title",
    fileType = "Type",
    onPrintClick,
}) {
    return (
        <div className="print-files-item-container" >
            <div className="print-files-item-container-text">
                <span>{ title }</span>
                <span>{ fileType }</span>
            </div>
            <div
                className="print-files-item-container-icon"
                onClick={onPrintClick}
            >
                <img src={print} alt="Print" />
            </div>
        </div>
    )
}
