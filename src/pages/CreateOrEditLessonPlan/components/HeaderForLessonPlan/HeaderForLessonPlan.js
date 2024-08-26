import React, {useEffect, useState} from "react";
import "./HeaderForLessonPlan.css";
import logo from "../../../../img/logo.png";
import {getSubjects, getClassesBySubjectId} from "../../../../store";
import {connect} from "react-redux";
import CircularProgressBar from "../../../../components/CircularProgressBar/CircularProgressBar";
import {Link} from "react-router-dom";
import {useParams} from "react-router";
import { useTranslation } from "react-i18next";

function HeaderForLessonPlanComponent({
  getSubjects,
  getClassesBySubjectId,
  subjectForLsnPlan,
  lessDescriptions,
  subjectAndClassId,
  teacherId,
  // semesterRequired,
}) {
  const { t } = useTranslation()
  const [lessonPlansCount, setLessonPlansCount] = useState([]);
  const [lessPlans, setLessPlans] = useState([]);
  const [subArrCount, setSubArrCount] = useState(0);
  const { lessonPlanId } = useParams();

  useEffect(() => {
      setLessonPlansCount(lessDescriptions);
  }, [lessDescriptions]);

  useEffect(() => {
    if(teacherId) getSubjects(teacherId);
  }, [teacherId]);

  useEffect(() => {
    if (subjectForLsnPlan !== 0 && subjectForLsnPlan !== undefined) {
      getClassesBySubjectId(subjectForLsnPlan);

      const checkExisting = lessPlans.some((item) => item.name === "Առարկա");
      const newArr = lessPlans;

      if (!checkExisting) {
        newArr.push({ name: "Առարկա" });
        setLessPlans([...newArr]);
      }
    }
  }, [subjectForLsnPlan]);

    useEffect(() => {
        if (subjectAndClassId) {
            const checkExisting = lessPlans.some((item) => item.name === "Դասարան");
            const newArr = lessPlans;
            if (!checkExisting) {
                newArr.push({name: "Դասարան"});
                setLessPlans([...newArr]);
            }
        }
    }, [subjectAndClassId]);

    useEffect(() => {
        setSubArrCount(lessPlans.length);
    }, [lessPlans.length]);

    return (
        <>
            <header className="lsn_plan_header">
                <div className="d-flex">
                    <div className="header_logo">
                        <Link to="/home">
                            <img className="header_logo_icon" src={logo} alt="GitSerund logo"/>
                        </Link>
                    </div>
                    <p className="less_plan">
                        {lessonPlanId ? t("Modify the lesson plan") : t("Create new lesson plan")}{" "}
                    </p>
                </div>
                <div className="lesson_plan_regulations_container">
                    <div>
                        <CircularProgressBar
                            text={1}
                            lessonPlansCount={lessonPlansCount}
                            lessPlans={subArrCount}
                        />
                    </div>
                    <p className="lesson_plan_regulations_text">{t("Lesson plan")}</p>

                </div>
            </header>
        </>
    );
}

const mapStateToProps = (state) => {
  return {
    subjectForLsnPlan: state.formReducer.subjectForLsnPlan,
    lessDescriptions: state.lessonPlanReducer.lessDescriptions,
    subjectAndClassId: state.formReducer?.subjectAndClassId,
    teacherId : state.formReducer?.teacherId
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getSubjects: (id) => dispatch(getSubjects(id)),
    getClassesBySubjectId: (id) => dispatch(getClassesBySubjectId(id)),
  };
};
export const HeaderForLessonPlan =  connect(
    mapStateToProps,
    mapDispatchToProps
)(HeaderForLessonPlanComponent);
