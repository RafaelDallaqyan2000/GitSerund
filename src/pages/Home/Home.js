import "./Home.css";
import React, { useEffect, useState, useCallback, useRef } from "react";
import OpenLayout from "./OpenLayout/OpenLayout";
import Table from "./RecentAdditions/Table/Table";
import { connect } from "react-redux";
import {
  showLessonPlanCreate,
  showChangePage,
  fetchHomeDetails,
  fetchLessonPlanTableDetails,
  setProfileEdit,
  setProfileDataForSidebar,
  handleFormChange,
  handleLogout,
} from "../../store";
import SliderOfImages from "./SliderOfImages/SliderOfImages";
import SearchBar from "./SearchBar";
import { useQuery } from "../../hooks/useQuery";
import Pagination from "../../components/Pagination";
import { Link, useNavigate } from "react-router-dom";
import {
  getNewNotificationCount,
  fetchResponsiveLessonPlanTableDetails,
  checkUpdatedUserInfo,
  getUsersAdminPage,
} from "../../store";
import {
  LessonPlanViewToggle,
  UpdateInformationPopUp,
  LessonPlanCardList,
} from "../../components";
import { ReactComponent as NotificationIcon } from "../../img/notificationIcon.svg";
import { ResponsiveHeader } from "./ResponsiveHeader/ResponsiveHeader";
import { useTranslation } from "react-i18next";
import { LogOutPopUpByMobile } from "./LogOutPopUpByMobile/LogOutPopUpByMobile";
import { useOutsideClick } from "../../hooks/useOutsideClick";

const Home = ({
  pageCount,
  showCreate,
  showChangePage,
  fetchHomeDetails,
  fetchLessonPlanTableDetails,
  setProfileEdit,
  setProfileDataForSidebar,
  tableDetails,
  getUsersAdminPage,
  getNewNotificationCount,
  showDot,
  userId,
  imageName,
  handleFormChange,
  showLsnPlansWithCards,
  activeHeart,
  serchBarInputValue,
  fetchResponsiveLessonPlanTableDetails,
  selectedSubjectId,
  selectedClassValueWithFilterPopUp,
  searchBarWithFilterPopUp,
  showSubjectCount,
  handleLogout = () => {},
  sortOnTable,
  checkUpdatedUserInfo,
}) => {
  const query = useQuery();
  const navigate = useNavigate();
  const iconRef = useRef();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [showLogOutButton, setShowLogOutButton] = useState(false);
  const [showMoreActions, setShowMoreActions] = useState(false);

  const [isUpdateInformation, setIsUpdateInformation] = useState(true);
  const { t, i18n } = useTranslation();

  const isUpdatedUser = localStorage.getItem("updatedU");

  useEffect(() => {
    if (isUpdatedUser) {
      setIsUpdateInformation(isUpdatedUser === "true");
    }
  }, [isUpdatedUser]);

  const onClose = useCallback(() => {
    setOpen(false);
  }, []);

  const refetchLessonPlans = useCallback(() => {
    if (tableDetails.length === 1) {
      let page = parseInt(query.get("page"));
      page > 1 && query.set("page", page - 1);
    }
    fetchLessonPlans();
  }, [tableDetails]);

  const fetchLessonPlans = useCallback(
    (orderColumn, order) => {
      let querySubjectId = parseInt(query.get("subjectName"));
      let selectedClass = parseInt(query.get("selectedClass"));
      let search = query.get("search");
      let page = parseInt(query.get("page"));

      let subjectId = query.has("search")
        ? querySubjectId
          ? querySubjectId
          : null
        : querySubjectId
        ? querySubjectId
        : 2;

      fetchLessonPlanTableDetails(
        i18n.language,
        subjectId,
        selectedClass ?? null,
        search ?? null,
        page ? page : 1,
        orderColumn ?? sortOnTable?.orderColumn,
        order ?? sortOnTable?.isOrder
      );
    },
    [query, i18n.language]
  );

  useEffect(() => {
    if (
      window.innerWidth <= 1120 &&
      (selectedSubjectId || serchBarInputValue)
    ) {
      return fetchResponsiveLessonPlanTableDetails({
        language: i18n.language,
        classs: selectedClassValueWithFilterPopUp, //click on the save button in the filter popUp
        favourites: activeHeart, // click on heart icon in header page
        isOrderAsc: false,
        orderBy: false,
        orderColumn: "date",
        page: 1,
        rowCount: showSubjectCount,
        selectedColumn: "",
        subjectId: selectedSubjectId, // click on subject elements icon or filter by subjects
        searchString: serchBarInputValue || searchBarWithFilterPopUp, // search with first search icon or search with keywords in filter popUp
      });
    } else if (window.innerWidth > 1120) {
      fetchLessonPlans();
    }
  }, [
    query,
    selectedClassValueWithFilterPopUp,
    activeHeart,
    selectedSubjectId,
    serchBarInputValue,
    searchBarWithFilterPopUp,
    showSubjectCount,
    i18n.language,
  ]);

  useEffect(() => {
    showCreate(false);
    showChangePage(false);
    fetchHomeDetails();
    setProfileEdit(false);
    setProfileDataForSidebar(true);
    getUsersAdminPage({});
    getNewNotificationCount();
    checkUpdatedUserInfo();
    setValue("");
    navigate("/home?search=&page=1&subjectName=");
    return () => checkUpdatedUserInfo();
  }, []);

  const seeMoreLsnPlans = () => {
    setShowMoreActions(true);
    handleFormChange("showSubjectCount", showSubjectCount + 10);
    setTimeout(() => {
      setShowMoreActions(false);
    }, 1000);
  };

  const handleSearchBar = (value) => {
    const urlParams = new URLSearchParams();

    urlParams.set("search", value);
    urlParams.set("page", 1);
    navigate("/home?" + urlParams);
  };

  const handleChangeValue = useCallback((newValue) => {
    if (newValue === "") handleSearchBar(newValue);
    setValue(newValue);
  }, []);

  const handleToggleLsnPlanCard = () => {
    handleFormChange("showLsnPlansWithCards", !showLsnPlansWithCards);
  };

  const handleUserIconClick = () => {
    setShowLogOutButton((prev) => !prev);
  };

  const handleCloseInformationPopUp = () => setIsUpdateInformation(true);

  useOutsideClick(iconRef, () => {
    setShowLogOutButton(false);
  });
  return (
    <>
      {!isUpdateInformation ? (
        <UpdateInformationPopUp closePopUp={handleCloseInformationPopUp} />
      ) : null}
      <div className="header-mobile-home">
        <img
          src={require("../../img/GItserund_logo.svg").default}
          alt="stemgen-image"
        />
        <div ref={iconRef} id="Gello">
          <div
            className="header-mobile-profile-image"
            onClick={handleUserIconClick}
          >
            <img
              width={32}
              height={32}
              src={"/files/" + userId + "/" + imageName}
              onError={(e) => {
                e.target.error = null;
                e.target.src = require("../../img/defaultProfile.png").default;
              }}
            />
          </div>
          {showLogOutButton && (
            <LogOutPopUpByMobile handleLogout={handleLogout} />
          )}
        </div>
      </div>

      {window.innerWidth <= 1120 && <ResponsiveHeader />}

      <SearchBar
        open={open}
        setOpen={setOpen}
        callbackSearchBar={handleSearchBar}
        value={value}
        onChangeValue={handleChangeValue}
      >
        <Link to="/notifications/all">
          <div className="notification_container">
            <figure className="notification_figure">
              <NotificationIcon className="notification_icon" fill="red" />
              {showDot && <span className="notification_dot" />}
            </figure>
          </div>
        </Link>
        <LessonPlanViewToggle
          onToggleLsnPlanCard={handleToggleLsnPlanCard}
          lsnPlanToggleCard={showLsnPlansWithCards}
        />
      </SearchBar>

      {open ? <OpenLayout onClose={onClose} /> : <SliderOfImages />}
      <div
        id={window.innerWidth <= 1120 && "responsive-table-contaiener"}
        className="table-container table-container-mobile"
      >
        {showLsnPlansWithCards ? (
          <LessonPlanCardList list={tableDetails} />
        ) : (
          <Table
            canDelete={true}
            refetch={refetchLessonPlans}
            showProfileImage={true}
            tableDetails={tableDetails}
            onColumnSelect={fetchLessonPlans}
          />
        )}
        <div className="footer-container">
          <div className="pagination-mobile-display-none">
            <Pagination pageCount={pageCount} />
          </div>

          {window.innerWidth <= 1120 &&
            !showMoreActions &&
            (showSubjectCount <
            (tableDetails[0]?.count || tableDetails[0]?.lessonPlansCount) ? (
              <div style={{ display: "flex", justifyContent: "center" }}>
                <div className="see-more" onClick={seeMoreLsnPlans}>
                  <span>{t("Show more")}</span>
                </div>
              </div>
            ) : null)}
          {showMoreActions && (
            <div className="spinner_container">
              <div className="spinner" />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    pageCount: state.homeReducer.pageCount,
    tableDetails: state.homeReducer.tableDetails,
    lsnRowCount: state.formReducer.lsnRowCount,
    newNotificationCount: state.notificationReducer.newNotificationCount,
    showDot: state.notificationReducer.showDot,
    imageName: state.formReducer.imageName,
    userId: state.formReducer.userId,
    showLsnPlansWithCards: state.formReducer.showLsnPlansWithCards ?? true,
    activeHeart: state.formReducer.activeHeart ?? false,
    allSubjectsForResponsiveDesign:
      state.formReducer.allSubjectsForResponsiveDesign ?? [],
    checkedHeart: state.formReducer.checkedHeart ?? {},
    serchBarInputValue: state.formReducer.serchBarInputValue ?? "",
    selectedClassValueWithFilterPopUp:
      state.formReducer.selectedClassValueWithFilterPopUp ?? null,
    selectedSubjectId: state.formReducer.selectedSubjectId ?? null,
    searchBarWithFilterPopUp: state.formReducer.searchBarWithFilterPopUp ?? "",
    showSubjectCount: state.formReducer.showSubjectCount ?? 10,
    sortOnTable: state.formReducer.sortOnTable ?? {},
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    checkUpdatedUserInfo: () => dispatch(checkUpdatedUserInfo()),
    handleLogout: () => dispatch(handleLogout()),
    showCreate: (show) => dispatch(showLessonPlanCreate(show)),
    showChangePage: (show) => dispatch(showChangePage(show)),
    fetchHomeDetails: () => dispatch(fetchHomeDetails()),
    setProfileEdit: (isEditing) => dispatch(setProfileEdit(isEditing)),
    setProfileDataForSidebar: (showProfileData) =>
      dispatch(setProfileDataForSidebar(showProfileData)),
    fetchLessonPlanTableDetails: (
      language,
      id,
      classs,
      searchString,
      page,
      orderColumn,
      pageCount,
      callbackFunction
    ) =>
      dispatch(
        fetchLessonPlanTableDetails(
          language,
          id,
          classs,
          searchString,
          page,
          orderColumn,
          pageCount,
          callbackFunction
        )
      ),
    handleFormChange: (key, value) => dispatch(handleFormChange(key, value)),
    getUsersAdminPage: ({ page, pageCount, name }) =>
      dispatch(getUsersAdminPage({ page, pageCount, name })),
    getNewNotificationCount: () => dispatch(getNewNotificationCount()),
    fetchResponsiveLessonPlanTableDetails: ({
      language,
      subjectId,
      classs,
      searchString,
      page,
      orderColumn,
      rowCount,
      callbackFunction,
      favourites,
    }) =>
      dispatch(
        fetchResponsiveLessonPlanTableDetails({
          language,
          subjectId,
          classs,
          searchString,
          page,
          orderColumn,
          rowCount,
          callbackFunction,
          favourites,
        })
      ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
