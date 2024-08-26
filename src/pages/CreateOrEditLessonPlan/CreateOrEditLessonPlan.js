import "./CreateOrEditorLessonPlan.css";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  HeaderForLessonPlan,
  Helpers,
  SubjectAndClass,
  LessonObjective,
  SelectedMethods,
  Field,
} from "./components";
import { useParams } from "react-router";
import store, {
  changeLessonDescription,
  cleanForm,
  createNewLessonPlan,
  editLessonPlan,
  fetchLessonPlanDetailsForEdit,
  handleFormChange,
  showLessonPlanCreate,
} from "../../store";
import { connect } from "react-redux";
import { lessonPlanSidebarData } from "./data";
import Textarea from "../../components/Form/Textarea/Textarea";
import { CustomEditor, ErrorPopup, LessonPlanSidebar } from "../../components";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

function CreateOrEditLessonPlan({
  showCreate,
  lessDescriptions,
  changeLessonDescription,
  createNewLessonPlan,
  buttonDisable,
  handleFormChange,
  editLessonPlan,
  goalPart1,
  goalPart2,
  goalPart3,
  goalPart4,
  fetchLessonPlanDetailsForEdit,
  teacherId,
  cleanForm,
  formReducer,
  createOrEditLessPlanError,
}) {
  const navigate = useNavigate();
  const [navItemClicked, setNavItemClicked] = useState(false);
  const scroller = useRef();
  const { lessonPlanId } = useParams();
  const { t } = useTranslation();
  const lessonPlanSidebar = lessonPlanSidebarData(!lessonPlanId, t);
  const [errorFromBack, setErrorFromBack] = useState("");
  const [error, setError] = useState({
    helpers: "",
    subject: "",
    class: "",
    topic: "",
    materialsUsed: "",
    lessonObjective: "",
    completePictureOfClass: "",
    finalResults: "",
    selectedMethods: "",
    terms: "",
    homeWork: "",
    blackBoard: "",
    hasError: false,
  });

  useEffect(() => {
    setErrorFromBack(createOrEditLessPlanError);
  }, [createOrEditLessPlanError]);

  useEffect(() => {
    const errorList = Object.values(error);
    const errorValue = errorList.find(
      (errItem) => errItem !== "" && typeof errItem !== "boolean"
    );
    if (!errorValue && error.hasError) {
      setError({ ...error, hasError: false });
    }
  }, [error]);

  useEffect(() => {
    handleFormChange("lessonProcId", lessonPlanId);
    if (lessonPlanId) {
      fetchLessonPlanDetailsForEdit(lessonPlanId);
    }
  }, [lessonPlanId]);

  useEffect(() => {
    showCreate(true);
    return () => {
      cleanForm();
      changeLessonDescription([]);
    };
  }, []);

  const handleScroll = useCallback(
    (e) => {
      const targetElement = e.target;

      if (
        targetElement.scrollTop + targetElement.clientHeight >=
        targetElement.scrollHeight
      ) {
        const lastElementHash = `#${
          lessonPlanSidebar[lessonPlanSidebar.length - 1].hash
        }`;
        // window.location.hash= lastElementHash;
        navigate(lastElementHash);
        return;
      }

      if (!navItemClicked) {
        const sections = scroller.current.childNodes;
        const scrollPosition = targetElement.scrollTop;

        for (let section of sections) {
          if (scrollPosition <= section.offsetTop + section.offsetHeight - 50) {
            const sectionName = `#${section.id}`;

            // window.location.hash = sectionName;
            navigate(sectionName);
            break;
          }
        }
        return;
      }
      setNavItemClicked(false);
    },
    [lessonPlanSidebar, navItemClicked, scroller]
  );

  const onSectionFocus = (id) => {
    navigate(`#${id}`, { replace: true, preventScrollReset: true });
  };

  const callback = (id) => {
    handleFormChange("lessonPlanId", id);

    if (lessonPlanId) {
      return navigate(`/lesson-process/change-lesson-process/${id}`);
    }
    return navigate(`/lesson-process/change-lesson-process/${id}/new`);
  };

  const errorDetails = useMemo(() => {
    const {
      subjectName,
      className,
      topicText,
      materialsUsedText,
      finalResultsText,
      selectedMethod1Name,
      lessonObjectiveText,
      termsText,
      homeWorkText,
      blackBoardText,
    } = formReducer;

    const newError = {
      hasError: false,
      helpers: !teacherId ? t("* Mandatory field") : "",
      subject: !subjectName ? t("* Mandatory field") : "",
      class: !className ? t("* Mandatory field") : "",
      topic: !topicText ? t("* Mandatory field") : "",
      materialsUsed: !materialsUsedText ? t("* Mandatory field") : "",
      finalResults: !finalResultsText ? t("* Mandatory field") : "",
      selectedMethods:
        !selectedMethod1Name && !lessonPlanId ? t("* Mandatory field") : "",
      terms: !termsText ? t("* Mandatory field") : "",
      homeWork: !homeWorkText ? t("* Mandatory field") : "",
      blackBoard: !blackBoardText ? t("* Mandatory field") : "",
      lessonObjective: !lessonObjectiveText ? t("* Mandatory field") : "",
      completePictureOfClass:
        !goalPart1 || !goalPart2 || !goalPart3 || !goalPart4
          ? t("* Mandatory field")
          : "",
    };
    return {
      newError,
      hasError: Object.values(newError).find((err) => !!err),
    };
  }, [formReducer]);

  const handleCreateOrUpdateLessPlan = () => {
    if (errorDetails.hasError) {
      return setError({
        ...errorDetails.newError,
        hasError: true,
      });
    }

    if (lessonPlanId) {
      handleFormChange("lessonProcId", lessonPlanId);
      return editLessonPlan(callback);
    }

    return createNewLessonPlan(callback);
  };

  const filledStyle = useCallback(
    (field) => {
      let isFilled;
      const style = {
        background: "rgb(151, 180, 203)",
        color: "white",
      };
      if (field === "completePictureOfClass") {
        isFilled =
          goalPart1 &&
          goalPart1 !== undefined &&
          goalPart2 &&
          goalPart2 !== undefined &&
          goalPart3 &&
          goalPart3 !== undefined &&
          goalPart4 &&
          goalPart4 !== undefined;
      } else if (field === "topic") {
        isFilled = !!store.getState().formReducer[field + "Text"];
      } else if (field === "teacherId" || field === "subjectAndClassId") {
        isFilled = !!store.getState().formReducer[field];
      } else {
        isFilled = lessDescriptions.some((i) => i.id === field && i.text);
      }

      return isFilled ? style : {};
    },
    [lessDescriptions, goalPart1, goalPart2, goalPart3, goalPart4]
  );

  const handleClickNavItem = useCallback((e, currentHash) => {
    e.preventDefault();
    e.stopPropagation();

    const section = document.getElementById(currentHash);
    navigate(`#${currentHash}`);
    section.scrollIntoView();
    setNavItemClicked(true);
  }, []);

  const handleScrollDropDown = useCallback((event, callbackFunction, arr) => {
    if (
      event.childElementCount % 10 === 0 &&
      event.childElementCount < arr[0]?.count
    ) {
      let childes = event.childNodes;
      let scrollTop = event.scrollTop;

      if (scrollTop >= childes[childes.length - 1].offsetTop - 200) {
        callbackFunction("", Math.ceil(childes.length / 10 + 1));
      }
    }
  }, []);

  return (
    <div>
      {errorFromBack ? (
        <ErrorPopup
          message={errorFromBack}
          onClose={() => handleFormChange("createOrEditLessPlanError", "")}
        />
      ) : null}
      <HeaderForLessonPlan />
      <LessonPlanSidebar
        lessonPlanSidebarData={lessonPlanSidebar}
        onClickNavItem={handleClickNavItem}
        filledStyle={filledStyle}
      />
      <div className="components" onScroll={handleScroll} ref={scroller}>
        {error.hasError && (
          <section className="lesson-plan-section error_message_on_top_page">
            <p className="required_text">
              *{t(" Please fill in all required fields")}
            </p>
          </section>
        )}
        <section id="teacherId" className="lesson-plan-section">
          <Helpers
            errorText={error.helpers}
            onScroll={handleScrollDropDown}
            fieldId="helpers"
            onChangeError={setError}
            t={t}
          />
        </section>
        <section id="subjectAndClassId" className="lesson-plan-section">
          <SubjectAndClass
            subjectError={error.subject}
            classError={error.class}
            subjectId="subject"
            classId="class"
            onChangeError={setError}
          />
        </section>
        <section id="topic" className="lesson-plan-section">
          <Field
            title={t("Topic")}
            fieldId="topic"
            index={0}
            error={error.topic}
            id={`topicText`}
            onFocus={() => onSectionFocus("topic")}
            className="proc_header"
            placeholder={t("Topic Title")}
            render={Textarea}
            onChangeError={setError}
          />
        </section>
        <section id="materialsUsed" className="lesson-plan-section">
          <Field
            title={t("Used materials")}
            fieldId="materialsUsed"
            index={1}
            error={error.materialsUsed}
            id={`materialsUsedText`}
            onFocus={() => onSectionFocus("materialsUsed")}
            currentAction={"materialsUsed"}
            render={CustomEditor}
            onChangeError={setError}
          />
        </section>

        <section id="lessonObjective" className="lesson-plan-section">
          <Field
            title={t("Lesson objectives")}
            fieldId="lessonObjective"
            index={2}
            error={error.lessonObjective}
            id={`lessonObjectiveText`}
            onFocus={() => onSectionFocus("lessonObjective")}
            currentAction={"purpose"}
            render={CustomEditor}
            onChangeError={setError}
          />
        </section>

        <section id="completePictureOfClass" className="lesson-plan-section">
          <LessonObjective
            onFocus={onSectionFocus}
            objectiveError={error.lessonObjective}
            fieldId="completePictureOfClass"
            onChangeError={setError}
            t={t}
          />
        </section>
        <section id="finalResults" className="lesson-plan-section">
          <Field
            title={t("Learning outcomes")}
            fieldId="finalResults"
            error={error.finalResults}
            index={7}
            id={`finalResultsText`}
            onFocus={() => onSectionFocus("finalResults")}
            currentAction={"finalResults"}
            render={CustomEditor}
            onChangeError={setError}
          />
        </section>
        {!lessonPlanId ? (
          <section id="selectedMethods" className="lesson-plan-section">
            <SelectedMethods
              onFocus={onSectionFocus}
              methodError={error.selectedMethods}
              onChangeError={setError}
              fieldId="selectedMethods"
              t={t}
            />
          </section>
        ) : null}
        <section id="terms" className="lesson-plan-section">
          <Field
            title={t("Terminology")}
            fieldId="terms"
            error={error.terms}
            index={9}
            id={`termsText`}
            onFocus={() => onSectionFocus("terms")}
            currentAction="terms"
            render={CustomEditor}
            onChangeError={setError}
          />
        </section>
        <section id="homeWork" className="lesson-plan-section">
          <Field
            title={t("Homework")}
            fieldId="homeWork"
            error={error.homeWork}
            index={11}
            id={`homeWorkText`}
            onFocus={() => onSectionFocus("homeWork")}
            currentAction={"homeWork"}
            render={CustomEditor}
            onChangeError={setError}
          />
        </section>
        <section id="blackBoard" className="lesson-plan-section">
          <Field
            title={t("Whiteboard")}
            fieldId="blackBoard"
            error={error?.blackBoard}
            index={12}
            id={`blackBoardText`}
            onFocus={() => onSectionFocus("blackBoard")}
            currentAction={"blackBoard"}
            render={CustomEditor}
            onChangeError={setError}
          />
        </section>
        <div className="lesson-plan-footer">
          <div className={!buttonDisable ? "save-lsn-plan" : ""}>
            {/*<Link to={`/lesson-process/change-lesson-process/${id}/new`}>*/}
            {/*  {lessonPlanId ? "Պահպանել" : "Ավարտել"}*/}
            {/*</Link>*/}
            <button
              className="btn-done-lsn-plan"
              onClick={handleCreateOrUpdateLessPlan}
            >
              {lessonPlanId ? t("Save") : t("Complete")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    lessDescriptions: state.lessonPlanReducer.lessDescriptions,
    buttonDisable: state.lessonPlanReducer.buttonDisable,
    goalPart1: state.formReducer.goalPart1,
    goalPart2: state.formReducer.goalPart2,
    goalPart3: state.formReducer.goalPart3,
    goalPart4: state.formReducer.goalPart4,
    teacherId: state.formReducer.teacherId,
    createOrEditLessPlanError: state.formReducer.createOrEditLessPlanError,
    formReducer: state.formReducer,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    cleanForm: () => dispatch(cleanForm()),
    changeLessonDescription: (arr) => dispatch(changeLessonDescription(arr)),
    showCreate: (show) => dispatch(showLessonPlanCreate(show)),
    createNewLessonPlan: (callback) => dispatch(createNewLessonPlan(callback)),
    handleFormChange: (key, value) => dispatch(handleFormChange(key, value)),
    fetchLessonPlanDetailsForEdit: (id) =>
      dispatch(fetchLessonPlanDetailsForEdit(id)),
    editLessonPlan: (callback) => dispatch(editLessonPlan(callback)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateOrEditLessonPlan);
