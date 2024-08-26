import "./SearchInput.css";
import {useState} from "react";

export function SearchInput ({
    id,
    label,
    placeholder,
    labelStyle,
    onfocus,
    onChange,
    onScroll,
    onClick,
    onSubmit,
    inputValue,
    children,
    inputClass,
    inputStyle,
    inputContainerStyle,
}) {
    return (
        <div className="searchInputContainer">
            {
                label &&
                <label htmlFor={ id }
                       className="searchLabel"
                       style={ labelStyle }
                >
                    { label }
                </label>
            }
            <form onSubmit={onSubmit} style={inputContainerStyle} className="searchInputDiv">
                <input
                    id={ id }
                    className={`${inputClass} searchInput`}
                    type="text"
                    style={inputStyle}
                    placeholder={ placeholder }
                    onFocus={onfocus}
                    onChange={onChange}
                    onScroll={onScroll}
                    onClick={onClick}
                    value={inputValue}
                />
                <label
                    className="searchInputIcon"
                    htmlFor={ id }
                    onClick={onSubmit}
                >
                    <img src={require("../../img/search.svg").default}/>
                </label>
            </form>
            {children}
        </div>
    )
}
