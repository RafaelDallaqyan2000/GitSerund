import "./ResponsivePdfLsnProcessCommentAndTime.css";
import { ButtonComment } from "../../ButtonComment";
import { useTranslation } from "react-i18next";

export function ResponsivePdfLsnProcessCommentAndTime({
  action,
  preview,
  step = 1,
  minute = 0,
}) {
  const { t } = useTranslation();

  return (
    <div className="lsn-proc-comment-and-time-container">
      <span>
        {t("Step")} {step} | {minute ?? 0} {t("minute")}
      </span>
      {preview !== "preview" && (
        <ButtonComment
          isGrayIcon={true}
          totalCommentCount={action?.methodComCount}
          umID={action?.umId}
        />
      )}
    </div>
  );
}
