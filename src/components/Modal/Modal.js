import React from "react";
import "./Modal.css";

export function Modal({ setImgModalId, actionImagesPaths }) {
  return (
    <div className="allImagesInAction" onClick={(e) => e.stopPropagation()}>
      <div>
        <img
          src={require("../../img/Polygon.svg").default}
          className="polygonSvg"
        />
      </div>
      <div className="bodyImagesModal">
        {actionImagesPaths.map((image) => {
          return (
            <div className="imageInModal">
              <img width={193} height={122} src={image} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
