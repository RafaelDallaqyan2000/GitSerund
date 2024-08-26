import React from "react";
import { useTranslation } from "react-i18next";

export function Header() {
  const { t } = useTranslation();
  return (
    <thead align="left">
      <tr>
        <th className="addition-table-title">№</th>
        <th className="addition-table-title">{t("Title")}</th>
        <th className="addition-table-title">{t("Creator")}</th>
        <th className="addition-table-title">{t("Date")}</th>
        <th className="addition-table-title"></th>
      </tr>
    </thead>
  );
}
