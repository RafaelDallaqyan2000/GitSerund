import React, { useCallback, useState } from "react";
import "./crop.css";
import getCroppedImg from "../../../../helpers/cropImage";
import closeIcon from "../../../../img/multiselectCross.svg";
import { GreenButton } from "../../../GreenButton";
import { GreyButton } from "../../../GreyButton";
import Cropper from "react-easy-crop";
import { useTranslation } from "react-i18next";

export function Crop(props) {
  const { onCancel, photoURL, onCrop, image } = props;
  const { t } = useTranslation();
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const handleCrop = useCallback(async () => {
    const croppedImageUrl = await getCroppedImg(
      photoURL,
      croppedAreaPixels,
      image.name,
      image.type
    );

    onCrop(croppedImageUrl);
  }, [photoURL, croppedAreaPixels, image]);

  const handleCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  return (
    <div
      className="crop_wrapper"
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <div className="crop_container">
        <div className="crop_title_container">
          <p className="crop_title">
            {t("Select the visible part of the image")}
          </p>
          <figure className="crop_close" onClick={onCancel}>
            <img src={closeIcon} alt="Close" className="crop_close_icon" />
          </figure>
        </div>
        <div className="crop_body">
          <Cropper
            image={photoURL}
            rotation={rotation}
            crop={crop}
            zoom={zoom}
            aspect={4 / 2}
            onZoomChange={setZoom}
            onCropChange={setCrop}
            onRotationChange={setRotation}
            onCropComplete={handleCropComplete}
          />
        </div>

        <div className="crop_actions">
          <GreyButton onClick={onCancel} style={{ marginRight: "12px" }}>
            {t("Cancel")}
          </GreyButton>
          <GreenButton onClick={handleCrop}>{t("Confirm")}</GreenButton>
        </div>
      </div>
    </div>
  );
}
