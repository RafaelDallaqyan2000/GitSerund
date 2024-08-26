import React from "react";
import { LessonPlanCard } from "../LessonPlanCard";
import { useNavigate } from "react-router-dom";
import { MessagePopUp } from "../MessagePopUp/MessagePopUp";
import { connect } from "react-redux";
import {
  fetchLessonPlanTableDetails,
  handleLsnPlanAndLsnProcChange,
} from "../../store";
import { deleteLessonPlan } from "../../store/lessonPlan/actions/deleteLessonPlan";
import { useQuery } from "../../hooks/useQuery";
import "./LessonPlanCardList.css";
import { useTranslation } from "react-i18next";

function LessonPlanCardListComponent({
  handleLsnPlanAndLsnProcChange,
  list,
  popupDetails,
  selectedId,
  deleteLessonPlan,
  fetchLessonPlanTableDetails,
}) {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const query = useQuery();

  if (!list) return null;

  const handleClickCardTitle = (id) => {
    window.open(`/show/lessonPlan/${id}`, "_blank");
  };

  const handleClickCardAvatar = (details) => {
    if (details.canViewProfile) {
      navigate(`/user-profile/${details.userId}`);
    }
  };

  const handleClosePopUp = () => {
    handleLsnPlanAndLsnProcChange("popupDetails", {
      text: "",
      type: "fail",
      title: "",
      cancelBtnTitle: "",
      submitBtnTitle: "",
      titleStyle: {},
      cancelBtnStyle: {},
    });
  };

  const callbackFunctionFromDeleteCard = () => {
    let subjectName = parseInt(query.get("subjectName"));
    let selectedClass = parseInt(query.get("selectedClass"));
    let search = query.get("search");
    let page = parseInt(query.get("page"));

    fetchLessonPlanTableDetails(
      i18n.language,
      query.has("search")
        ? subjectName
          ? subjectName
          : null
        : subjectName
        ? subjectName
        : 2,
      selectedClass ?? null,
      search ? search : null,
      page > 0 ? page : 1
    );
  };

  const handleDelete = () => {
    deleteLessonPlan(selectedId, callbackFunctionFromDeleteCard);
    handleLsnPlanAndLsnProcChange("selectedId", null);
  };

  return (
    <div style={{ flexWrap: "wrap", display: "flex" }}>
      {list?.map((lsnPlan) => {
        return (
          <LessonPlanCard
            key={lsnPlan.id}
            lsnPlan={lsnPlan}
            containerClassName={"lsn_plan_card_article_container"}
            containerStyle={{ cursor: "pointer" }}
            onTitleClick={handleClickCardTitle}
            onAvatarClick={handleClickCardAvatar}
          />
        );
      })}
      <MessagePopUp
        onClosePopup={handleClosePopUp}
        open={!!popupDetails.text}
        title={popupDetails.title}
        text={popupDetails.text}
        submitBtnTitle={popupDetails.submitBtnTitle}
        closeBtnTitle={popupDetails.cancelBtnTitle}
        onAlertCancelClick={handleClosePopUp}
        onAlertSubmitClick={handleDelete}
        styleCancelBtn={popupDetails.cancelBtnStyle}
        styleText={{ textAlign: "center" }}
        styletitle={popupDetails.titleStyle}
        popUpContainerStyles={{ top: "50%" }}
      />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    popupDetails: state.lessonPlanReducer.popupDetails,
    selectedId: state.lessonPlanReducer.selectedId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteLessonPlan: (lessonPlanId, callbackFunction) =>
      dispatch(deleteLessonPlan(lessonPlanId, callbackFunction)),
    handleLsnPlanAndLsnProcChange: (key, value) =>
      dispatch(handleLsnPlanAndLsnProcChange(key, value)),
    fetchLessonPlanTableDetails: (
      language,
      id,
      classs,
      searchString,
      page,
      pageCount
    ) =>
      dispatch(
        fetchLessonPlanTableDetails(
          language,
          id,
          classs,
          searchString,
          page,
          pageCount
        )
      ),
  };
};

export const LessonPlanCardList = connect(
  mapStateToProps,
  mapDispatchToProps
)(LessonPlanCardListComponent);
