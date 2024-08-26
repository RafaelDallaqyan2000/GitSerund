import "./LeftSideBar.css";
import React from "react";
import "../../../../components/Loading/loading.css";
import { Link, useParams, useNavigate, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import logo from "../../../../img/GItserund_web_logo_v1 1.svg";
import logoWithoutName from "../../../../img/GItserund_web_logo_without_name.svg";
import plusIcon from "../../../../img/plus.svg";
import { MethodsIcon, CreateMethodIcon } from "./icons";
import { FooterSidebar } from "./FooterSidebar";
import { HomeIcon, MyPageIcon, UsersIcon } from "../../../../img/Components";
import { LeftSidebarSubjects } from "../../../../components/LeftSidebarSubjects";
import { useTranslation } from "react-i18next";

const LeftSideBar = ({ userTypeId }) => {
  const navigate = useNavigate();
  const { details } = useParams();
  const { t, i18n } = useTranslation();

  const openLayoutForNewLessPlan = () => {
    navigate("/create/NewLessonPlan");
  };

  return (
    <div className="left_sidebar">
      <div style={{ position: "relative" }}>
        <Link to="/home">
          <img
            className="sidebar_logo sidebar_logo_home"
            src={i18n.language === "am" ? logo : logoWithoutName}
            alt="GitSerund logo"
          />{" "}
        </Link>
        <div className="pages">
          <NavLink
            className={(isActive) =>
              "sidebar-item" + (isActive.isActive ? " activeclass" : "")
            }
            to="/home"
          >
            <div className="sidebar-item-title-container">
              <HomeIcon className="sidebar-item-icon" />
              <p className="sidebar-item-title">{t("Main")}</p>
            </div>
          </NavLink>

          <NavLink
            className={(isActive) =>
              "sidebar-item" + (isActive.isActive ? " activeclass" : "")
            }
            to={`/Profile/${details ?? ""}`}
          >
            <div className="sidebar-item-title-container">
              <MyPageIcon className="sidebar-item-icon" />
              <p className="sidebar-item-title">{t("My Account")}</p>
            </div>
          </NavLink>

          {userTypeId > 2 && userTypeId !== 5 && (
            <>
              {userTypeId === 6 && (
                <NavLink
                  className={(isActive) =>
                    "sidebar-item" + (isActive.isActive ? " activeclass" : "")
                  }
                  to={`/lesson-process/create-new-lesson-process`}
                >
                  <div className="sidebar-item-title-container">
                    <CreateMethodIcon className="sidebar-item-icon" />

                    <p className="sidebar-item-title">
                      {t("Create a method/technique")}
                    </p>
                  </div>
                </NavLink>
              )}
              <NavLink
                className={(isActive) =>
                  "sidebar-item" + (isActive.isActive ? " activeclass" : "")
                }
                to={`/methods`}
              >
                <div className="sidebar-item-title-container">
                  <MethodsIcon className="sidebar-item-icon change-fill" />

                  <p className="sidebar-item-title">
                    {t("Methods/Techniques")}
                  </p>
                </div>
              </NavLink>
              {userTypeId === 6 && (
                <NavLink
                  className={(isActive) =>
                    "sidebar-item" + (isActive.isActive ? " activeclass" : "")
                  }
                  to={`/teacher-helpers`}
                >
                  <div className="sidebar-item-title-container">
                    <UsersIcon className="sidebar-item-icon change-fill" />
                    <p className="sidebar-item-title">{t("Users")}</p>
                  </div>
                </NavLink>
              )}
            </>
          )}
        </div>

        {userTypeId >= 1 && userTypeId !== 5 ? (
          <div
            className="create_new_lsn_pln"
            onClick={openLayoutForNewLessPlan}
          >
            <figure className="create_new_lsn_pln_figure">
              <img
                src={plusIcon}
                alt="plus"
                className="create_new_lsn_pln_icon"
              />
            </figure>
            <p className="create_new_lsn_pln_text">
              {t("Create new lesson plan")}
            </p>
          </div>
        ) : null}
      </div>

      <LeftSidebarSubjects />

      <FooterSidebar />
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    userTypeId: state.authReducer.typeId,
  };
};
export default connect(mapStateToProps)(LeftSideBar);
