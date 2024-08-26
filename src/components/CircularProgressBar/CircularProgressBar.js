import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router";
import store, { handleFormChange } from "../../store";
import "./CircularProgressBar.css";
import { MessagePopUp } from "../MessagePopUp/MessagePopUp";
import { useTranslation } from "react-i18next";

function CircularProgressBar({
  text,
  lessonPlansCount,
  lessPlans = 0,
  count = 14,
  truety,
}) {
  const { t } = useTranslation();
  const strokeWidth = 7;
  const [percentage, setPercentage] = useState(0);
  const [showPopUp, setShowPopUp] = useState("");
  const { lessonPlanId } = useParams();
  let lessonPlanMinute = localStorage.getItem("lessonPlanMinute");

  let newLessonPlans = [];
  if (count < 45) {
    newLessonPlans = lessonPlansCount?.filter((e) => {
      return (
        e?.id !== "expertId" &&
        e?.id !== "researcherId" &&
        e?.id !== "" &&
        e.text
      );
    });
  }
  useEffect(() => {
    if (lessonPlansCount?.length || lessPlans) {
      if (lessonPlanId) {
        setPercentage(((newLessonPlans?.length + 1 + lessPlans) * 100) / count);
      } else {
        setPercentage(((newLessonPlans?.length + lessPlans) * 100) / count);
      }
    } else {
      setPercentage(0);
    }
  }, [lessonPlansCount, lessPlans, newLessonPlans]);

  const radius = 35;
  // 50 - strokeWidth / 2;
  const pathDescription = `
    M 50,50 m 0,-${radius}
    a ${radius},${radius} 0 1 1 0,${2 * radius}
    a ${radius},${radius} 0 1 1 0,-${2 * radius}
  `;
  const progressStyleIf2 = {
    stroke: lessonPlanMinute >= 45 ? "#fc2626" : "#007dbc",
    strokeLinecap: "round",
    strokeDasharray: `${lessonPlanMinute * 4.8}, ${220}`,
  };

  const diameter = Math.PI * 2 * radius;
  const progressStyle = {
    stroke: "#007dbc",
    strokeLinecap: "round",
    strokeDasharray: `${diameter}px ${diameter}px`,
    strokeDashoffset: `${((100 - percentage) / 100) * diameter}px`,
  };

  return (
    <div>
      <MessagePopUp
        onClosePopup={setShowPopUp}
        title={t("Done")}
        open={showPopUp}
        closeBtnTitle={t("Close")}
        onAlertCancelClick={() => setShowPopUp("")}
        styleCancelBtn={{
          background: "linear-gradient(83.13deg, #6FD89C 0%, #46B776 100%)",
          color: "#FFF",
        }}
        text={showPopUp}
        styleText={{ textAlign: "center" }}
        popUpContainerStyles={{ top: "50%" }}
      />
      <div className="progress_bar_container">
        <svg viewBox="0 0 100 100" className="progress_bar">
          <path
            d={pathDescription}
            strokeWidth={strokeWidth}
            fillOpacity={0}
            style={{
              stroke: "#DEDFE7",
              strokeDashoffset: 0,
            }}
          />
          <path
            d={pathDescription}
            strokeWidth={strokeWidth}
            fillOpacity={0}
            style={truety ? progressStyleIf2 : progressStyle}
          />
        </svg>
        <p
          className="text-1-and-2"
          style={{ color: lessonPlanMinute >= 45 ? "#fc2626" : "#6ab1fe" }}
        >
          {text === 1 ? null : lessonPlanMinute ?? 0}
        </p>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CircularProgressBar);
