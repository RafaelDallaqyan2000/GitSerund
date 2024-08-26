import React, { useCallback, useState } from "react";
import OpenLayout from "../Home/OpenLayout/OpenLayout";
import { AllNotifications } from "./AllNotifications/AllNotifications";
import { NavbarNotification } from "./NavbarNotification/NavbarNotification";
import Pagination from "../../components/Pagination";
import { useSelector } from "react-redux";

function Notifications() {
    const [ open, setOpen ] = useState(false);
    let pageCount = useSelector(state => state.notificationReducer.pageCount);
    let allNotifications = useSelector(state => state.notificationReducer.allNotifications);

    const onClose = useCallback(() => {
        setOpen(false);
    }, []);

    return (
        <div className="notification_page_container">
            <NavbarNotification />
            { open &&  <OpenLayout onClose={onClose} /> }
            <AllNotifications />
            {
                allNotifications.length !== 0 && <Pagination pageCount={pageCount}/>
            }
        </div>
    );
}

export default Notifications;
