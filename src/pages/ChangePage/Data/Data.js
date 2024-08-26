import "./Data.css";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { connect } from "react-redux";
import store, {
  handleFormChange,
  editProfile,
  handleAuthChange,
  getAllSchoolData,
} from "../../../store";
import "../../Home/RecentAdditions/RecentAdditions.css";
import Button from "../../../components/Button/Button";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import SchoolDetails from "./SchoolDetails/SchoolDetails";
import PersonalDetails from "./PersonalDetails/PersonalDetails";
import underline from "../../../img/underline.svg";
import ProfessionalDetails from "./ProfessionalDetails/ProfessionalDetails";
import { MessagePopUp } from "../../../components";
import { useTranslation } from "react-i18next";

const Data = ({
  editProfile,
  handleFormChange,
  phone_code,
  popupDetails,
  handleAuthChange,
  editInfo,
  setEditInfo,
  user,
  getAllSchoolData,
  allSchoolDataForEdit,
  checkUpdateFixedInformationAboutUser,
}) => {
  const { details } = useParams();
  const [showSubjects, setShowSubjects] = useState(
    localStorage.getItem("showSubjects") === "true"
  );
  const [allSchoolInfo, setAllSchoolInfo] = useState({});
  const { t, i18n } = useTranslation();

  const defaultData = useMemo(() => {
    return {
      district: allSchoolInfo?.district?.name,
      region: allSchoolInfo?.region?.name,
      community: allSchoolInfo?.community?.name,
      school: allSchoolInfo?.school?.name,
    };
  }, [Object.keys(allSchoolInfo)?.length]);

  useEffect(() => {
    setShowSubjects(localStorage.getItem("showSubjects") === "true");
  }, [localStorage.getItem("showSubjects")]);

  useEffect(() => {
    handleFormChange(details, true);
  }, [details]);

  useEffect(() => {
    getAllSchoolData();
  }, []);

  useEffect(() => {
    if (Object.keys(allSchoolDataForEdit)?.length) {
      setAllSchoolInfo(allSchoolDataForEdit);
    }
  }, [Object.keys(allSchoolDataForEdit)?.length]);

  useEffect(() => {
    handleFormChange("districtValue", allSchoolDataForEdit?.district?.name);
    handleFormChange("regionValue", allSchoolDataForEdit?.region?.name);
    handleFormChange("communityValue", allSchoolDataForEdit?.community?.name);
    handleFormChange("schoolValue", allSchoolDataForEdit?.school?.name);
  }, [Object.keys(allSchoolDataForEdit)?.length]);

  const handleClickCancel = useCallback(() => {
    setEditInfo(false);
    handleFormChange("districtValue", defaultData?.district);
    handleFormChange("regionValue", defaultData?.region);
    handleFormChange("communityValue", defaultData?.community);
    handleFormChange("schoolValue", defaultData?.school);

    handleFormChange("fullName", user.fullName);
    handleFormChange("specializationId", user.specializationId);
    handleFormChange("educationId", user.educationId);
    handleFormChange("email", user.email);
    handleFormChange("phone_number", user.phone_number);
    handleFormChange("imageName", user.imageName);
    handleFormChange("regionId", user.regionId);
    handleFormChange("communityId", user.communityId);
    handleFormChange("schoolId", user.schoolId);
    handleFormChange(
      "subjectIds",
      user.subjects.map((item) => {
        return {
          id: item.subjectId,
          name: item.name,
          subArr: [...item.classes],
        };
      })
    );
  }, [user]);

  const saveChangePage = (e) => {
    e.preventDefault();

    if (editInfo) {
      setEditInfo(false);

      let {
        schoolId,
        fullName,
        specializationId,
        educationId,
        email,
        phone_number,
        image,
        imageName,
        imageUrl,
        subjectIds,
      } = store.getState().formReducer;

      if (!phone_number || phone_number.length < 6) {
        handleAuthChange("popupDetails", {
          type: "fail",
          title: t("Error"),
          text: t("Wrong phone number"),
        });
        return;
      }

      const subjectsWithClasses = [];
      if (subjectIds) {
        for (let subject of subjectIds) {
          subjectsWithClasses.push({
            subjectId: subject.id,
            classes: subject.subArray,
          });
        }
      }

      let reg = {
        schoolId,
        fullName,
        specializationId,
        educationId,
        email,
        phone_code,
        phone_number,
        imageName,
        imageUrl,
        image,
        subjects: subjectsWithClasses,
        checkUpdateFixedInformationAboutUser,
        language: i18n.language,
      };

      if (!subjectsWithClasses || !subjectsWithClasses.length) {
        handleAuthChange("popupDetails", {
          type: "fail",
          title: t("Error"),
          text: "Անհրաժեշտ է ընտրել առարկան",
        });
        return;
      }

      editProfile(reg);
    }
  };

  const handleClosePopup = useCallback(() => {
    handleAuthChange("popupDetails", {
      type: "fail",
      title: "",
      text: "",
    });
  }, []);

  const detailsInfo = {
    schoolDetails: <SchoolDetails setEditInfo={setEditInfo} />,
    personalDetails: <PersonalDetails setEditInfo={setEditInfo} />,
    professionalDetails: <ProfessionalDetails setEditInfo={setEditInfo} />,
  };

  return (
    <div className="profile-data-container">
      <MessagePopUp
        onClosePopup={handleClosePopup}
        open={!!popupDetails?.text}
        title={popupDetails?.title}
        text={popupDetails?.text}
        closeBtnTitle={t("Close")}
        onAlertCancelClick={handleClosePopup}
        styleText={{ textAlign: "center" }}
        popUpContainerStyles={{ top: "50%" }}
        styleTitle={{
          color: popupDetails?.type === "success" ? "#1C1C1C" : "#EA6670",
        }}
        styleCancelBtn={{
          background:
            popupDetails?.type === "success"
              ? "linear-gradient(83.13deg, #6FD89C 0%, #46B776 100%)"
              : "#EA6670",
          color: "#FFF",
        }}
      />
      <div className="div_addition-data div_addition-data-desktop">
        {/* <div> */}
        <Link to="/Profile/schoolDetails">
          <div
            className="btn_addition_details"
            onClick={() => handleFormChange("details", "schoolDetails")}
            style={{
              backgroundColor:
                details === "schoolDetails" ? "#FFFFFF" : "#F7F8FC",
              boxShadow:
                details === "schoolDetails"
                  ? "0px 8px 24px rgba(74, 156, 246, 0.18)"
                  : "",
            }}
          >
            <p
              style={{
                color: details === "schoolDetails" ? "#6AB1FE" : "#8C8E92",
              }}
            >
              {t("School information")}
            </p>

            <img
              style={{
                display: details === "schoolDetails" ? "block" : "none",
              }}
              className="underline-icon"
              src={underline}
            />
          </div>
        </Link>
        <div>
          <Link to="/Profile/personalDetails">
            <div
              className="btn_addition_details"
              style={{
                backgroundColor:
                  details === "personalDetails" ? "#FFFFFF" : "#F7F8FC",
                boxShadow:
                  details === "personalDetails"
                    ? "0px 8px 24px rgba(74, 156, 246, 0.18)"
                    : "",
              }}
              onClick={() => handleFormChange("details", "personalDetails")}
            >
              <p
                style={{
                  color: details === "personalDetails" ? "#6AB1FE" : "#8C8E92",
                }}
              >
                {t("Personal information")}
              </p>

              <img
                style={{
                  display: details === "personalDetails" ? "block" : "none",
                }}
                className="underline-icon"
                src={underline}
              />
            </div>
          </Link>
        </div>
        {showSubjects ? (
          <div>
            <Link to="/Profile/professionalDetails">
              <div
                className="btn_addition_details"
                style={{
                  backgroundColor:
                    details === "professionalDetails" ? "#FFFFFF" : "#F7F8FC",
                  boxShadow:
                    details === "professionalDetails"
                      ? "0px 8px 24px rgba(74, 156, 246, 0.18)"
                      : "",
                }}
                onClick={() =>
                  handleFormChange("details", "professionalDetails")
                }
              >
                <p
                  style={{
                    color:
                      details === "professionalDetails" ? "#6AB1FE" : "#8C8E92",
                  }}
                >
                  {t("Professional data")}
                </p>

                <img
                  style={{
                    display:
                      details === "professionalDetails" ? "block" : "none",
                  }}
                  className="underline-icon"
                  src={underline}
                />
              </div>
            </Link>
          </div>
        ) : null}
      </div>
      <div className="div_addition-data div_addition-data-mobile">
        {/* <div> */}
        <Link to="/Profile/schoolDetails" className="links-backg-color">
          <div
            className="btn_addition_details"
            onClick={() => handleFormChange("details", "schoolDetails")}
          >
            <p
              style={{
                color: details === "schoolDetails" ? "#6AB1FE" : "#8C8E92",
              }}
              className="details-title width-school-detials"
            >
              {t("School information")}
            </p>

            <div className="underline-profile-mobile">
              <p
                className="underline-action"
                style={{
                  display: details === "schoolDetails" ? "block" : "none",
                  height: "3px",
                }}
              ></p>
            </div>
          </div>
        </Link>
        <div>
          <Link to="/Profile/personalDetails" className="links-backg-color">
            <div
              className="btn_addition_details"
              onClick={() => handleFormChange("details", "personalDetails")}
            >
              <p
                style={{
                  color: details === "personalDetails" ? "#6AB1FE" : "#8C8E92",
                }}
                className="details-title width-person-detials"
              >
                {t("Personal information")}
              </p>

              <div className="underline-profile-mobile">
                <p
                  className="underline-action"
                  style={{
                    display: details === "personalDetails" ? "block" : "none",
                    height: "3px",
                  }}
                ></p>
              </div>
            </div>
          </Link>
        </div>
        <Link to="/Profile/professionalDetails" className="links-backg-color">
          <div
            className="btn_addition_details"
            onClick={() => handleFormChange("details", "professionalDetails")}
          >
            <p
              style={{
                color:
                  details === "professionalDetails" ? "#6AB1FE" : "#8C8E92",
              }}
              className="details-title width-prof-detials"
            >
              {t("Professional data")}
            </p>
            <div className="underline-profile-mobile">
              <p
                className="underline-action"
                style={{
                  display: details === "professionalDetails" ? "block" : "none",
                  height: "3px",
                }}
              ></p>
            </div>
          </div>
        </Link>
      </div>

      <form
        onSubmit={(e) => e.preventDefault()}
        className="formplace school-details-form"
        style={{ width: "443px", marginTop: "28px" }}
      >
        {details && detailsInfo[details]}

        <div
          className="save-data-div-mobile"
          style={{
            marginTop: "40px",
            float: "right",
            cursor: editInfo ? "pointer" : "not-allowed",
          }}
        >
          <Button
            title={t("Cancel")}
            className={`cancel-data`}
            onClick={handleClickCancel}
          />

          <Button
            disabled={!editInfo}
            title={t("Save")}
            className={`save-data ${!editInfo && "disable-btn"}`}
            onClick={saveChangePage}
          />
        </div>
      </form>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    phoneCode: state.authReducer.phoneCode,
    user: state.authReducer?.user,
    phone_code: state.formReducer.phone_code,
    allSchoolDataForEdit: state.formReducer.allSchoolDataForEdit ?? {},
    checkUpdateFixedInformationAboutUser:
      state.formReducer.checkUpdateFixedInformationAboutUser ?? 0,
    popupDetails: state.authReducer.popupDetails,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    handleFormChange: (key, name) => dispatch(handleFormChange(key, name)),
    editProfile: (reg) => dispatch(editProfile(reg)),
    handleAuthChange: (key, value) => dispatch(handleAuthChange(key, value)),
    getAllSchoolData: () => dispatch(getAllSchoolData()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Data);
