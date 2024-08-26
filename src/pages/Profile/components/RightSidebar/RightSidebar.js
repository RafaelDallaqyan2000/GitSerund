import "./RightSidebar.css";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { UserActivity } from "../UserActivity/UserActivity";
import { InputSwitch } from "../../../../components";
import { UserComment } from "../UserComment";
import {
  getUserActivities,
  getUserComments,
  getCommentTypes,
  openRightSidebar,
} from "../../../../store";
import profilePicture from "../../../../img/defaultProfile.png";
import Pagination from "../../../../components/Pagination/Pagination";
import { parseURLSearch, objectToQueryString } from "../../../../helpers";
import { useTranslation } from "react-i18next";

const RightSidebar = ({
  user,
  getUserActivities,
  getUserComments,
  getCommentTypes,
  commentTypes,
  activities,
  comments,
  currentUserTypeId,
  pageCount,
  openRightSidebar,
  openOrCloseRightSidebar,
}) => {
  const [showComments, setShowComments] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(!openOrCloseRightSidebar);
  const location = useLocation();
  const navigate = useNavigate();
  const { pathname } = location;
  const { t, i18n } = useTranslation();
  let searchURL = parseURLSearch(location.search);
  let { sidebarPage } = searchURL;

  const handleClickSwitch = useCallback(() => {
    setShowComments((prevState) => !prevState);
  }, []);

  const handleClickComment = useCallback((comment) => {
    const { lessonPlanId, typeId, userMethodId, id } = comment;

    const queryObject = {
      commentId: id,
      umId: userMethodId,
      typeId,
    };
    let queryString = objectToQueryString(queryObject);
    queryString = queryString ? `?${queryString}` : "";

    if (currentUserTypeId !== 6) return;

    navigate(`/show/lessonPlan/${lessonPlanId}${queryString}`);
  }, []);

  const handleClickActivity = useCallback((activity) => {
    const { lessonPlanId } = activity;
    if (currentUserTypeId !== 6) return;

    navigate(`/show/lessonPlan/${lessonPlanId}`);
  }, []);

  const showProfileImage = useMemo(() => {
    return (
      pathname.includes("/Profile/professionalDetails") ||
      pathname.includes("/Profile/schoolDetails") ||
      pathname.includes("/Profile/personalDetails") ||
      (currentUserTypeId !== 6 && !pathname.includes("/Profile/")) ||
      false
    );
  }, [currentUserTypeId, pathname]);

  const handleGetData = useCallback(() => {
    if (user && user.userId) {
      if (showComments) {
        getCommentTypes();
        getUserComments({
          userId: user.userId,
          page: sidebarPage || 1,
          rowCount: 5,
        });
      } else {
        getUserActivities({
          userId: user.userId,
          page: sidebarPage || 1,
          rowCount: 5,
          language: i18n.language,
        });
      }
    }
  }, [user, showComments, sidebarPage]);

  useEffect(() => {
    const queryObject = {
      ...searchURL,
      sidebarPage: 1,
    };
    let queryString = objectToQueryString(queryObject);
    queryString = queryString ? `?${queryString}` : "";

    navigate(`${location.pathname}${queryString}`);
  }, [showComments, user]);

  useEffect(() => {
    handleGetData();
  }, [sidebarPage, showComments, user, i18n.language]);

  const toggleSidebar = () => {
    setOpenSidebar((prev) => !prev);
    openRightSidebar(openSidebar);
  };

  return (
    <div
      className={`${openSidebar ? "" : "right-sidebar-closed"} right_sidebar`}
    >
      <div onClick={toggleSidebar} className="toggle-sidebar">
        <img
          style={{
            transform: openSidebar ? "none" : "rotate(180deg)",
            padding: "7px",
          }}
          src={require("../../../../img/close.svg").default}
        />
      </div>
      {user && user.userId ? (
        <div
          className="right-sidebar-container-from-user-profile-page"
          style={{ left: !openSidebar ? "40px" : 0 }}
        >
          {showProfileImage ? (
            <>
              <figure className="right_sidebar_figure">
                <img
                  src={"/files/" + user.userId + "/" + user.imageName}
                  alt="Profile"
                  className="right_sidebar_profile_img"
                  onError={(e) => {
                    e.target.error = null;
                    e.target.src = profilePicture;
                  }}
                />
              </figure>
              <p className="right_sidebar_user_name">{user.fullName}</p>
            </>
          ) : null}
          <InputSwitch
            showComments={showComments}
            onClickSwitch={handleClickSwitch}
          />
          <p className="right_sidebar_section_name">
            {showComments ? t("Comments") : t("Activity")}
          </p>

          <div className="right_sidebar_data_container">
            {showComments ? (
              <>
                {comments && comments.length
                  ? comments.map((comment) => (
                      <UserComment
                        key={comment.id}
                        comment={comment}
                        onClickComment={handleClickComment}
                        type={commentTypes.find(
                          (type) => type.id === comment.typeId
                        )}
                        allowClick={currentUserTypeId === 6}
                      />
                    ))
                  : null}
              </>
            ) : (
              <>
                {activities && activities.length
                  ? activities.map((activity) => (
                      <UserActivity
                        key={activity.insertDate}
                        activity={activity}
                        date={activity.insertDate}
                        onClick={handleClickActivity}
                        allowClick={currentUserTypeId === 6}
                      />
                    ))
                  : null}
              </>
            )}
          </div>

          <div className="right_sidebar_pagination_container">
            <Pagination
              pageCount={pageCount || 0}
              currentPageVarName="sidebarCurrentPage"
              pageNameInURL="sidebarPage"
              rowCount={5}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    currentUserTypeId: state.authReducer.typeId,
    user: state.authReducer.user,
    activities: state.userReducer.activities,
    comments: state.userReducer.comments,
    pageCount: state.userReducer.pageCount,
    commentTypes: state.detailsLsnPlanAndProcReducer.commentTypes,
    openOrCloseRightSidebar: state.adminPageReducer.openOrCloseRightSidebar,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getUserActivities: (params) => dispatch(getUserActivities(params)),
    getUserComments: (params) => dispatch(getUserComments(params)),
    getCommentTypes: () => dispatch(getCommentTypes()),
    openRightSidebar: (open) => dispatch(openRightSidebar(open)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RightSidebar);
