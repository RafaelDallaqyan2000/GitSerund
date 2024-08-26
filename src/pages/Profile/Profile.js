import "./Profile.css";
import React, { Suspense, useEffect, useState } from "react";
import { ProfileDetails } from "./components/ProfileDetails";
import { RecentActions } from "./components/RecentActions";
import {
  fetchProfileDetails,
  changeAdminPageProperty,
  resetUser,
} from "../../store";
import { connect } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import ChangePage from "../ChangePage/ChangePage";
import { useTranslation } from "react-i18next";

function Profile(props) {
  const { user, fetchProfileDetails, changeAdminPageProperty, resetUser } =
    props;

  const { i18n } = useTranslation();
  const [lsnPlanToggleCard, setLsnPlanToggleCard] = useState(true);
  const params = useParams();
  const { pathname } = useLocation();
  const { details } = params;

  useEffect(() => {
    let findAnotherUserId = pathname?.split("/");
    let anotherUserId = findAnotherUserId[findAnotherUserId.length - 1];

    if (pathname.includes("/user-profile") && anotherUserId) {
      fetchProfileDetails(i18n.language, anotherUserId);
      changeAdminPageProperty("checkedUsers", [anotherUserId]);
    }

    return () => {
      resetUser();
    };
  }, [pathname]);

  const detailsType = [
    "schoolDetails",
    "personalDetails",
    "professionalDetails",
  ];

  if (detailsType.includes(details)) {
    return <ChangePage />;
  }

  const handleToggleLsnPlanView = () => {
    setLsnPlanToggleCard((prevState) => !prevState);
  };

  return (
    <div className="profile_wrapper">
      {user && user.userId ? (
        <>
          <Suspense fallback={<div>loading ...</div>}>
            <ProfileDetails
              user={user}
              lsnPlanToggleCard={lsnPlanToggleCard}
              onToggleLsnPlanCardView={handleToggleLsnPlanView}
            />
          </Suspense>
          <RecentActions user={user} lsnPlanToggleCard={lsnPlanToggleCard} />
        </>
      ) : null}
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    user: state.authReducer.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchProfileDetails: (language, id) =>
      dispatch(fetchProfileDetails(language, id)),
    changeAdminPageProperty: (key, value) =>
      dispatch(changeAdminPageProperty(key, value)),
    resetUser: () => dispatch(resetUser()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
