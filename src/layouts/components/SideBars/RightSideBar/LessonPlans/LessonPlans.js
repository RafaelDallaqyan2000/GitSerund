import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import "./LessonPlans.css";
import { fetchLessonPlans, handleFormChange } from "../../../../../store";
import { useNavigate } from "react-router-dom";
import { getParsedDate } from "../../../../../helpers/getParsedDate";
import momentWL from "moment-with-locales-es6";
import { useTranslation } from "react-i18next";

const LessonPlans = ({ fetchLessonPlans, lessonPlans, handleFormChange }) => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  useEffect(() => {
    fetchLessonPlans();
  }, [i18n.language]);

  const [allLessonPlans, setAllLessonPlans] = useState([]);

  useEffect(() => {
    const monthNames = [
      "Հնվ",
      "Փտր",
      "Մարտ",
      "Ապր",
      "Մայ",
      "Հուն",
      "Հուլ",
      "Օգս",
      "Սեպ",
      "Հոկ",
      "Նոյ",
      "Դեկ",
    ];

    setAllLessonPlans(lessonPlans);

    if (lessonPlans) {
      for (let i = 0; i < lessonPlans.length; i++) {
        const d = new Date(lessonPlans[i].insertedDate);
        lessonPlans[i].insertedDate = `${
          monthNames[d.getMonth()]
        } ${d.getDate()}`;

        // setLessonPlans(lessonPlans);
      }
      setAllLessonPlans(lessonPlans);
    }
  }, [lessonPlans]);

  const seeProfilePage = () => {
    navigate("/Profile/");
  };
  const showLessonProc = (id) => {
    window.open(`/show/lessonPlan/${id}`, "_blank");
  };

  return (
    <>
      <div className="right-sidebar-lesson-plans-container">
        <div>
          <p className="right-sidebar-lesson-plans-title">
            {t("Lesson plans")}
          </p>
        </div>
        <div onClick={seeProfilePage}>
          <p className="right-sidebar-lesson-plans-title gradient">
            {t("All")}
          </p>
        </div>
      </div>
      <div className="right-sidebar-lesson-plan-item-wrapper">
        {allLessonPlans?.details ? (
          allLessonPlans?.details?.map((plan, i) => {
            return (
              <div
                onClick={() => showLessonProc(plan.id)}
                className="right-sidebar-lesson-plan-item-container"
                key={plan.id}
              >
                <div className="right-sidebar-lesson-plan-item">
                  <p className="right-sidebar-lesson-plan-item-theme">
                    {plan.topic}
                  </p>
                  <p className="right-sidebar-lesson-plan-item-class gradient">
                    {plan.class}
                  </p>
                </div>

                <p className="right-sidebar-lesson-plan-item-date">
                  {momentWL(plan.insertedDate).format("MMM Do")}
                </p>
              </div>
            );
          })
        ) : (
          <p>{t("No data")}</p>
        )}
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    lessonPlans: state.lessonPlanReducer.lessonPlans,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleFormChange: (key, value) => dispatch(handleFormChange(key, value)),
    fetchLessonPlans: () => dispatch(fetchLessonPlans()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LessonPlans);
