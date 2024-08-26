import "./AllUsersPage.css";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { SearchInput, MessagePopUp } from "../../components";
import UsersTable from "./components/UsersTable/UsersTable";
import {
  changeAdminPageProperty,
  getUserRoles,
  getFilterArrAdminPage,
  putUserRoles,
} from "../../store";
import Pagination from "../../components/Pagination";
import { useQuery } from "../../hooks/useQuery";
import { FilterAdminPage } from "./components/FilterAdminPage/FilterAdminPage";
import { SendAdminMessageWindow } from "./components/SendAdminMessageWindow/SendAdminMessageWindow";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

function AllUsersPage({
  allUsers,
  getUserRoles,
  getFilterArrAdminPage,
  classItemInAdminPage,
  roleFilterInAdminPage,
  filterTheSubjectInAdminPage,
  checkedUsers,
  changeAdminPageProperty,
}) {
  const { t, i18n } = useTranslation();
  const [searchValue, setSearchValue] = useState("");
  const [openFilter, setOpenFilter] = useState(false);
  const [openSendMessageWindow, setOpenSendMessageWindow] = useState(false);
  const [showPopUpMessage, setShowPopUpMessage] = useState(false);
  const query = useQuery();
  const navigate = useNavigate();
  let page = +query.get("page") ?? 1;
  let pageCount = Math.ceil(allUsers[0]?.userCount / 8);

  useEffect(() => {
    getUserRoles(i18n.language);
    navigate("/teacher-helpers?page=1");
  }, [i18n.language]);

  useEffect(() => {
    if (allUsers.length === 0) {
      return getFilterArrAdminPage(i18n.language);
    }

    if (page !== 0) {
      getFilterArrAdminPage(
        i18n.language,
        roleFilterInAdminPage?.id,
        filterTheSubjectInAdminPage?.id,
        classItemInAdminPage?.id,
        page,
        searchValue
      );
    }
  }, [query, i18n.language]);

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);

    if (e.target.value === "") {
      getFilterArrAdminPage(
        i18n.language,
        roleFilterInAdminPage?.id,
        filterTheSubjectInAdminPage?.id,
        classItemInAdminPage?.id,
        page,
        null
      );
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getFilterArrAdminPage(
      i18n.language,
      roleFilterInAdminPage?.id,
      filterTheSubjectInAdminPage?.id,
      classItemInAdminPage?.id,
      page,
      searchValue
    );
  };

  const handleClickFilterIcon = () => {
    setOpenFilter(!openFilter);
    setOpenSendMessageWindow(false);
  };

  const handleClickMessageIcon = () => {
    setOpenFilter(false);
    setOpenSendMessageWindow(!openSendMessageWindow);
  };
  const callbackSendMessage = () => {
    setOpenSendMessageWindow(false);
    setShowPopUpMessage(true);
    changeAdminPageProperty("checkedUsers", []);
    setTimeout(() => {
      setShowPopUpMessage(false);
    }, 2500);
  };

  return (
    <div className="assistants-page-container">
      <MessagePopUp
        onClosePopup={setShowPopUpMessage}
        title={t("Done")}
        open={showPopUpMessage}
        styleCancelBtn={{
          background: "linear-gradient(83.13deg, #6FD89C 0%, #46B776 100%)",
          color: "#FFF",
        }}
        text={t("The notification has been sent successfully.")}
        styleText={{ textAlign: "center" }}
        popUpContainerStyles={{ top: "50%" }}
      />
      <div
        style={{ marginLeft: "64px" }}
        className="search-and-filter-container"
      >
        <SearchInput
          id={15}
          placeholder={t("search")}
          onChange={handleSearchChange}
          inputValue={searchValue ?? ""}
          onSubmit={handleSubmit}
          filter={true}
          inputContainerStyle={{ width: "500px" }}
        >
          <div
            className="filter-on-search-input"
            onClick={handleClickFilterIcon}
          >
            <img
              src={
                require(openFilter
                  ? "../../img/blueFilter.svg"
                  : "../../img/filter.svg").default
              }
            />
          </div>
          <div
            className="message-window-style"
            onClick={handleClickMessageIcon}
            style={{
              backgroundColor: openSendMessageWindow ? "#6c7aa7" : "#FFF",
            }}
          >
            <img
              src={
                require(openSendMessageWindow
                  ? "../../img/allUsersPageImages/mail.svg"
                  : "../../img/allUsersPageImages/grayMail.svg").default
              }
            />
          </div>
        </SearchInput>
        {openFilter && (
          <FilterAdminPage
            setOpenFilter={setOpenFilter}
            searchText={searchValue}
            setSearchText={setSearchValue}
          />
        )}
        {openSendMessageWindow && (
          <SendAdminMessageWindow
            setShowPopUpMessage={setShowPopUpMessage}
            checkedUsers={checkedUsers}
            setOpenMessageWindow={setOpenSendMessageWindow}
            openMessageWindow={openSendMessageWindow}
            callbackFunction={callbackSendMessage}
          />
        )}
      </div>
      <UsersTable page={page} users={allUsers} searchValue={searchValue} />
      {pageCount ? <Pagination pageCount={pageCount} /> : null}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    allUsers: state.adminPageReducer.allUsers ?? [],
    openOrCloseRightSidebar: state.adminPageReducer.openOrCloseRightSidebar,
    classes: state.adminPageReducer.classes,
    allRoles: state.adminPageReducer.allRoles,
    classItemInAdminPage: state.adminPageReducer.classItemInAdminPage,
    roleFilterInAdminPage: state.adminPageReducer.roleFilterInAdminPage,
    filterTheSubjectInAdminPage:
      state.adminPageReducer.filterTheSubjectInAdminPage,
    subjects: state.lessonPlanReducer.subjects,
    checkedUsers: state.adminPageReducer.checkedUsers,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUserRoles: (language) => dispatch(getUserRoles(language)),
    putUserRoles: (userId, roleId) => dispatch(putUserRoles(userId, roleId)),
    changeAdminPageProperty: (key, value) =>
      dispatch(changeAdminPageProperty(key, value)),
    getFilterArrAdminPage: (
      language,
      userTypeId,
      subjectId,
      classId,
      page,
      searchText,
      pageCount
    ) =>
      dispatch(
        getFilterArrAdminPage(
          language,
          userTypeId,
          subjectId,
          classId,
          page,
          searchText,
          pageCount
        )
      ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllUsersPage);
