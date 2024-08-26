import React, { useEffect } from "react";
import {
  handleShortDescription,
  changeLessonDescription,
} from "../../../../store";
import { connect, useDispatch } from "react-redux";
import { CustomEditor } from "../../../../components/CutomEditor";
import "./LessonObjective.css";

function LessonObjectiveComponent({
  t,
  changeLessonDescription,
  onFocus,
  lessDescriptions,
  objectiveError,
  goalPart1,
  goalPart2,
  goalPart3,
  goalPart4,
  fieldId,
  onChangeError,
}) {
  const dispatch = useDispatch();
  const conditionForUnsetError =
    objectiveError &&
    goalPart1 !== undefined &&
    goalPart2 !== undefined &&
    goalPart3 !== undefined &&
    goalPart4 !== undefined;

  useEffect(() => {
    if (goalPart1 !== undefined) {
      dispatch(
        handleShortDescription({
          index: 3,
          id: "goalPart1",
          text: goalPart1,
        })
      );
      onChangeError((prevState) => {
        return {
          ...prevState,
          [fieldId]: conditionForUnsetError ? "" : objectiveError,
        };
      });
      return;
    }

    const filteredLessDescription = lessDescriptions.filter(
      (item) => item.id !== "goalPart1"
    );
    changeLessonDescription(filteredLessDescription);
  }, [goalPart1]);

  useEffect(() => {
    if (goalPart2 !== undefined) {
      dispatch(
        handleShortDescription({
          index: 4,
          id: "goalPart2",
          text: goalPart2,
        })
      );
      onChangeError((prevState) => {
        return {
          ...prevState,
          [fieldId]: conditionForUnsetError ? "" : objectiveError,
        };
      });
      return;
    }

    const filteredLessDescription = lessDescriptions.filter(
      (item) => item.id !== "goalPart2"
    );
    changeLessonDescription(filteredLessDescription);
  }, [goalPart2]);

  useEffect(() => {
    if (goalPart3 !== undefined) {
      dispatch(
        handleShortDescription({
          index: 5,
          id: "goalPart3",
          text: goalPart3,
        })
      );
      onChangeError((prevState) => {
        return {
          ...prevState,
          [fieldId]: conditionForUnsetError ? "" : objectiveError,
        };
      });
      return;
    }

    const filteredLessDescription = lessDescriptions.filter(
      (item) => item.id !== "goalPart3"
    );
    changeLessonDescription(filteredLessDescription);
  }, [goalPart3]);

  useEffect(() => {
    if (goalPart4 !== undefined) {
      dispatch(
        handleShortDescription({
          index: 6,
          id: "goalPart4",
          text: goalPart4,
        })
      );
      onChangeError((prevState) => {
        return {
          ...prevState,
          [fieldId]: conditionForUnsetError ? "" : objectiveError,
        };
      });
      return;
    }

    const filteredLessDescription = lessDescriptions.filter(
      (item) => item.id !== "goalPart4"
    );
    changeLessonDescription(filteredLessDescription);
  }, [goalPart4]);

  return (
    <>
      <div className="title_container">
        <p className="title">{t("Lesson extended picture")}</p>
        {!!objectiveError && <p className="required_text">{objectiveError}</p>}
      </div>

      <div className="they_already_know">
        <p className="sub_title">{t("Students already know")}</p>
        <CustomEditor
          id="goalPart1"
          onFocus={() => onFocus("completePictureOfClass")}
          currentAction="goalPart1"
        />
      </div>

      <div className="they_already_know">
        <p className="sub_title">
          {t("Students in this lesson will find out")}
        </p>
        <CustomEditor
          id="goalPart2"
          onFocus={() => onFocus("completePictureOfClass")}
          currentAction="goalPart2"
        />
      </div>

      <div className="they_already_know">
        <p className="sub_title">
          {t(
            "Students will use the knowledge of today's lesson in the next lessons"
          )}
        </p>
        <CustomEditor
          id="goalPart3"
          onFocus={() => onFocus("completePictureOfClass")}
          currentAction="goalPart3"
        />
      </div>

      <div className="they_already_know">
        <p className="sub_title">
          {t(
            "The topic of this lesson relates to real life in the following way"
          )}
        </p>
        <CustomEditor
          id="goalPart4"
          onFocus={() => onFocus("completePictureOfClass")}
          currentAction="goalPart4"
        />
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    lessDescriptions: state.lessonPlanReducer.lessDescriptions,
    goalPart1: state.formReducer.goalPart1,
    goalPart2: state.formReducer.goalPart2,
    goalPart3: state.formReducer.goalPart3,
    goalPart4: state.formReducer.goalPart4,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    changeLessonDescription: (array) =>
      dispatch(changeLessonDescription(array)),
  };
};
export const LessonObjective = connect(
  mapStateToProps,
  mapDispatchToProps
)(LessonObjectiveComponent);
