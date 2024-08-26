import React, { useCallback, useRef, useState } from "react";
import editIcon from "../../../img/edit_bold.svg";
import { useOutsideClick } from "../../../hooks/useOutsideClick";
import { LessonPlanImageUploader } from "../../LessonPlanImageUploader";
import deleteIcon from "../../../img/delete_medium.svg";
import pencilIcon from "../../../img/pencil.svg";
import pictureIcon from "../../../img/pictureIcon.svg";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { deleteLessonPlan } from "../../../store/lessonPlan/actions/deleteLessonPlan";
import { handleLsnPlanAndLsnProcChange } from "../../../store";
import "./LessonPlanCardOptions.css";
import { useTranslation } from "react-i18next";

function LessonPlanCardOptionsComponent(props) {
  const { lsnPlan, handleLsnPlanAndLsnProcChange, canDelete } = props;

  const ref = useRef();
  const navigate = useNavigate();
  const [isOpenOptions, setIsOpenOptions] = useState(false);
  const [isOpenImageUploader, setIsOpenImageUploader] = useState(false);
  const { t } = useTranslation();

  const handleClickEditPicture = useCallback(() => {
    setIsOpenImageUploader(true);
  }, []);

  const handleCloseImageUploadModal = useCallback(() => {
    setIsOpenImageUploader(false);
  }, []);

  const handleOpenCloseOptions = useCallback(() => {
    setIsOpenOptions((prevState) => !prevState);
  }, []);

  const handleCloseOptions = () => {
    setIsOpenOptions(false);
  };

  const handleClickEditLessonPlan = useCallback(() => {
    navigate(`/edit/LessonPlan/${lsnPlan.id}`);
  }, []);

  const handleDeleteBtnClick = useCallback(() => {
    handleLsnPlanAndLsnProcChange("selectedId", lsnPlan.id);

    handleLsnPlanAndLsnProcChange("popupDetails", {
      title: t("Delete lesson plan"),
      text: t("Are you sure you want to delete the lesson plan?"),
      type: "fail",
      cancelBtnTitle: t("Cancel"),
      submitBtnTitle: t("Delete"),
      titleStyle: { color: "#EA6670" },
      cancelBtnStyle: {
        background: "#EEF1F6",
        color: "#8C8E92",
      },
    });
  }, [lsnPlan]);

  useOutsideClick(ref, handleCloseOptions);

  return (
    <>
      <div
        ref={ref}
        className="lsn_plan_card_options_container"
        onClick={handleOpenCloseOptions}
        title={t("Edit")}
      >
        <img src={editIcon} alt="edit" className="lsn_plan_card_options" />
        {isOpenOptions && (
          <div className="lsn_plan_card_options_modal">
            <div
              className="lsn_plan_card_options_item"
              onClick={handleClickEditPicture}
            >
              <img
                src={pictureIcon}
                alt="Edit picture"
                className="lsn_plan_card_options_icon"
              />
              <p className="lsn_plan_card_options_text">{t("Change Image")}</p>
            </div>

            <div
              className="lsn_plan_card_options_item"
              onClick={handleClickEditLessonPlan}
            >
              <img
                src={pencilIcon}
                alt={t("Edit")}
                className="lsn_plan_card_options_icon"
              />
              <p className="lsn_plan_card_options_text lsn_plan_card_options_text_blue">
                {t("Edit")}
              </p>
            </div>
            {!!canDelete && (
              <div
                className="lsn_plan_card_options_item"
                onClick={() => handleDeleteBtnClick(lsnPlan.id)}
              >
                <img
                  src={deleteIcon}
                  alt="Delete"
                  className="lsn_plan_card_options_icon"
                />
                <p className="lsn_plan_card_options_text lsn_plan_card_options_text_red">
                  {t("Remove")}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
      {isOpenImageUploader && (
        <LessonPlanImageUploader
          lessonPlan={lsnPlan}
          onClose={handleCloseImageUploadModal}
        />
      )}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    popupDetails: state.lessonPlanReducer.popupDetails,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    deleteLessonPlan: (lessonPlanId) =>
      dispatch(deleteLessonPlan(lessonPlanId)),
    handleLsnPlanAndLsnProcChange: (key, value) =>
      dispatch(handleLsnPlanAndLsnProcChange(key, value)),
  };
};

export const LessonPlanCardOptions = connect(
  mapStateToProps,
  mapDispatchToProps
)(LessonPlanCardOptionsComponent);
