import "../register.css";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/Button/Button";
import {
  fetchCommunitiesByRegion,
  getDistricts,
  getSubjects,
  handleFormChange,
  fetchSubjectsAndClasses,
  getRegions,
  getCommunitiesByRegionId,
  getSchoolsByCommunity,
} from "../../../store";
import { SelectWithSearchHOC } from "../../../components";
import { AddSubjects } from "./AddSubjects";
import { useTranslation } from "react-i18next";

export const SchoolRegister = ({
  getDistricts,
  getRegions,
  getCommunitiesByRegionId,
  regions,
  districts,
  communities,
  schools,
  getSubjects,
  subjects,
  fetchSubjectsAndClasses,
  subjectsAndClasses,
  handleFormChange,
  selectedDistrict,
  selectedRegion,
  selectedCommunity,
  selectedSchool,
  getSchoolsByCommunity,
  selectedSubjectId,
  selectedSecondSubjectId,
}) => {
  let navigate = useNavigate();
  const [disabled, setDisabled] = useState(true);
  const { t, i18n } = useTranslation();
  const districtSelectStyle = { width: "100%", cursor: "pointer" };

  useEffect(() => {
    getDistricts();
    getSubjects();
  }, []);

  useEffect(() => {
    fetchSubjectsAndClasses(i18n.language);
  }, [i18n.language]);

  useEffect(() => {
    setDisabled(
      !(
        selectedDistrict?.id &&
        selectedCommunity?.id &&
        selectedSchool?.id &&
        subjects?.length
      )
    );
  }, [
    selectedDistrict?.id,
    selectedCommunity?.id,
    selectedSchool?.id,
    subjects?.length,
  ]);

  const handleClickDistrictsOption = useCallback((district) => {
    handleFormChange("selectedDistrict", district);

    handleFormChange("selectedRegion", {});
    handleFormChange("selectedCommunity", {});
    handleFormChange("selectedSchool", {});

    getRegions(district.id);
  }, []);

  const handleClickRegionsOption = useCallback((region) => {
    handleFormChange("selectedRegion", region);

    handleFormChange("selectedCommunity", {});
    handleFormChange("selectedSchool", {});

    getCommunitiesByRegionId(region.id);
  }, []);

  const handleClickCommunityOption = useCallback((community) => {
    handleFormChange("selectedCommunity", community);

    handleFormChange("selectedSchool", {});

    getSchoolsByCommunity(community?.id);
  }, []);

  const handleClickSchoolOption = useCallback((school) => {
    handleFormChange("selectedSchool", school);
  }, []);

  const regionSelectStyle = {
    background: !selectedDistrict?.name && "#ECEEF0",
    width: "100%",
    cursor: !selectedDistrict?.name ? "pointer" : "not-allowed",
  };
  const communitySelectStyle = {
    background: !selectedDistrict?.name && "#ECEEF0",
    width: "100%",
    cursor: !selectedDistrict?.name ? "pointer" : "not-allowed",
  };
  const schoolSelectStyle = {
    width: "100%",
    background: !selectedCommunity?.name && "#ECEEF0",
    cursor: selectedCommunity?.name ? "pointer" : "not-allowed",
  };

  const filterSubjects = subjectsAndClasses?.filter((e) => !e.isOther);
  const isOthersSubjects = subjectsAndClasses?.filter((e) => e.isOther);

  if (subjectsAndClasses?.filter((e) => !e.isOther)) {
    filterSubjects?.push({
      id: 1111,
      name: t("More"),
      startOthers: true,
      isOther: false,
      subArray: [],
    });
    filterSubjects?.push(...isOthersSubjects);
  }

  const hanldeClickNextPage = () => {
    const selectedSubjects = subjects.filter((e) => e.id);
    handleFormChange("subjects", selectedSubjects);
    navigate(`/register/second-step`);
  };

  return (
    <div className="register_form register_form-mobile">
      <form className="formplace">
        <div className="form_title form_title-mobile-register">
          <p className="register_title">{t("Sign Up")}</p>
        </div>
        <div className="form_subtitle">
          <p className="register_school">{t("School information")}</p>
        </div>
        <SelectWithSearchHOC
          optionLabelKey="name"
          optionUniqueKey="id"
          options={districts}
          onOptionClick={handleClickDistrictsOption}
          loading={false}
          label={t("Marz")}
          placeholder={t("Select")}
          inputValue={selectedDistrict?.name}
          inputStyle={districtSelectStyle}
          readOnly={true}
        />
        <SelectWithSearchHOC
          optionLabelKey="name"
          optionUniqueKey="id"
          options={regions}
          onOptionClick={handleClickRegionsOption}
          loading={false}
          label={t("Community / Administrative district")}
          placeholder={t("Select")}
          inputValue={selectedRegion?.name}
          disabled={!selectedDistrict?.name}
          disabledBackground="#ECEEF0"
          inputStyle={regionSelectStyle}
          readOnly={true}
        />
        <SelectWithSearchHOC
          optionLabelKey="name"
          optionUniqueKey="id"
          options={communities}
          onOptionClick={handleClickCommunityOption}
          loading={false}
          label={t("City / Village")}
          placeholder={t("Select")}
          inputValue={selectedCommunity?.name}
          disabled={!selectedRegion?.name}
          disabledBackground="#ECEEF0"
          inputStyle={communitySelectStyle}
          readOnly={true}
        />
        <SelectWithSearchHOC
          optionLabelKey="name"
          optionUniqueKey="id"
          options={schools}
          onOptionClick={handleClickSchoolOption}
          loading={false}
          placeholder={t("Select")}
          label={t("School")}
          disabled={!selectedCommunity?.name}
          disabledBackground="#ECEEF0"
          inputValue={selectedSchool?.name}
          inputStyle={schoolSelectStyle}
          readOnly={true}
        />

        <AddSubjects />

        <div>
          <Button
            onClick={hanldeClickNextPage}
            className="mt-20 done-btn-register"
            disabled={disabled}
            title={t("Continue")}
          />
        </div>
        <div className="btn_div"></div>
        <div className="reg_page">
          <p className="register-pages">
            <span className="register-current-page">1</span>
            /3
          </p>
        </div>
        <div className="bottom-text-register-web">
          <p>© 2020-2021 AUA.am</p>
        </div>
      </form>
      <div className="bottom-text-register-mobile">
        <p>© 2020-2021 AUA.am</p>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    subjectsAndClasses: state.changePageReducer.subjectsAndClasses ?? [],
    subjects: state.formReducer.subjects ?? [],

    selectedDistrict: state.formReducer.selectedDistrict ?? {},
    selectedRegion: state.formReducer.selectedRegion ?? {},
    selectedCommunity: state.formReducer.selectedCommunity ?? {},
    selectedSchool: state.formReducer.selectedSchool ?? {},
    selectedSubjectId: state.formReducer.selectedSubjectId ?? "",
    selectedSecondSubjectId: state.formReducer.selectedSecondSubjectId ?? "",

    districts: state.formReducer.districts,
    regions: state.formReducer.regions,
    communities: state.formReducer.communities,
    schools: state.formReducer.schools,

    regionId: state.formReducer.regionId,
    communityOnRegisterPage: state.formReducer.communityOnRegisterPage,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getDistricts: (callback) => dispatch(getDistricts(callback)),
    getRegions: (districtId) => dispatch(getRegions(districtId)),
    getSchoolsByCommunity: (communityId) =>
      dispatch(getSchoolsByCommunity(communityId)),
    getCommunitiesByRegionId: (regionId) =>
      dispatch(getCommunitiesByRegionId(regionId)),

    fetchCommunitiesByRegion: (callback) =>
      dispatch(fetchCommunitiesByRegion(callback)),
    getSubjects: () => dispatch(getSubjects()),
    fetchSubjectsAndClasses: (language) =>
      dispatch(fetchSubjectsAndClasses(language)),
    handleFormChange: (key, value) => dispatch(handleFormChange(key, value)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SchoolRegister);
