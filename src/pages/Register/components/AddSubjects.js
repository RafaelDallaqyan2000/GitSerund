import "./schoolRegisterStyles.css";
import { useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import { handleFormChange } from "../../../store";
import { DrowSubjectItem } from "./DrowSubjectItem";
import { useTranslation } from "react-i18next";

const AddSubjectsComponent = ({
  subjectsAndClasses,
  subjects,
  handleFormChange,
}) => {
  const [optionsExceptSelected, setOptionsExceptSelected] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    let exceptSelectedOption = subjectsAndClasses?.filter((sbj) => {
      let selectedSubject = subjects?.find((e) => e.id === sbj.id);

      return sbj?.id !== selectedSubject?.id;
    });

    setOptionsExceptSelected(exceptSelectedOption);
  }, [subjectsAndClasses, subjects]);

  const handleClickSubjectOption = useCallback(
    (subject) => {
      if (subjects.length > 2) return;

      const selected = subjects.some((sub) => sub.id === subject.id);

      if (selected) return;

      let newSelectedSubjects = [
        ...subjects,
        {
          id: subject.id,
          name: subject.name,
        },
      ];

      let filterSelectedSubj = newSelectedSubjects.filter((e) => {
        return e.id;
      });

      handleFormChange("subjects", filterSelectedSubj);
    },
    [subjects.length]
  );

  const handleClickAddNewSubject = () => {
    handleFormChange("subjects", [...subjects, { name: "", id: "" }]);
  };

  const hanldeDeleteClick = (subj) => {
    let filteredSubject = subjects?.filter((e, i) => {
      return e.id && e.id !== subj.id;
    });

    handleFormChange("subjects", filteredSubject);
  };

  return (
    <div>
      {subjects && subjects.length ? (
        subjects.map((el, i) => {
          return (
            <DrowSubjectItem
              key={el?.id + i}
              subj={el}
              label={`${t("Subject")} ${i !== 0 ? i + 1 : ""}`}
              value={subjects?.find((e) => e.id === el?.id)?.name}
              options={optionsExceptSelected}
              onOptionClick={handleClickSubjectOption}
              onClickDeleteSubject={hanldeDeleteClick}
            />
          );
        })
      ) : (
        <DrowSubjectItem
          value={
            subjectsAndClasses?.find((e) => subjects.find((i) => e.id === i.id))
              ?.name
          }
          label={t("Subject")}
          options={subjectsAndClasses}
          onOptionClick={handleClickSubjectOption}
        />
      )}

      {subjects.length && subjects.length < 2 ? (
        <p className="register_add_subject" onClick={handleClickAddNewSubject}>
          + {t("Add subject")}
        </p>
      ) : null}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    subjectsAndClasses: state.changePageReducer.subjectsAndClasses,
    subjects: state.formReducer.subjects ?? [],
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleFormChange: (key, value) => dispatch(handleFormChange(key, value)),
  };
};

export const AddSubjects = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddSubjectsComponent);
