import "./schoolRegisterStyles.css";
import { SelectWithSearchHOC } from "../../../components";
import multiselectCross from "../../../img/x-icon.svg";
import { useMemo } from "react";
import { connect } from "react-redux";
import { handleFormChange } from "../../../store";
import { useTranslation } from "react-i18next";

const DrowSubjectItemComponent = ({
  value,
  onOptionClick = () => {},
  onClickDeleteSubject = () => {},
  subj = {},
  options = [],
  subjects,
  label,
  handleFormChange = () => {},
}) => {
  const disabled = useMemo(() => !!value, [value]);
  const { t } = useTranslation();

  const handleClickClearInput = () => {
    for (let i = 0; i < subjects?.length; i++) {
      if (subj?.id == subjects[i]?.id) {
        subjects?.splice(i, 1);
      }
    }

    handleFormChange("subjects", subjects);

    onClickDeleteSubject(subj);
  };

  return (
    <div className="subjects_container">
      <SelectWithSearchHOC
        placeholder={t("Select")}
        label={label}
        optionLabelKey="name"
        inputValue={value}
        onOptionClick={onOptionClick}
        options={options}
        disabled={disabled}
        inputStyle={{ width: "100%" }}
        loading={false}
        readOnly={true}
      />
      {value ? (
        <img
          src={multiselectCross}
          alt={t("Clear the field")}
          title={t("Clear the field")}
          onClick={handleClickClearInput}
        />
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

export const DrowSubjectItem = connect(
  mapStateToProps,
  mapDispatchToProps
)(DrowSubjectItemComponent);
