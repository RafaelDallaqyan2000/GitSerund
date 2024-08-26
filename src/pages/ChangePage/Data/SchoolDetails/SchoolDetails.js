import "./SchoolDetails.css";
import "../Data.css";
import "../../../Home/RecentAdditions/RecentAdditions.css";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { connect } from "react-redux";
import {
  cleanForm,
  fetchCommunitiesByRegion,
  fetchSchoolsByCommunity,
  getDistricts,
  getRegions,
  handleFormChange,
} from "../../../../store";
import { SelectWithSearchHOC } from "../../../../components";
import { useTranslation } from "react-i18next";

const SchoolDetails = ({
  userData,
  getDistricts,
  getRegions,
  districts,
  regions,
  selectedRegionId,
  districtId,
  fetchCommunitiesByRegion,
  communities,
  fetchSchoolsByCommunity,
  communityId,
  schools,
  handleFormChange,
  schoolId,
  setEditInfo = () => {},
  inProfilePage,
  checkUpdateFixedInformationAboutUser,
  districtValue,
  regionValue,
  communityValue,
  schoolValue,
}) => {
  const [allDistricts, setAllDistricts] = useState(districts);
  const { t, i18n } = useTranslation();

  const fixedSchoolInformation = useMemo(() => {
    return {
      districtId,
      selectedRegionId: userData?.regionId,
      communityId,
      schoolId,
    };
  }, [
    checkUpdateFixedInformationAboutUser,
    inProfilePage,
    Object?.keys(userData ?? {})?.length,
  ]);

  const checkedInformationChange = {
    districtId,
    selectedRegionId,
    communityId,
    schoolId,
  };

  useEffect(() => {
    setEditInfo(
      JSON.stringify(fixedSchoolInformation) !==
        JSON.stringify(checkedInformationChange)
    );

    for (let i = 0; i < Object.keys(checkedInformationChange).length; i++) {
      if (!Object.values(checkedInformationChange)[i]) {
        setEditInfo(false);
      }
    }
  }, [Object.values(checkedInformationChange)?.length]);

  useEffect(() => {
    getDistricts();
  }, []);

  useEffect(() => {
    if (districtId && selectedRegionId) {
      getRegions(districtId);
    }
  }, [districtId && selectedRegionId]);

  useEffect(() => {
    if (selectedRegionId) {
      fetchCommunitiesByRegion(
        () => fetchSchoolsByCommunity(communityId),
        selectedRegionId
      );
    }
  }, [districtId, districts?.length, selectedRegionId, regions?.length]);

  const handleClickDistrict = useCallback((district) => {
    setEditInfo(false);
    handleFormChange("districtId", district.id);
    handleFormChange("selectedRegionId", "");
    handleFormChange("communityId", "");
    handleFormChange("schoolId", "");
    handleFormChange("regions", []);
    handleFormChange("communities", []);
    handleFormChange("schools", []);

    handleFormChange("districtValue", district?.name);
    handleFormChange("regionValue", "");
    handleFormChange("communityValue", "");
    handleFormChange("schoolValue", "");

    getRegions(district.id);
  }, []);

  const handleClickRegion = useCallback((region) => {
    setEditInfo(false);
    handleFormChange("selectedRegionId", region.id);
    handleFormChange("communityId", "");
    handleFormChange("schoolId", "");
    handleFormChange("communities", []);
    handleFormChange("schools", []);

    handleFormChange("regionValue", region?.name);
    handleFormChange("communityValue", "");
    handleFormChange("schoolValue", "");
    fetchCommunitiesByRegion(() => {}, region.id);
  }, []);

  const handleClickCommunity = useCallback((community) => {
    setEditInfo(false);

    handleFormChange("communityId", community.id);
    handleFormChange("schoolId", "");
    handleFormChange("schools", []);

    handleFormChange("communityValue", community.name);
    handleFormChange("schoolValue", "");
    fetchSchoolsByCommunity(community.id);
  }, []);

  const handleClickSchool = useCallback((school) => {
    setEditInfo(true);
    handleFormChange("schoolId", school.id);

    handleFormChange("schoolValue", school.name);
  }, []);

  useEffect(() => {
    if (districts?.length) {
      setAllDistricts(districts);
    }
  }, [districts]);

  return (
    <>
      <SelectWithSearchHOC
        optionLabelKey="name"
        optionUniqueKey="id"
        options={allDistricts}
        onOptionClick={handleClickDistrict}
        loading={false}
        label={t("Marz")}
        placeholder={t("Select")}
        inputValue={
          districtValue ||
          allDistricts?.find((district) => district?.id === districtId)?.name
        }
        inputStyle={{ width: "100%", border: "1px solid #93c7ff" }}
      />

      <SelectWithSearchHOC
        optionLabelKey="name"
        optionUniqueKey="id"
        options={regions}
        onOptionClick={handleClickRegion}
        loading={false}
        placeholder={t("Select")}
        inputValue={
          regionValue ||
          regions?.find((region) => region.id === selectedRegionId)?.name
        }
        label={t("Community / Administrative district")}
        inputStyle={{ width: "100%", border: "1px solid #93c7ff" }}
      />

      <SelectWithSearchHOC
        optionLabelKey="name"
        optionUniqueKey="id"
        options={communities}
        onOptionClick={handleClickCommunity}
        loading={false}
        placeholder={t("Select")}
        inputValue={
          communityValue ||
          communities?.find((community) => community.id === communityId)?.name
        }
        label={t("City / Village")}
        inputStyle={{ width: "100%", border: "1px solid #93c7ff" }}
      />

      <SelectWithSearchHOC
        optionLabelKey="name"
        optionUniqueKey="id"
        options={schools}
        onOptionClick={handleClickSchool}
        loading={false}
        placeholder={t("Select")}
        inputValue={
          schoolValue || schools?.find((school) => school.id === schoolId)?.name
        }
        label={t("School")}
        inputStyle={{ width: "100%", border: "1px solid #93c7ff" }}
      />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    userData: state.formReducer.userData,
    districts: state.formReducer.districts,
    regions: state.formReducer.regions,
    selectedRegionId: state.formReducer.selectedRegionId,
    districtId: state.formReducer.districtId,
    communities: state.formReducer.communities,
    communityId: state.formReducer.communityId,
    schools: state.formReducer.schools,
    schoolId: state.formReducer.schoolId,
    showLeftSideBar: state.formReducer.showLeftSideBar,
    checkUpdateFixedInformationAboutUser:
      state.formReducer.checkUpdateFixedInformationAboutUser ?? 0,
    inProfilePage: state.formReducer.inProfilePage,

    districtValue: state.formReducer.districtValue ?? "",
    regionValue: state.formReducer.regionValue ?? "",
    communityValue: state.formReducer.communityValue ?? "",
    schoolValue: state.formReducer.schoolValue ?? "",
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleFormChange: (key, name) => dispatch(handleFormChange(key, name)),
    getDistricts: (callback) => dispatch(getDistricts(callback)),
    getRegions: (districtId) => dispatch(getRegions(districtId)),
    fetchCommunitiesByRegion: (callback, regionId) =>
      dispatch(fetchCommunitiesByRegion(callback, regionId)),
    fetchSchoolsByCommunity: (communityId) =>
      dispatch(fetchSchoolsByCommunity(communityId)),
    cleanForm: () => dispatch(cleanForm()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SchoolDetails);
