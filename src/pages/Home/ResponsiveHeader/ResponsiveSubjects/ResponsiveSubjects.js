import "./ResponsiveSubjects.css";
import { SubjectItem } from "./SubjectItem/SubjectItem";
import { connect } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import request from "../../../../store/request";
import {
  fetchLessonPlanTableDetails,
  handleFormChange,
} from "../../../../store";
import { useNavigate } from "react-router-dom";
import { useQuery } from "../../../../hooks/useQuery";
import { useTranslation } from "react-i18next";

function ResponsiveSubjectsComponent({
  handleFormChange,
  allSubjectsForResponsiveDesign,
  fetchLessonPlanTableDetails,
  checkedResponsiveSubject,
  selectedSubjectId,
}) {
  const { i18n } = useTranslation();
  const [newSubjects, setNewSubjects] = useState(
    allSubjectsForResponsiveDesign
  );
  const [selectedSubject, setSelectedSubject] = useState({});

  useEffect(() => {
    const section = document.getElementById("responsive-table-contaiener");
    const yOffset = -250;
    const y =
      section.getBoundingClientRect().top + window.pageYOffset + yOffset;

    window.scrollTo({ behavior: "smooth", top: y });
  }, [selectedSubjectId]);

  useEffect(() => {
    let checkedSubject = allSubjectsForResponsiveDesign.find((e) => {
      return e?.id === checkedResponsiveSubject?.id;
    });
    setSelectedSubject(checkedSubject);
  }, [checkedResponsiveSubject?.id]);

  useEffect(() => {
    handleFormChange("showSubjectCount", 10);
  }, [selectedSubject?.id]);

  useEffect(() => {
    request(
      `/api/getSubjectsWithClasses?isMobile=true&language=${i18n?.language}`
    ).then((data) => {
      if (data.success) {
        let selectedSubject = data.subjects[0].isOther
          ? data.subjects.find((e) => !e.isOther)
          : data.subjects[0];

        //Todo: we need to use this
        // fetchLessonPlanTableDetails(
        //     selectedSubject.id,
        //     null,
        //     '',
        //     1,
        //     'date',
        //     false,
        //     10
        // );

        setTimeout(() => {
          handleFormChange("allSubjectsForResponsiveDesign", data.subjects);
          handleFormChange("selectedSubjectId", selectedSubject.id);
          handleFormChange("defaultSelectedSubjectId", selectedSubject.id);

          setNewSubjects(data.subjects);
          setSelectedSubject(data.subjects[0]);
        }, 1000);
      }
    });
  }, [i18n.language]);

  useEffect(() => {
    if (selectedSubject?.id) {
      let checkedSubject =
        allSubjectsForResponsiveDesign?.find(
          (e) => e.id === selectedSubject?.id
        ) ?? {};
      let uncheckedSubjects =
        allSubjectsForResponsiveDesign?.filter(
          (e) => e.id !== selectedSubject?.id
        ) ?? [];

      setNewSubjects([checkedSubject, ...uncheckedSubjects]);
      handleFormChange("newSortSubjects", [
        checkedSubject,
        ...uncheckedSubjects,
      ]);
    }
  }, [allSubjectsForResponsiveDesign.length, selectedSubject?.id]);

  const handleCheckSubject = useCallback(
    (subject) => {
      handleFormChange("checkedResponsiveSubject", subject);
      handleFormChange("selectedSubjectId", subject?.id);
      handleFormChange("defaultSelectedSubjectId", subject?.id);
      setSelectedSubject(subject);
    },
    [checkedResponsiveSubject.id]
  );

  return (
    <div className="subjectItemContainer">
      {newSubjects
        .filter((e) => !e.isOther)
        ?.map((subject) => {
          return (
            <SubjectItem
              key={subject.id}
              item={subject}
              onClick={handleCheckSubject}
            />
          );
        })}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    allSubjectsForResponsiveDesign:
      state.formReducer.allSubjectsForResponsiveDesign ?? [],
    checkedResponsiveSubject: state.formReducer.checkedResponsiveSubject ?? {},
    selectedSubjectId: state.formReducer.selectedSubjectId ?? null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleFormChange: (key, value) => dispatch(handleFormChange(key, value)),
    fetchLessonPlanTableDetails: (
      id,
      classs,
      searchString,
      page,
      orderColumn,
      pageCount
    ) =>
      dispatch(
        fetchLessonPlanTableDetails(
          id,
          classs,
          searchString,
          page,
          orderColumn,
          pageCount
        )
      ),
  };
};

export const ResponsiveSubjects = connect(
  mapStateToProps,
  mapDispatchToProps
)(ResponsiveSubjectsComponent);
