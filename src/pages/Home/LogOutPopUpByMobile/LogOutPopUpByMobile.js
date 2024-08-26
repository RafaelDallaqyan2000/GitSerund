import "./logOutPopUpStyle.css";
import { useRef, useState } from "react";
import { LanguagePopUp } from "../../../layouts/components/SideBars/RightSideBar/Logout/components/LanguagePopUp";
import { useTranslation } from "react-i18next";
import { useOutsideClick } from "../../../hooks/useOutsideClick";

export function LogOutPopUpByMobile({ handleLogout = () => {} }) {
  const { t } = useTranslation();
  const [openLnaguages, setOpenLanguages] = useState(false);
  const languageRef = useRef();
  const handleLanguageClick = () => setOpenLanguages((prev) => !prev);

  useOutsideClick(languageRef, () => {
    setOpenLanguages(false);
  });

  return (
    <div ref={languageRef} className="log-out-container-for-mobile">
      <div className="header-mobile-log-out" onClick={handleLanguageClick}>
        <img src={require("../../../img/earth.svg").default} />
        <span className="header-mobile-log-out-text">{t("Language")}</span>
      </div>
      <div className="header-mobile-log-out" onClick={handleLogout}>
        <img src={require("../../../img/close.svg").default} />
        <span className="header-mobile-log-out-text">{t("Log out")}</span>
      </div>
      {openLnaguages ? (
        <div className="log-out-container-for-mobile-languages">
          <LanguagePopUp />
        </div>
      ) : null}
    </div>
  );
}
