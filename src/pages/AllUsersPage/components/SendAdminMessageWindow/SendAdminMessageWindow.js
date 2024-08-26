import "./SendAdminMessageWindow.css";
import Button from "../../../../components/Button/Button";
import React, { useEffect, useState } from "react";
import store, { handleFormChange } from "../../../../store";
import { postAdminNotification } from "../../../../store/adminPage/actions/postAdminNotification";
import { changeAdminPageProperty } from "../../../../store/adminPage/actions";
import { useTranslation } from "react-i18next";

export function SendAdminMessageWindow({
  setOpenMessageWindow,
  openMessageWindow,
  checkedUsers,
  setShowPopUpMessage,
  callbackFunction,
}) {
  const [message, setMessage] = useState("");
  const [link, setLink] = useState("");
  const { t } = useTranslation();

  const checkedDisableBtn = link && message && checkedUsers.length;

  const handleClickCancelBtn = () => {
    setOpenMessageWindow(false);
    store.dispatch(changeAdminPageProperty("checkedUsers", []));
  };

  const callbackInSetAdminNotification = (e) => {
    setMessage("");
    setLink("");
    return callbackFunction(e);
  };

  const handleClickSuccessBtn = () => {
    if (checkedUsers.length > 0 && message && link) {
      store.dispatch(
        postAdminNotification(
          checkedUsers,
          message,
          link,
          callbackInSetAdminNotification
        )
      );
    }
  };

  if (!openMessageWindow) {
    return null;
  }

  return (
    <>
      <div className="send-admin-message-container">
        <div className="input-message">
          <img
            width={25}
            style={{ marginRight: 9 }}
            src={
              require("../../../../img/allUsersPageImages/message-text.svg")
                .default
            }
          />
          <input
            type="text"
            placeholder={t("Write a message here")}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            maxLength={150}
          />
        </div>
        <div className="input-user-name">
          <img
            src={
              require("../../../../img/allUsersPageImages/link-2.svg").default
            }
          />
          <input
            type="text"
            placeholder={t("Paste the link")}
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
        </div>
        <div className="buttons-on-send-admin-message">
          <span onClick={handleClickCancelBtn}>{t("Cancel")}</span>
          <Button
            disabled={!checkedDisableBtn}
            className={
              !checkedDisableBtn
                ? "disable-button-on-message-window-admin-page"
                : "button-on-message-window-admin-page"
            }
            title={t("Confirm")}
            onClick={handleClickSuccessBtn}
          />
        </div>
      </div>
    </>
  );
}
