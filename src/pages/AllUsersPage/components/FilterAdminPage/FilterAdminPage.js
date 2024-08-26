import "./FilterAdminPage.css";
import { connect } from "react-redux";
import Button from "../../../../components/Button/Button";
import React, { useCallback, useEffect } from "react";
import {
  getFilterArrAdminPage,
  changeAdminPageProperty,
  getClassesBySubjectId,
  getSubjects,
} from "../../../../store";
import { useQuery } from "../../../../hooks/useQuery";
import { SelectWithSearchHOC } from "../../../../components";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const FilterOnAdminPage = ({
  openOrCloseRightSidebar,
  classes,
  classItemInAdminPage,
  allRoles,
  changeAdminPageProperty,
  roleFilterInAdminPage,
  filterTheSubjectInAdminPage,
  getSubjects,
  getFilterArrAdminPage,
  subjects,
  setOpenFilter,
  searchText,
  setSearchText,
}) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  let checkDisableButtonOrNo =
    (classItemInAdminPage && classItemInAdminPage !== "") ||
    (roleFilterInAdminPage && roleFilterInAdminPage?.id) ||
    (filterTheSubjectInAdminPage && filterTheSubjectInAdminPage?.id);

  useEffect(() => {
    getSubjects();
  }, [i18n.language]);

  const query = useQuery();
  let page = parseInt(query.get("page"));

  const handleFilterClick = () => {
    if (checkDisableButtonOrNo) {
      getFilterArrAdminPage(
        i18n?.language,
        roleFilterInAdminPage?.id,
        filterTheSubjectInAdminPage?.id,
        classItemInAdminPage ?? null,
        page,
        searchText
      );
      navigate("/teacher-helpers?page=1");
    }
  };

  const handleClearFilter = () => {
    changeAdminPageProperty("roleFilterInAdminPage", {});
    changeAdminPageProperty("filterTheSubjectInAdminPage", {});
    changeAdminPageProperty("classItemInAdminPage", null);
    changeAdminPageProperty("searchText", "");
    setSearchText("");
    setOpenFilter(false);
    getFilterArrAdminPage(i18n?.language, null, null, null, page, "");
    navigate("/teacher-helpers?page=1");
  };

  const handleClickRoleOption = useCallback((role) => {
    changeAdminPageProperty("roleFilterInAdminPage", role);
  }, []);

  const handleClickSubjectOption = useCallback((subject) => {
    changeAdminPageProperty("filterTheSubjectInAdminPage", subject);
    changeAdminPageProperty("classItemInAdminPage", "");
  }, []);

  return (
    <div className="filter-component-in-admin-page">
      <div className="selects-on-filter-in-admin-page">
        <SelectWithSearchHOC
          optionLabelKey="name"
          optionUniqueKey="id"
          options={allRoles}
          onOptionClick={handleClickRoleOption}
          loading={false}
          readOnly={true}
          readOnlyStyle={{ top: 80 }}
          label={t("Role")}
          inputStyle={{
            width: !openOrCloseRightSidebar && "100%",
            transition: "0.2s",
          }}
          inputValue={roleFilterInAdminPage?.name}
        />

        <SelectWithSearchHOC
          optionLabelKey="name"
          optionUniqueKey="id"
          options={subjects}
          onOptionClick={handleClickSubjectOption}
          loading={false}
          readOnly={true}
          readOnlyStyle={{ top: 80 }}
          label={t("Subject")}
          inputValue={filterTheSubjectInAdminPage?.name}
          inputStyle={{
            width: !openOrCloseRightSidebar && "100%",
            transition: "0.2s",
          }}
        />
      </div>
      <div className="buttons-container-on-filter-admin-page">
        <span onClick={handleClearFilter}>{t("Reset")}</span>
        <Button
          disabled={!checkDisableButtonOrNo}
          className={
            !checkDisableButtonOrNo
              ? "disable-button-on-message-window-admin-page"
              : "button-on-message-window-admin-page"
          }
          title={t("Confirm")}
          onClick={handleFilterClick}
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    openOrCloseRightSidebar: state.adminPageReducer.openOrCloseRightSidebar,
    classes: state.adminPageReducer.classes,
    allRoles: state.adminPageReducer.allRoles,
    classItemInAdminPage: state.adminPageReducer.classItemInAdminPage,
    roleFilterInAdminPage: state.adminPageReducer.roleFilterInAdminPage,
    filterTheSubjectInAdminPage:
      state.adminPageReducer.filterTheSubjectInAdminPage,
    subjects: state.lessonPlanReducer.subjects,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getClassesBySubjectId: (id) => dispatch(getClassesBySubjectId(id)),
    getSubjects: (id) => dispatch(getSubjects(id)),
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

export const FilterAdminPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(FilterOnAdminPage);
