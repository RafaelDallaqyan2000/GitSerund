import { useTranslation } from "react-i18next";
import "./mailCheck.css";
import React from "react";

function MailCheck() {
  const { t } = useTranslation();
  return (
    <div className="email_check">
      <p className="email_check_text">
        {t("For email confirmation please follow the link sent to your email.")}
      </p>
    </div>
  );
}

export default MailCheck;
