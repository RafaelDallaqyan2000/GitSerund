import React, { useState, useEffect, useCallback } from "react";
import { connect } from "react-redux";
import Button from "../../../components/Button/Button";
import Input from "../../../components/Form/Input";
import {
  fetchEducations,
  fetchSpecializations,
  handleFormChange,
} from "../../../store";
import { useNavigate } from "react-router-dom";
import { MessagePopUp, SelectWithSearchHOC } from "../../../components";
import { useTranslation } from "react-i18next";

export const PersonRegister = ({
  fetchSpecializations,
  specializations,
  fetchEducations,
  educations,
  formOnChange,
  profImg,
  fullName,
  specializationId,
  educationId,
}) => {
  const [disabled, setDisabled] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const { t } = useTranslation();
  useEffect(() => {
    fetchSpecializations(() => {});
    fetchEducations(() => {});
    if (profImg) {
      setImage(URL.createObjectURL(profImg));
    }
  }, []);

  useEffect(() => {
    if (fullName && specializationId && educationId) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [fullName, specializationId, educationId]);

  let navigate = useNavigate();

  function changePath() {
    navigate(`/register/third-step`);
  }

  const [image, setImage] = useState([]);
  const onImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      var reader = new FileReader();
      const file = e.target.files[0];
      const imageObjectUrl = URL.createObjectURL(file);

      reader.readAsDataURL(e.target.files[0]);
      reader.onload = function (e) {
        var image = new Image();
        image.src = e.target.result;

        image.onload = function () {
          var height = this.height;
          var width = this.width;
          if (height > 450 || width > 450) {
            //show width and height to user
            // document.getElementById("width").innerHTML=width;
            // document.getElementById("height").innerHTML=height;
            setErrorMessage(
              t("The size of the picture should not exceed (450 x 450px).")
            );
            // return false;
          } else {
            setImage(imageObjectUrl);
            formOnChange("image", file);
            // return true;
          }
        };
      };
    }
  };

  const handleClosePopUp = useCallback(() => {
    setErrorMessage("");
  }, []);

  return (
    <div>
      <MessagePopUp
        onClosePopup={handleClosePopUp}
        open={!!errorMessage}
        text={errorMessage}
        title={t("Error")}
        closeBtnTitle={t("Փակել")}
        onAlertCancelClick={handleClosePopUp}
        styleText={{ textAlign: "center" }}
        popUpContainerStyles={{ top: "50%" }}
        styleCancelBtn={{
          background: "#EA6670",
          color: "#FFF",
        }}
      />

      <div className="register_form register_form-mobile">
        <form className="formplace">
          <div className="form_title form_title-mobile-register">
            <p>{t("Sign Up")}</p>
          </div>

          <div className="form_subtitle">
            <p>{t("Personal information")}</p>
          </div>
          <div>
            <div className="image_upload_title image_upload_title-mobile ">
              <p>{t("Add image")}</p>
            </div>
            <div className="upload_container">
              {image.length > 0 ? (
                <button
                  className="img-delete"
                  onClick={() => (setImage([]), formOnChange("image", {}))}
                >
                  <img
                    src={require("../../../img/xik.svg").default}
                    style={{ width: "10px" }}
                  />
                </button>
              ) : null}

              <div
                style={{
                  border: "1px dashed #CAD0DE",
                  padding: "7px",
                  borderRadius: "10px",
                }}
              >
                {image.length > 0 ? (
                  <img className="custom-img-upload" alt=" " src={image} />
                ) : (
                  <label
                    htmlFor="one-file-upload"
                    className="custom-img-upload custom-img-upload-register"
                  >
                    <div className="padding-div-of-image">
                      <svg
                        width="51"
                        height="61"
                        viewBox="0 0 51 61"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M35.1108 24.8077C32.3274 27.5916 28.9208 29.0026 24.9868 29.0026C21.0536 29.0026 17.6475 27.5912 14.8636 24.8081C12.0797 22.0246 10.6683 18.6184 10.6683 14.6837C10.6683 10.75 12.0797 7.34375 14.8632 4.56025C17.6466 1.77675 21.0523 0.365723 24.9868 0.365723C28.9204 0.365723 32.3265 1.77675 35.1104 4.5598C37.8942 7.34421 39.3052 10.7504 39.3052 14.6837C39.3052 18.6184 37.8942 22.0242 35.1108 24.8077ZM49.7613 42.4619C50.0029 43.8183 50.1669 45.1027 50.248 46.2802C50.3282 47.431 50.369 48.632 50.3695 49.8496C50.3695 53.0055 49.3727 55.5596 47.4067 57.4416C45.465 59.3005 42.8973 60.2429 39.7736 60.2429H10.8507C7.72712 60.2429 5.15846 59.3001 3.2172 57.4416C1.25164 55.5583 0.254883 53.0045 0.254883 49.8501C0.254883 48.638 0.295211 47.4379 0.374952 46.2816C0.456067 45.1013 0.620131 43.8164 0.861644 42.4619C1.10545 41.0953 1.41937 39.804 1.7947 38.6232C2.18332 37.4019 2.71126 36.1972 3.36339 35.0423C4.03981 33.8441 4.83584 32.8007 5.7281 31.9413C6.66253 31.0418 7.80594 30.3194 9.1267 29.7933C10.4433 29.2687 11.9025 29.0026 13.4643 29.0026C14.0775 29.0026 14.671 29.2558 15.8148 30.0059C16.5302 30.4748 17.3551 31.0096 18.2666 31.5956C19.0526 32.0999 20.1185 32.5725 21.4338 32.9999C22.7197 33.4181 24.0235 33.6301 25.3108 33.6301C26.5981 33.6301 27.9024 33.4181 29.1869 32.9999C30.5036 32.572 31.5695 32.0995 32.3564 31.5951C33.2766 31.0036 34.1011 30.4688 34.8059 30.0063C35.9511 29.2562 36.5441 29.0031 37.1573 29.0031C38.7187 29.0031 40.1783 29.2687 41.4954 29.7929C42.8171 30.3198 43.96 31.0423 44.8935 31.9409C45.7862 32.7998 46.5818 33.8436 47.2591 35.0423C47.9117 36.1972 48.4397 37.4024 48.8278 38.6228C49.2036 39.8035 49.5175 41.0953 49.7613 42.4619Z"
                          fill="white"
                        />
                      </svg>
                    </div>
                  </label>
                )}
              </div>

              <input
                type="file"
                accept="image/png, image/jpeg"
                id="one-file-upload"
                name="myfile"
                onChange={(e) => onImageChange(e)}
              />
            </div>
            <div className="image_upload_title image_upload_size-mobile">
              <p>{t("450x450px, png, jpg, or jfif formats")}</p>
            </div>
          </div>

          <div>
            <Input
              label={t("Name Surname")}
              type="text"
              placeholder={t("Your details")}
              id="fullName"
              className="select-width select-input-for-mobile mobile_fields_focus"
              classNameForLabel="select-label-for-mobile"
            />
          </div>

          <div>
            <SelectWithSearchHOC
              optionLabelKey="name"
              optionUniqueKey="id"
              options={specializations}
              onOptionClick={(specialization) =>
                formOnChange("specializationId", specialization.id)
              }
              loading={false}
              readOnly={true}
              readOnlyStyle={{ top: "80px" }}
              placeholder={t("Specialization")}
              inputValue={
                specializations.find(
                  (specialization) => specialization?.id === specializationId
                )?.name
              }
              inputStyle={{
                width: "100%",
                border: "1px solid #93c7ff",
                cursor: "pointer",
              }}
              label={t("Specialization")}
            />
          </div>
          <div>
            <SelectWithSearchHOC
              optionLabelKey="name"
              optionUniqueKey="id"
              options={educations}
              onOptionClick={(education) =>
                formOnChange("educationId", education.id)
              }
              loading={false}
              readOnly={true}
              readOnlyStyle={{ top: "80px" }}
              placeholder={t("Education")}
              inputValue={
                educations?.find((education) => education?.id === educationId)
                  ?.name
              }
              inputStyle={{
                width: "100%",
                border: "1px solid #93c7ff",
                cursor: "pointer",
              }}
              label={t("Education")}
            />
          </div>

          <div>
            <Button
              onClick={() => changePath()}
              className="mt-20 done-btn-register"
              disabled={disabled}
              title={t("Continue")}
            />
          </div>

          <div className="btn_div"></div>
          <div className="reg_page">
            <p className="register-pages">
              <span className="register-current-page">2</span>
              /3
            </p>
          </div>
        </form>
        <div className="bottom-text-register-mobile">
          <p className="">© 2020-2021 AUA.am</p>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    specializations: state.educationReducer.specializations,
    educations: state.educationReducer.educations,
    profImg: state.formReducer?.image,
    fullName: state.formReducer?.fullName,
    specializationId: state.formReducer?.specializationId,
    educationId: state.formReducer?.educationId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    //   fetchRegions: () => dispatch(fetchRegions()),
    fetchSpecializations: (callback) =>
      dispatch(fetchSpecializations(callback)),
    fetchEducations: (callback) => dispatch(fetchEducations(callback)),
    formOnChange: (key, value) => dispatch(handleFormChange(key, value)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PersonRegister);
