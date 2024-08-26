import { PopUp } from "../../layouts/components/PopUp";
import ReactDOM from "react-dom";
import "./zoomImagesPopUpStyles.css";
import Arrow from "../Pagination/components/Arrow";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

export function ShowImagesPopUp({ images, alt, open, onClose }) {
  const [imgIndex, setImgIndex] = useState(images.imageIndex ?? 0);
  const { t } = useTranslation();

  useEffect(() => {
    setImgIndex(images.imageIndex);
  }, [images.imageIndex]);

  const showPreviousImageClick = () => {
    if (imgIndex >= 1) {
      setImgIndex((prev) => prev - 1);
    }
  };
  const showNextImageClick = () => {
    if (imgIndex < images.files.length - 1) {
      setImgIndex((prev) => prev + 1);
    }
  };
  return open
    ? ReactDOM.createPortal(
        <>
          <div onClick={onClose} className="background-pop-up" />
          <div className="pop-up-container">
            <div className="pop-up-container-nav-bar">
              <div className="pop-up-container-img-count">
                <div className="pop-up-lsn-plan-number">
                  <span>{images.itemNumber}</span>
                </div>
                <div className="pop-up-contaier-title">
                  <span>{t("Whiteboard")}</span>
                  <span>
                    {+imgIndex + 1}/{images.files.length}
                  </span>
                </div>
                <div className="pop-up-arrows-container">
                  <Arrow
                    containerClassName={`arrow-container ${
                      imgIndex === 0 ? "cursor-initial" : ""
                    }`}
                    className={`arrow-left ${
                      imgIndex === 0 ? "cursor-initial" : ""
                    }`}
                    fill={imgIndex === 0 ? "#C4C4C4" : "#8C8E92"}
                    handleClick={showPreviousImageClick}
                  />
                  <Arrow
                    className={`arrow-right  ${
                      imgIndex === images.files.length - 1
                        ? "cursor-initial"
                        : ""
                    }`}
                    containerClassName={`arrow-container ${
                      imgIndex === images.files.length - 1
                        ? "cursor-initial"
                        : ""
                    }`}
                    fill={
                      imgIndex === images.files.length - 1
                        ? "#C4C4C4"
                        : "#8C8E92"
                    }
                    handleClick={showNextImageClick}
                  />
                </div>
              </div>
              <div className="close-pop-up-icon" onClick={onClose}>
                <img
                  width={25}
                  src={
                    require("../../img/showLsnPlanAndLsnProcess/delete.svg")
                      .default
                  }
                />
              </div>
            </div>
            <div className="pop-up-image-container">
              <img
                height={"100%"}
                className="pop-up-image"
                src={images.urlPath + images.files[imgIndex]}
                alt={alt}
              />
            </div>
          </div>
        </>,
        document.getElementById("portal")
      )
    : null;
}
