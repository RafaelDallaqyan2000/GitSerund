import React, { useEffect, useState } from "react";
import "./RightSideBar.css";
import LessonPlans from "./LessonPlans/LessonPlans";
import { connect } from "react-redux";
import {
  fetchHomeDetails,
  setProfileDataForSidebar,
  handleFormChange,
  fetchProfileDetails,
  openRightSidebar,
} from "../../../../store";
import menu from "../../../../img/menu.svg";
import Logout from "./Logout/Logout";
import { useTranslation } from "react-i18next";

const RightSideBar = ({
  fullName,
  imageName,
  userId,
  handleFormChange,
  showProfileData,
  setProfileDataForSidebar,
  fetchProfileDetails,
  openRightSidebar,
  openOrCloseRightSidebar,
}) => {
  const [open, setOpen] = useState(false);
  const [names, setNames] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(openOrCloseRightSidebar);
  const { t } = useTranslation();

  useEffect(() => {
    fetchHomeDetails();
  }, []);

  useEffect(() => {
    if (fullName) {
      setNames(fullName.split(" "));
    }
    //
  }, [fullName]);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
    openRightSidebar(sidebarOpen);
  };

  return (
    <div
      className={`${sidebarOpen ? "" : "right-sidebar-closed"} right_sidebar`}
    >
      <div onClick={toggleSidebar} className="toggle-sidebar">
        <img
          style={{
            transform: sidebarOpen ? "none" : "rotate(180deg)",
            padding: "7px",
          }}
          src={require("../../../../img/close.svg").default}
        />
      </div>
      <div className="right-sidebar-container">
        {showProfileData ? (
          <>
            <div className="right-sidebar-title-container">
              <p className="my_profile">{t("My Profile")}</p>
              <div onClick={() => setOpen(!open)}>
                <img className="right-sidebar-ellipsis" src={menu} />
              </div>
            </div>
            {open ? <Logout setOpen={setOpen} /> : null}

            <div className="my_page">
              <div style={{ width: "28px" }}></div>
              <img
                className="picture"
                src={"/files/" + userId + "/" + imageName}
                onError={(e) => {
                  e.target.error = null;
                  e.target.src =
                    require("../../../../img/defaultProfile.png").default;
                }}
              />
              {/* <img src={notification} /> */}
            </div>
            <div className="name">
              <p>{fullName}</p>
            </div>
          </>
        ) : null}
        <LessonPlans />
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    fullName: state.formReducer.fullName,
    imageName: state.formReducer.imageName,
    userId: state.formReducer.userId,
    showProfileData: state.changePageReducer.showProfileData,
    openOrCloseRightSidebar: state.adminPageReducer.openOrCloseRightSidebar,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchHomeDetails: () => dispatch(fetchHomeDetails()),
    setProfileDataForSidebar: (showProfileData) =>
      dispatch(setProfileDataForSidebar(showProfileData)),
    handleFormChange: (key, value) => dispatch(handleFormChange(key, value)),
    fetchProfileDetails: (language) => dispatch(fetchProfileDetails(language)),
    openRightSidebar: (open) => dispatch(openRightSidebar(open)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RightSideBar);
