import "./FooterDiv.css";
import React from "react";
import { useTranslation } from "react-i18next";

export function FooterSidebar() {
  const { t } = useTranslation();
  return (
    <div className="container_footerDiv">
      <div className="leftContainerChild_footerDiv">
        <img
          src={require("../../../../../img/flagUSA.svg").default}
          alt="flag_USA"
        />
        <p>{t("Funded by")}</p>
      </div>
      <div className="rightContainerChild_footerDiv">
        <img
          src={require("../../../../../img/AUA_short1.svg").default}
          alt="AUA"
        />
        <p>{t("Implemented by")}</p>
      </div>
    </div>
  );
}
