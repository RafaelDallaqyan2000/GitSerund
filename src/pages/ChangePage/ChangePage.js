import React, { useCallback, useEffect, useRef, useState } from "react";
import "./ChangePage.css";
import { connect } from "react-redux";
import { showChangePage, handleFormChange, initForm } from "../../store";
import Data from "./Data/Data";
import { useNavigate } from "react-router-dom";
import { MessagePopUp } from "../../components";
import { useTranslation } from "react-i18next";

const ChangePage = ({
  showChangePage,
  handleFormChange,
  image,
  imageName,
  initForm,
  user,
  userId,
}) => {
  const { t } = useTranslation();
  const [img, setImg] = useState([]);
  const [editInfo, setEditInfo] = useState(false);
  const imageRef = useRef();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    initForm(user);
    showChangePage(true);
    handleFormChange("showLeftSideBar", true);
    handleFormChange("showRightSideBar", false);
  }, []);

  const onImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const url = URL.createObjectURL(e.target.files[0]);
      let reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = function (e) {
        let image = new Image();
        image.src = e.target.result;
        image.onload = function () {
          let height = this.height;
          let width = this.width;
          if (height > 450 || width > 450) {
            setErrorMessage(t("The size of the picture should not exceed (450 x 450px)."));
          } else {
            setImg(url);
            handleFormChange("image", file);
          }
        };

        setEditInfo(true);
      };
    }
  };
  const resizeImg = (img, height, width) => {
    img.height = height;
    img.width = width;
  };
  const handleDelete = () => {
    setImg([]);
    handleFormChange("image", []);
    handleFormChange("imageName", undefined);
    setEditInfo(true);
  };
  const openHomePage = () => {
    navigate("/home");
  };

  const handleClosePopUp = useCallback(() => {
    setErrorMessage("");
  }, []);

  return (
    <>
      <MessagePopUp
        onClosePopup={handleClosePopUp}
        open={!!errorMessage}
        title={t("Error")}
        text={errorMessage}
        closeBtnTitle={t("Close")}
        onAlertCancelClick={handleClosePopUp}
        styleText={{ textAlign: "left" }}
        popUpContainerStyles={{ top: "50%" }}
        styleTitle={{ color: "#EA6670" }}
        styleCancelBtn={{
          background: "#EA6670",
          color: "#FFF",
        }}
      />

      <div className="current-page">
        <div style={{ backgroundColor: "#F7F8FC" }}>
          <div className="header-mobile-school-details">
            <img
              src={require("../../img/stemgen-mobile.svg").default}
              alt="stemgen-image"
              onClick={() => openHomePage()}
            />
          </div>
          <p className="header-current-page">{t("Edit page")}</p>
          <div className="img_container">
            <div className="marduk">
              {img.length > 0 ? (
                <img
                  ref={imageRef}
                  className="uploaded_image_profile"
                  src={img}
                  height="450"
                  width="450"
                />
              ) : (
                <label
                  htmlFor="image-upload"
                  className="custom-img-upload custom-img-upload-change-page"
                >
                  {imageName === undefined ||
                  imageName === "undefined" ||
                  !imageName ||
                  imageName === null ||
                  imageName === "null" ? (
                    <div
                      style={{ padding: "35px 8px 9px 42px" }}
                      className="empty-picture"
                    >
                      <img
                        src={require("../../img/empty-picture.svg").default}
                        className="empty-picture-icon"
                      />
                    </div>
                  ) : (
                    <img
                      ref={imageRef}
                      className="image_backic"
                      src={`/files/${userId}/${imageName}`}
                      onError={(e) => {
                        e.target.error = null;
                        e.target.src =
                          require("../../img/empty-picture.svg").default;
                      }}
                      height="450"
                      width="450"
                    />
                  )}
                  <img
                    src={require("../../img/x-icon.svg").default}
                    className="x-icon"
                    onClick={handleDelete}
                  />
                </label>
              )}
            </div>
            <div id="img-upload" name="myImage" />
            {(imageName !== "undefined" &&
              imageName !== undefined &&
              imageName !== "null" &&
              imageName !== null &&
              imageName) ||
            img.length ? (
              <button className="xik" onClick={handleDelete}>
                <img src={require("../../img/xik.svg").default} />
              </button>
            ) : null}
            <div className="upload-profile-picture-container">
              <div className="display-none-schoole-details">
                <label className="label-image-upload upload-img">
                  {t("Upload image")}
                  <input
                    type="file"
                    size={5 * 1024 * 1024} // 5mb
                    accept="image/png, image/jpeg"
                    onChange={(e) => {
                      if (e.target.files[0].size < e.target.size) {
                        onImageChange(e);
                      } else if (e.target.files[0].size >= e.target.size) {
                        setErrorMessage(t("File size must not exceed 5mb"));
                      }
                      e.target.value = "";
                    }}
                  />
                </label>
              </div>
              <p className="img-format">
                {t("450x450px, png, jpg, or jfif formats")}
              </p>
            </div>
          </div>
          <div className="upload-profile-picture-container upload-profile-picture-container-mobile">
            <div className="display-none-schoole-details">
              <label className="label-image-upload upload-img">
                {t("Upload image")}
                <input
                  type="file"
                  size={5 * 1024 * 1024} // 5mb
                  accept="image/png, image/jpeg"
                  onChange={(e) => {
                    if (e.target.files[0].size < e.target.size) {
                      onImageChange(e);
                    } else if (e.target.files[0].size >= e.target.size) {
                      setErrorMessage(t("File size must not exceed 5mb"));
                    }
                    e.target.value = "";
                  }}
                />
              </label>
            </div>
            <p className="img-format">{t("450x450px, png, jpg, or jfif formats")}</p>
          </div>
        </div>
        <Data setEditInfo={setEditInfo} editInfo={editInfo} />
      </div>
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    image: state.formReducer.image,
    user: state.authReducer.user,
    imageName: state.formReducer.imageName,
    userId: state.formReducer.userId,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    showChangePage: (show) => dispatch(showChangePage(show)),
    initForm: (data) => dispatch(initForm(data)),
    handleFormChange: (key, name) => dispatch(handleFormChange(key, name)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ChangePage);
