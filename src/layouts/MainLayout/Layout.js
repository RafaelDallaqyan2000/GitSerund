import React from "react";
import LeftSideBar from "../components/SideBars/LeftSideBar/LeftSideBar";
import "./Layout.css";
import RightSideBar from "../components/SideBars/RightSideBar/RightSideBar";


export const Layout = ({children}) => {
    return (
        <div>
            <>
                <LeftSideBar/>
                <RightSideBar/>
            </>
            <div className="layout">
                {children}
            </div>
        </div>
    );
};

export default Layout;
