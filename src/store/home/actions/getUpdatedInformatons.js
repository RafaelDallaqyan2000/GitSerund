import axios from "axios";
import { handleFormChange } from "../../form/actions";
import { fetchRegionsRequest } from "../../locations/actions/fetchRegions";

export const getDistricts = () => {
  return (dispatch) => {
    dispatch(fetchRegionsRequest());
    axios
      .get("/api/districts")
      .then((data) => {
        if (data.data.success) {
          dispatch(handleFormChange("districts", data.data.districts));
        }
        return data.data.districts;
      })
      .catch((error) => {
        console.log(error);
        return error;
      });
  };
};

export const getRegions = (districtId) => {
  return (dispatch) => {
    axios
      .get(`/api/regions/${districtId}`)
      .then((data) => {
        if (data.data.success) {
          dispatch(handleFormChange("regions", data.data.regions));
        }
        return data.data.regions;
      })
      .catch((error) => {
        console.log(error);
        return error;
      });
  };
};

export const getCommunitiesByRegionId = (regionId) => {
  return (dispatch) => {
    axios
      .get(`/api/communitiesByRegion/${regionId}`)
      .then((data) => {
        if (data.data.success) {
          dispatch(handleFormChange("communities", data.data.communities));
        }
        return data.data.communities;
      })
      .catch((error) => {
        console.log(error);
        return error;
      });
  };
};

export const getSchoolsByCommunity = (communityId) => {
  return (dispatch) => {
    axios
      .get(`/api/schoolsByCommunity/${communityId}`)
      .then((data) => {
        if (data.data.success) {
          dispatch(handleFormChange("schools", data.data.schools));
        }
      })
      .catch((error) => {
        console.log(error);
        return error;
      });
  };
};

export const postSchoolIdForUpdated = (schoolId) => {
  return (dispatch) => {
    axios
      .post(`/api/user/emis/data/school`, { schoolId })
      .then((data) => {
        dispatch(handleFormChange("updatedUserInformation", true));
        return data.data;
      })
      .catch((error) => {
        console.log(error);
        return error;
      });
  };
};

export const checkUpdatedUserInfo = () => {
  return () => {
    axios
      .get(`/api/user/emis/data/isUpdated`)
      .then((data) => {
        if (!!data.data.success) {
          localStorage.setItem("updatedU", data.data.data);
        }
      })
      .catch((error) => {
        console.log(error);
        return error;
      });
  };
};
