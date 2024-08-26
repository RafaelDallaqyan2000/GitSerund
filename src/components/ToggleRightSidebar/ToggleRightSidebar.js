import React, {useState} from "react";
import {connect} from "react-redux";
import {handleFormChange} from "../../store";
import styles from "./ToggleRightSidebar.module.css";

function ToggleSidebar({children}) {

    const [openSidebar, setOpenSidebar] = useState(true);

    const toggleSidebar = () => {setOpenSidebar(!openSidebar)}

    return (
        <div
            className={`
                ${openSidebar ? styles.showSidebar : styles.hideSidebar} 
                ${styles.sidebarContainer}
        `}>
            <div className={styles.rightSidebar}>
                <div onClick={toggleSidebar} className={styles.toggleSidebar}>
                    <img
                        style={{
                            transform: openSidebar ? "none" : "rotate(180deg)",
                            padding: "7px",
                        }}
                        src={require("../../img/close.svg").default}
                    />
                </div>
                <div className={styles.children}>{children}</div>
            </div>
        </div>
    )
}


const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {
        handleFormChange: (key, value) => dispatch(handleFormChange(key, value)),
    };
};

export const ToggleRightSidebar = connect(mapStateToProps, mapDispatchToProps)(ToggleSidebar)
