import { Modal } from "../../../../../components/Modal/Modal";
import React, { useEffect } from "react";
import "./ImagesModalNum.css";
import { useTranslation } from "react-i18next";

export function ImagesModalNum({
  setImgModalId,
  imgModalId,
  actionId,
  onClose,
  actionImagesPaths,
}) {
  
  const { t } = useTranslation();

  useEffect(() => {
    window.addEventListener("click", onClose);
    return () => {
      window.removeEventListener("click", onClose);
    };
  }, []);

  const toggleModal = (e) => {
    e.stopPropagation();
    if (imgModalId !== actionId) {
      setImgModalId(actionId);
    } else {
      setImgModalId(null);
    }
  };
  return (
    <div
      style={{ position: "relative", display: "inline-block" }}
      key={imgModalId}
    >
      <div className="imagesInContainer" key={imgModalId} onClick={toggleModal}>
        <img
          src={require("../../../../../img/gallery.svg").default}
          alt="gallery.svg"
        />
        <span className="imagesLength">
          {actionImagesPaths.length} {t(" image")}
        </span>
      </div>
      {imgModalId === actionId ? (
        <Modal
          actionImagesPaths={actionImagesPaths}
          setImgModalId={setImgModalId}
        />
      ) : null}
    </div>
  );
}
