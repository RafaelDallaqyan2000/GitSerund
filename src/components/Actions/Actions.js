import React, {useCallback, useRef, useState} from "react";
import {useOutsideClick} from "../../hooks/useOutsideClick";

export function Actions({
    children,
    canDelete,
    imageSrc,
}) {

    const [open, setOpen] = useState(false);
    const dropdownRef = useRef();

    useOutsideClick(dropdownRef, () => {
        setOpen(false);
    });

    const toggleDropdown = useCallback(() => {
        canDelete ? setOpen((prev) => !prev) : setOpen(false);
    }, []);

    return (
        <div
            onClick={toggleDropdown}
            className="table_toggle"
            ref={dropdownRef}
        >
            <img
                name="dropdown"
                alt="delete"
                className="right-sidebar-ellipsis"
                src={imageSrc}
            />
            {open ? <div className="logout-layout">{children}</div> : null}
        </div>
    );
}
