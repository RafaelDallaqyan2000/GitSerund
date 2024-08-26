import "./FilterPopUp.css";
import React, { useEffect, useRef, useState } from "react";
import { SelectWithSearchHOC } from "../../SelectWithSearchHOC";
import { connect } from "react-redux";
import {
  getClassesBySubjectId,
  handleFormChange,
  getAllClasses,
} from "../../../store";
import { useTranslation } from "react-i18next";

function FilterPopUpComponent({
  onClose = () => {},
  getClassesBySubjectId,
  classes,
  allClasses,
  handleFormChange,
  allSubjectsForResponsiveDesign,
  previousSearchValue,
  searchBarWithFilterPopUp,
  selectedSubjectId,
  checkedResponsiveSubject,
  selectedClassValueWithFilterPopUp,
}) {
  const [checkedSubject, setCheckedSubject] = useState({});
  const [checkedClass, setCheckedClass] = useState({
    name: selectedClassValueWithFilterPopUp,
  });
  const [search, setSearch] = useState(searchBarWithFilterPopUp);
  const { t } = useTranslation();

  const defaultSubject = allSubjectsForResponsiveDesign[0]?.isOther
    ? allSubjectsForResponsiveDesign.find((e) => !e.isOther)
    : allSubjectsForResponsiveDesign[0];

  useEffect(() => {
    if (allSubjectsForResponsiveDesign.length) {
      const checkSub = allSubjectsForResponsiveDesign?.find(
        (e) => e?.id === +selectedSubjectId
      );

      const checkForSubject = allSubjectsForResponsiveDesign[0].isOther
        ? { name: t("Select") }
        : allSubjectsForResponsiveDesign[0];

      setCheckedSubject(checkSub ?? checkForSubject);

      getClassesBySubjectId(checkSub?.id ?? defaultSubject?.id);

      if (!Object.keys(selectedClassValueWithFilterPopUp)?.length) {
        setCheckedClass({ name: selectedClassValueWithFilterPopUp });
      }
    }
  }, [allSubjectsForResponsiveDesign, checkedResponsiveSubject?.id]);

  useEffect(() => {
    if (selectedClassValueWithFilterPopUp) {
      const checkClass = classes?.find(
        (e) => e?.name === selectedClassValueWithFilterPopUp
      );
      setCheckedClass({ name: checkClass?.name });
    }
  }, [selectedClassValueWithFilterPopUp]);

  useEffect(() => {
    if (previousSearchValue) {
      setSearch(previousSearchValue);
    }
  }, [previousSearchValue]);

  const handleSubjectCheck = (e) => {
    setCheckedSubject(e);
    setCheckedClass("");
    getClassesBySubjectId(e.id);
  };

  const handleClassCheck = (e) => {
    setCheckedClass(e);
  };

  const handleSearch = (e) => {
    e.preventDefault();

    handleFormChange("serchBarInputValue", ""); // another search input value
    handleFormChange("showInputSearch", false); // another search input value

    handleFormChange(
      "selectedClassValueWithFilterPopUp",
      checkedClass?.name ?? null
    );
    handleFormChange("searchBarWithFilterPopUp", search); // search value
    handleFormChange("selectedSubjectId", checkedSubject?.id);
    handleFormChange("activeSearch", false);

    if (search || checkedClass?.name) {
      handleFormChange("activeFilter", true);
      handleFormChange("activeHeart", false);
      handleFormChange("checkedFilter", {
        backgroundColor: "#3A4E8A",
        opacity: 0.5,
      });
    }

    handleFormChange("checkedResponsiveSubject", checkedSubject);

    return onClose();
  };

  const handleCancel = (e) => {
    e.preventDefault();

    handleFormChange("selectedSubjectId", defaultSubject?.id);
    handleFormChange("checkedResponsiveSubject", defaultSubject);

    handleFormChange("activeFilter", false);
    handleFormChange("previousSearchValue", "");
    handleFormChange("selectedClassValueWithFilterPopUp", null);
    handleFormChange("searchBarWithFilterPopUp", "");
    setSearch("");
    return onClose();
  };

  const handleChangeSearch = (e) => {
    setSearch(e.target.value);
  };

  return (
    <form onSubmit={handleSearch} className="responsiveFilterPopUpContainer">
      <SelectWithSearchHOC
        optionLabelKey="name"
        optionUniqueKey="id"
        options={allSubjectsForResponsiveDesign}
        onOptionClick={handleSubjectCheck}
        loading={false}
        readOnly={true}
        readOnlyStyle={{ top: 80 }}
        label={t("Subject")}
        inputValue={checkedSubject?.name}
        labelStyle={{ marginTop: 8 }}
        labelClassName="responsiveLabelForFilter"
        inputClassName="responsiveInputClassName"
      />

      <SelectWithSearchHOC
        optionLabelKey="name"
        optionUniqueKey="id"
        options={classes.length ? classes : allClasses}
        onOptionClick={handleClassCheck}
        loading={false}
        readOnly={true}
        readOnlyStyle={{ top: 80 }}
        label={t("Grade")}
        inputValue={checkedClass?.name}
        labelStyle={{ marginTop: 8 }}
        labelClassName="responsiveLabelForFilter"
        inputClassName="responsiveInputClassName"
        placeholder={t("Select")}
      />

      <div className="filterKeyWordsSearchContainer">
        <label className="responsiveLabelForFilter">{t("Keywords")}</label>
        <input
          className="responsiveFilterSearchInput"
          type="text"
          placeholder={t("E.g. Function")}
          value={search}
          onChange={handleChangeSearch}
        />
      </div>

      <div className="responsiveFooterFromFilter">
        <button type="button" onClick={handleCancel} className="cancel_btn">
          {t("Reset")}
        </button>
        <button
          type="submit"
          className="responsiveFilterCancelBtn"
          onClick={handleSearch}
        >
          {t("Confirm")}
        </button>
      </div>
    </form>
  );
}

const mapStateToProps = (state) => {
  return {
    classes: state.lessonPlanReducer.classes ?? [],
    allClasses: state.adminPageReducer.classes ?? [],
    classItemInAdminPage: state.adminPageReducer.classItemInAdminPage,
    allSubjectsForResponsiveDesign:
      state.formReducer.allSubjectsForResponsiveDesign ?? [],
    previousSearchValue: state.formReducer.previousSearchValue ?? "",
    searchBarWithFilterPopUp: state.formReducer.searchBarWithFilterPopUp ?? "",
    selectedSubjectId: state.formReducer.selectedSubjectId ?? "",
    checkedResponsiveSubject: state.formReducer.checkedResponsiveSubject ?? {},
    selectedClassValueWithFilterPopUp:
      state.formReducer.selectedClassValueWithFilterPopUp ?? {},
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getClassesBySubjectId: (id) => dispatch(getClassesBySubjectId(id)),
    getAllClasses: (subjectId) => dispatch(getAllClasses(subjectId)),
    handleFormChange: (key, value) => dispatch(handleFormChange(key, value)),
  };
};

export const FilterPopUp = connect(
  mapStateToProps,
  mapDispatchToProps
)(FilterPopUpComponent);
