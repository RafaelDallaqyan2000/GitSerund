import "./headerAndLogo.css";
import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { LanguagePopUp } from "../../layouts/components/SideBars/RightSideBar/Logout/components/LanguagePopUp";
import { useDispatch, useSelector } from "react-redux";
import { handleFormChange } from "../../store";

function HeaderAndLogo() {
  const { t } = useTranslation();
  const location = useLocation();

  const openLanguagePopUp = useSelector(
    (state) => state.formReducer.openLanguagePopUp
  );
  const dispatch = useDispatch();

  const handleClickEarthIcon = () => {
    dispatch(handleFormChange("openLanguagePopUp", !!!openLanguagePopUp));
  };
  return (
    <div className="container">
      <div className="header-mobile">
        <img
          src={require("../../img/stemgen-mobile.svg").default}
          alt="stemgen-image"
        />
      </div>
      <header className="login_header">
        <div className="header_inner">
          <NavLink
            className={(isActive) =>
              `nav_link ${
                isActive.isActive ||
                location.key === "default" ||
                location.pathname === "/home"
                  ? "is-active"
                  : ""
              }`
            }
            to="/login"
          >
            {t("Sign in")}
          </NavLink>
          <NavLink
            className={(isActive) =>
              `nav_link ${isActive.isActive && "is-active"}`
            }
            to="/register"
          >
            {t("Sign Up")}
          </NavLink>
          <div className="change-language-container">
            <div className="earth-icon" onClick={handleClickEarthIcon}>
              <img src={require("../../img/earth.svg").default} />
              {openLanguagePopUp ? <LanguagePopUp /> : null}
            </div>
          </div>
        </div>
      </header>
      <div className="photo">
        {/* <img className="photo-campus"  src={campus} alt="logo"/> */}
        {/* <Img   src={campus} webp  sizes={[400,800]} className="photo-campus" /> */}

        <div className="photo-campus"></div>
      </div>
      <div className="photo_items">
        <img
          style={{ marginBottom: -40, width: "8vw", height: "8vw" }}
          src={require("../../img/Logo_spitak_v2.png").default}
          alt="logo"
        />
        {/* <img src={require("../../img/logoName.svg").default} /> */}
        <span className="logo-name">{t("STEMGeneration")}</span>
      </div>
    </div>
  );
}

export default HeaderAndLogo;
