import "./styles.css";
import ReactDOM from "react-dom";
import { GreenButton } from "../GreenButton";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { SelectWithSearchHOC } from "../SelectWithSearchHOC";
import {
  getDistricts,
  getRegions,
  getCommunitiesByRegionId,
  getSchoolsByCommunity,
  postSchoolIdForUpdated,
} from "../../store";
import { useTranslation } from "react-i18next";

function UpdateInformationPopUpComponent({
  getDistricts,
  getRegions,
  getCommunitiesByRegionId,
  getSchoolsByCommunity,
  closePopUp,
  districts,
  regions,
  communities,
  schools,
  postSchoolIdForUpdated,
  updatedUserInformation,
}) {
  const { t } = useTranslation();
  const [reg, setReg] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState({});
  const [selectedRegion, setSelectedRegion] = useState({});
  const [selectedCommunity, setSelectedCommunity] = useState({});
  const [selectedSchool, setSelectedSchool] = useState({});

  useEffect(() => {
    getDistricts();
  }, []);

  useEffect(() => {
    if (districts.length) {
      setReg(districts);
    }
  }, [districts]);

  const handleDistrictOptionClick = (option) => {
    getRegions(option?.id);

    setSelectedDistrict(option);
    setSelectedCommunity({});
    setSelectedSchool({});
    setSelectedRegion({});
  };

  const handleRegionOptionClick = (option) => {
    getCommunitiesByRegionId(option?.id);

    setSelectedRegion(option);
    setSelectedCommunity({});
    setSelectedSchool({});
  };

  const handleCommunityOptionClick = (option) => {
    getSchoolsByCommunity(option?.id);

    setSelectedCommunity(option);
    setSelectedSchool({});
  };

  const handleSubmitBtn = () => {
    if (
      selectedDistrict?.name &&
      selectedRegion?.name &&
      selectedCommunity?.name &&
      selectedSchool?.name
    ) {
      postSchoolIdForUpdated(selectedSchool.id);
    }
  };

  useEffect(() => {
    if (updatedUserInformation) {
      closePopUp();
    }
  }, [updatedUserInformation]);

  return ReactDOM.createPortal(
    <>
      <div className="popUpBackground" />
      <div className="popUpContainer">
        <h2>{t("Update the data")}</h2>

        <div className="inputsContainer">
          <SelectWithSearchHOC
            readOnly={true}
            label={t("Marz")}
            placeholder={t("Select")}
            optionLabelKey={"name"}
            optionUniqueKey={1}
            options={reg}
            inputValue={selectedDistrict.name}
            onOptionClick={handleDistrictOptionClick}
          />

          <SelectWithSearchHOC
            readOnly={true}
            label={t("Community / Administrative district")}
            placeholder={t("Select")}
            optionLabelKey={"name"}
            optionUniqueKey={2}
            options={regions}
            inputValue={selectedRegion.name}
            onOptionClick={handleRegionOptionClick}
            disabled={!selectedDistrict.name}
          />

          <SelectWithSearchHOC
            readOnly={true}
            label={t("City / Village")}
            placeholder={t("Select")}
            optionLabelKey={"name"}
            optionUniqueKey={3}
            options={communities}
            inputValue={selectedCommunity.name}
            onOptionClick={handleCommunityOptionClick}
            disabled={!selectedRegion.name}
          />

          <SelectWithSearchHOC
            readOnly={true}
            label={t("School")}
            placeholder={t("Select")}
            optionLabelKey={"name"}
            optionUniqueKey={4}
            options={schools}
            inputValue={selectedSchool.name}
            onOptionClick={(option) => setSelectedSchool(option)}
            disabled={!selectedCommunity.name}
          />

          <GreenButton
            disabled={!selectedSchool.name}
            style={{
              width: "100%",
              height: "50px",
              marginTop: "46px",
            }}
            onClick={handleSubmitBtn}
          >
            {t("Confirm")}
          </GreenButton>
        </div>
      </div>
    </>,
    document.getElementById("portal")
  );
}

const mapStateToProps = (state) => {
  return {
    districts: state.formReducer.districts ?? [],
    regions: state.formReducer.regions ?? [],
    communities: state.formReducer.communities ?? [],
    schools: state.formReducer.schools ?? [],
    updatedUserInformation: state.formReducer.updatedUserInformation ?? false,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getDistricts: () => dispatch(getDistricts()),
    getRegions: (districtId) => dispatch(getRegions(districtId)),
    getCommunitiesByRegionId: (regionId) =>
      dispatch(getCommunitiesByRegionId(regionId)),
    getSchoolsByCommunity: (communityId) =>
      dispatch(getSchoolsByCommunity(communityId)),
    postSchoolIdForUpdated: (schoolId) =>
      dispatch(postSchoolIdForUpdated(schoolId)),
  };
};

export const UpdateInformationPopUp = connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdateInformationPopUpComponent);
