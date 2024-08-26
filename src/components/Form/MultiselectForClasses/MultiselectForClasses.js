import React, {useRef, useState} from "react";
import "./multiselectForClasses.css";
import "../MultiselectWithCheck/multiselectWithCheck.css"
import {useOutsideClick} from "../../../hooks/useOutsideClick";
import multiselectCross from "../../../img/multiselectCross.svg";

const MultiselectForClasses = (props) => {
    const {
        label = "",
        className = "",
        placeholder = '',
        labelClassName = "",
        items = [],
        selectedItems = [],
        onClickItem = () => {},
        subjectId,
    } = props;

    const ref = useRef();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    useOutsideClick(ref, handleClose);

    return (
        <div ref={ref} className="select_container">
            <label className={`select-label ${labelClassName}`}>{label}</label>
            <div style={{position: "relative"}}>
                <div
                    className="multiselect-with-check-input multiselect-with-check-input-mobile"
                    onClick={() => {
                        setShow(true);
                    }}
                >
                    {!selectedItems || !selectedItems.length ? (
                        <p className={`select-placeholder ${className}`}>{placeholder}</p>
                    ) : (
                        <div className={'selected-item-wrapper'} >
                            {selectedItems.map((item) => {
                                return (
                                    <div key={item} className="selected-item-container">
                                        <p className={`selected-item-title ${className}`}>
                                            {item}&nbsp;&nbsp;
                                        </p>
                                        <div>
                                            <img
                                                src={multiselectCross}
                                                className="multiselect-item-cross"
                                                onClick={() => onClickItem(subjectId, item)}
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
                <div
                    className="multiselect-with-check-arrow"
                    onClick={() => setShow(!show)}
                >
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            opacity="0.6"
                            d="M8.41421 9C7.52331 9 7.07714 10.0771 7.70711 10.7071L11.2929 14.2929C11.6834 14.6834 12.3166 14.6834 12.7071 14.2929L16.2929 10.7071C16.9229 10.0771 16.4767 9 15.5858 9L8.41421 9Z"
                            fill="#6C6C6C"
                        />
                    </svg>
                </div>
            </div>

            {show && (
                <ul className={`ul multiselect-with-multiselect multiselect-with-multiselect-desktop`}>
                    {items.map((item) => (
                        <li key={item}>
                            <div
                                onClick={() => onClickItem(subjectId, item)}
                                className="select-item-container"
                            >
                                <input
                                    type="checkbox"
                                    onChange={() => {
                                    }}
                                    className="multiselect-checkbox-input"
                                    checked={selectedItems.includes(item)}
                                />
                                <span className="multiselect-checkbox-label"></span>
                                <label className={`select-item-title ${className}`}>
                                    {item}
                                </label>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default MultiselectForClasses;
