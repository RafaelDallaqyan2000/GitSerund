import React from "react";
import LeftSideBar from "../components/SideBars/LeftSideBar/LeftSideBar";
import RightSidebar from "../../pages/Profile/components/RightSidebar/RightSidebar";

export const ProfileLayout = ({children}) => {
    return (
        <div>
            <LeftSideBar/>
            <RightSidebar/>
            <div className="layout">
                {children}
            </div>
        </div>
    );
};

export default ProfileLayout;
