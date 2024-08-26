import React, { useEffect, useMemo, useRef } from "react";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import "./ErrorPopup.css";
import closeIcon from "../../img/close-black.svg";
import { createPortal } from "react-dom";
import { useTranslation } from "react-i18next";

const popupElement = document.querySelector("#portal");

export function ErrorPopup(props) {
  const { message, onClose, marker } = props;
  const popupRef = useRef(null);
  const { t } = useTranslation();

  const element = useMemo(() => {
    return document.createElement("div");
  }, []);

  useEffect(() => {
    popupElement.appendChild(element);

    return () => {
      popupElement.removeChild(element);
    };
  }, []);

  useOutsideClick(popupRef, onClose);

  return createPortal(
    <div className="popup__wrapper">
      <div className="popup" ref={popupRef}>
        <div className="popup__container">
          <p className="popup__title">{t("Error")}</p>
          <p className="popup__message">{message}</p>
          <button className="popup__close" onClick={onClose}>
            <img src={closeIcon} alt="Close" className="popup__close__icon" />
          </button>
        </div>
      </div>
    </div>,
    element
  );
}
