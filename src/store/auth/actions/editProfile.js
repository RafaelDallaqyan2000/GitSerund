import { fetchProfileDetails, handleFormChange } from "../..";
import { EDIT_PROFILE_SUCCESS, EDIT_PROFILE_FAILURE } from "../types";

export const editProfile = (reg) => {
  const formData = new FormData();
  formData.append("schoolId", reg.schoolId ?? null);
  formData.append("fullName", reg.fullName ?? null);
  formData.append("specializationId", reg.specializationId ?? null);
  formData.append("educationId", reg.educationId ?? null);
  formData.append("email", reg.email ?? null);
  formData.append("phone_code", reg.phone_code ?? null);
  formData.append("phone_number", reg.phone_number ?? null);
  formData.append("image", reg.image ?? null);
  formData.append("imageName", reg.imageName ?? null);
  formData.append("imageUrl", reg.imageUrl ?? null);
  formData.append("subjectIds", JSON.stringify(reg.subjects ?? null));
  formData.append("language", localStorage.getItem("language"));

  return (dispatch) => {
    fetch("/auth/userData/edit", {
      method: "POST",
      body: formData,
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.success) {
          dispatch(fetchProfileDetails(localStorage.getItem("language")));
          dispatch(
            handleFormChange(
              "checkUpdateFixedInformationAboutUser",
              (reg?.checkUpdateFixedInformationAboutUser ?? 0) + 1
            )
          );
          dispatch(
            editProfileSuccess({
              type: "success",
              title: reg.language === "am" ? "Կատարվել է" : "Done",
              text:
                data.message ||
                (reg.language === "am"
                  ? "Փոփոխված է։"
                  : "It has been changed."),
            })
          );
        } else {
          dispatch(
            editProfileFailure({
              type: "fail",
              title: reg.language === "am" ? "Սխալ" : "Error",
              text:
                data.message || reg.language === "am"
                  ? "Ինչ-որ բան այն չէ։"
                  : "Something is wrong.",
            })
          );
        }
      })
      .catch((error) => {
        throw error;
      });
  };
};

const editProfileSuccess = (details) => {
  return {
    type: EDIT_PROFILE_SUCCESS,
    payload: {
      details,
    },
  };
};

const editProfileFailure = (details) => {
  return {
    type: EDIT_PROFILE_FAILURE,
    payload: {
      details,
    },
  };
};
