import "./ResponsiveHeart.css";
import { connect } from "react-redux";
import { handleFormChange } from "../../store";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";

function ResponsiveHeartComponent({ handleFormChange, activeHeart }) {
  const { t } = useTranslation();

  const handleClick = useCallback(() => {
    handleFormChange("activeHeart", !activeHeart);

    handleFormChange("serchBarInputValue", "");
    handleFormChange("searchBarWithFilterPopUp", "");
    handleFormChange("activeSearch", false);
    handleFormChange("activeFilter", false);
    handleFormChange("selectedClassValueWithFilterPopUp", null);

    if (!activeHeart) {
      handleFormChange("checkedHeart", {
        name: t("Selected"),
        id: 777,
        gradientColor:
          "267deg, rgba(249, 91, 103, 0.80) 5.66%, rgba(247, 101, 93, 0.80) 70.6%, rgba(255, 176, 183, 0.80) 151.56%",
      });
    } else {
      handleFormChange("checkedHeart", {});
    }
  }, [activeHeart]);

  return (
    <div>
      <button
        className="responsiveHeartBtn"
        onClick={handleClick}
        style={{ backgroundColor: activeHeart && "#9DA6C4" }}
      >
        {activeHeart ? (
          <img
            src={require("../../img/responsiveDesign/white-heart.svg").default}
          />
        ) : (
          <img src={require("../../img/responsiveDesign/heart.svg").default} />
        )}
      </button>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    activeHeart: state.formReducer.activeHeart ?? false,
    checkedSubjectsWithClasses:
      state.formReducer.checkedSubjectsWithClasses ?? {},
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleFormChange: (key, value) => dispatch(handleFormChange(key, value)),
  };
};

export const ResponsiveHeart = connect(
  mapStateToProps,
  mapDispatchToProps
)(ResponsiveHeartComponent);
