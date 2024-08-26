import "./ProfileDetails.css";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import schoolIcon from "../../../../img/building.svg";
import educationIcon from "../../../../img/education.svg";
import emailIcon from "../../../../img/email.svg";
import messageIcon from "../../../../img/message.svg";
import editIcon from "../../../../img/pencilGrey.svg";
import rightBorder from "../../../../img/verticalLine.png";
import defaultProfileIcon from "../../../../img/defaultProfile.png";
import { UserType } from "../../../AllUsersPage/components/UserType/UserType";
import { connect } from "react-redux";
import {
  fetchCommunitiesByRegion,
  getDistricts,
  fetchSchoolsByCommunity,
  getUserRoles,
  putUserRoles,
} from "../../../../store";
import { SendAdminMessageWindow } from "../../../AllUsersPage/components/SendAdminMessageWindow/SendAdminMessageWindow";
import { MessagePopUp, LessonPlanViewToggle } from "../../../../components";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

function ProfileDetailsComponent({
  getUserRoles,
  allRoles,
  checkedUsers,
  userLessonPlans,
  fetchSchoolsByCommunity,
  fetchCommunitiesByRegion,
  getDistricts,
  regionId,
  putUserRoles,
  user,
  currentUserTypeId,
  userTypeId,
  lsnPlanToggleCard,
  onToggleLsnPlanCardView,
  userData,
}) {
  const { t, i18n } = useTranslation();
  const [openSendMessageWindow, setOpenSendMessageWindow] = useState(false);
  const [showPopUpMessage, setShowPopUpMessage] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  let findAnotherUserId = pathname?.split("/");
  let anotherUserId = findAnotherUserId[findAnotherUserId.length - 1];

  const handleClickOption = useCallback((user, role) => {
    return putUserRoles(user?.userId, role?.id);
  }, []);

  const handleOpenClosePopup = useCallback(() => {
    setShowPopUpMessage((prevState) => !prevState);
  }, []);

  const handleOpenCloseMsgWindow = useCallback(() => {
    setOpenSendMessageWindow((prevState) => !prevState);
  }, []);

  const handleClickEditBtn = useCallback(() => {
    navigate("/Profile/personalDetails");
  }, []);

  const userRoleName = useMemo(() => {
    if (user.typeId && allRoles.length) {
      return allRoles.find((role) => role.id === user.typeId).name;
    }
    return "";
  }, [allRoles, user]);

  useEffect(() => {
    getUserRoles(i18n.language);
    getDistricts();
  }, []);

  useEffect(() => {
    if (regionId) {
      fetchCommunitiesByRegion(() => {
        fetchSchoolsByCommunity();
      }, regionId);
    }
  }, [regionId]);

  const callbackOnSendMessage = () => {
    setOpenSendMessageWindow(false);
    handleOpenClosePopup(true);
  };

  return (
    <>
      {user && user.userId ? (
        <>
          <MessagePopUp
            onClosePopup={handleOpenClosePopup}
            open={showPopUpMessage}
            title={t("Done")}
            text={t("The notification has been sent successfully.")}
            styleText={{ textAlign: "center" }}
            popUpContainerStyles={{ top: "50%" }}
          />
          {openSendMessageWindow && (
            <div className="message_window_wrapper">
              <SendAdminMessageWindow
                checkedUsers={checkedUsers}
                openMessageWindow={openSendMessageWindow}
                setOpenMessageWindow={setOpenSendMessageWindow}
                setShowPopUpMessage={handleOpenClosePopup}
                callbackFunction={callbackOnSendMessage}
              />
            </div>
          )}
          <div className="personal">
            <figure className="personal_figure">
              <img
                src={
                  "/files/" +
                  (anotherUserId || user.userId) +
                  "/" +
                  user.imageName
                }
                alt="Profile Image"
                className="personal_img"
                onError={(e) => {
                  e.target.error = null;
                  e.target.src = defaultProfileIcon;
                }}
              />
            </figure>
            <div className="personal_details">
              <div className="personal_box">
                <div className="personal_school">
                  <img
                    src={schoolIcon}
                    alt={t("School")}
                    className="personal_school_icon"
                  />
                  <p className="personal_school_name">{userData?.schoolName}</p>
                </div>
                {userTypeId === 6 && pathname.includes("/user-profile/") ? (
                  <div
                    className="personal_message"
                    onClick={handleOpenCloseMsgWindow}
                  >
                    <img
                      src={messageIcon}
                      alt={t("Message")}
                      className="personal_message_icon"
                    />
                  </div>
                ) : (
                  <div style={{ height: "48px" }}></div>
                )}
                {pathname.includes("/Profile") && (
                  <div
                    className="personal_message"
                    onClick={handleClickEditBtn}
                  >
                    <img
                      src={editIcon}
                      alt={t("Edit")}
                      className="personal_message_icon"
                    />
                  </div>
                )}
              </div>
              <div className="personal_name_type_container">
                <div>
                  <h3 className="personal_name">{user.fullName}</h3>
                  <UserType
                    onClickOption={handleClickOption}
                    userType={
                      currentUserTypeId === 6 && !pathname.includes("/Profile/")
                        ? allRoles
                        : []
                    }
                    value={userRoleName}
                    user={user}
                  />
                </div>
                <div>
                  <LessonPlanViewToggle
                    onToggleLsnPlanCard={onToggleLsnPlanCardView}
                    lsnPlanToggleCard={lsnPlanToggleCard}
                  />
                </div>
              </div>
              <div className="personal_contact">
                <div className="personal_education">
                  <img
                    src={educationIcon}
                    alt="Educaton"
                    className="personal_education_icon"
                  />
                  <p className="personal_education_text">
                    {user.educationId === 3 ? t("Secondary") : t("Higher")}
                  </p>
                </div>
                <div className="personal_email">
                  <img
                    src={emailIcon}
                    alt={t("Email")}
                    className="personal_email_icon"
                  />
                  <p className="personal_email_text">{user.email}</p>
                </div>
              </div>
              <div className="personal_activities">
                <div className="personal_activity">
                  <p className="personal_activity_count">
                    {userLessonPlans?.userLessonPlanDetails
                      ? userLessonPlans?.userLessonPlanDetails
                          ?.totalLessonPlansCount
                      : 0}
                  </p>
                  <p className="personal_activity_name">{t("Lesson plans")}</p>
                  <img
                    src={rightBorder}
                    alt="Border"
                    className="personal_activity_border"
                  />
                </div>
                <div className="personal_activity purple">
                  <p className="personal_activity_count">
                    {userLessonPlans?.userLessonPlanDetails
                      ? userLessonPlans?.userLessonPlanDetails
                          ?.totalLessonPlansViews
                      : 0}
                  </p>
                  <p className="personal_activity_name">{t("Views")}</p>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    currentUserTypeId: state.authReducer.typeId,
    regionId: state.formReducer.regionId,
    userData: state.formReducer.userData,
    allRoles: state.adminPageReducer.allRoles ?? [],
    checkedUsers: state.adminPageReducer.checkedUsers,
    userLessonPlans: state.lessonPlanReducer.userLessonPlans,
    userTypeId: state.authReducer.typeId,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getUserRoles: (language) => dispatch(getUserRoles(language)),
    fetchSchoolsByCommunity: () => dispatch(fetchSchoolsByCommunity()),
    getDistricts: (callback = () => {}) => dispatch(getDistricts(callback)),
    putUserRoles: (userId, roleId) => dispatch(putUserRoles(userId, roleId)),
    fetchCommunitiesByRegion: (callback = () => {}, regionId) =>
      dispatch(fetchCommunitiesByRegion(callback, regionId)),
  };
};

export const ProfileDetails = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileDetailsComponent);
