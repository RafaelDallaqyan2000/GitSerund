import { useEffect } from "react";
import { connect } from "react-redux";
import { ToggleRightSidebar } from "../ToggleRightSidebar/ToggleRightSidebar";
import { ChildItem } from "./ChildItem/ChildItem";
import { getSidebarInfoFirstPageOnSecondPage } from "../../store";
import style from "./ChangeLessonProcessRightSidebar.module.css";
import { useTranslation } from "react-i18next";

function LessonProcessRightSidebar({
  lessonProcId,
  getSidebarInfoFirstPageOnSecondPage,
  rightSidebarInfoFirstPage,
}) {
  const { t } = useTranslation();
  useEffect(() => {
    getSidebarInfoFirstPageOnSecondPage(lessonProcId);
  }, []);

  return (
    <ToggleRightSidebar>
      <div className={style.container}>
        <h3 className={style.title}>{t("Lesson Plan")}</h3>
        <div className={style.infoContainer}>
          {rightSidebarInfoFirstPage?.map((el) => (
            <ChildItem key={el.id} item={el} />
          ))}
        </div>
      </div>
    </ToggleRightSidebar>
  );
}

const mapStateToProps = (state) => {
  return {
    rightSidebarInfoFirstPage:
      state?.lessonProcessReducer.rightSidebarInfoFirstPage,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getSidebarInfoFirstPageOnSecondPage: (lsnProcId) =>
      dispatch(getSidebarInfoFirstPageOnSecondPage(lsnProcId)),
  };
};

export const ChangeLessonProcessRightSidebar = connect(
  mapStateToProps,
  mapDispatchToProps
)(LessonProcessRightSidebar);
