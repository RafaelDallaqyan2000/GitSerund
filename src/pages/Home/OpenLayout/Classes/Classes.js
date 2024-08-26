import * as React from "react";
import "./Classes.css";
import Class from "./Class/Class";
import { connect } from "react-redux";
import { handleFormChange } from "../../../../store";
import { useTranslation } from "react-i18next";

const Classes = ({ handleFormChange, selectedClass }) => {
  const { t } = useTranslation();

  const handleSelect = (id) => {
    let value = id === selectedClass ? null : id;
    handleFormChange("selectedClass", value);
  };

  return (
    <div className="open-layout-classes-container">
      <p className="class_label">{t("Grade")}</p>
      <div className="open-layout-classes">
        {Array(8)
          .fill(1)
          .map((el, i) => (
            <Class
              selected={selectedClass}
              onClick={() => handleSelect(i + 5)}
              number={i + 5}
              key={i}
            />
          ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    selectedClass: state.formReducer.selectedClass,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    handleFormChange: (key, value) => dispatch(handleFormChange(key, value)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Classes);
