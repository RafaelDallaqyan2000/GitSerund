import React, { useRef, useState } from "react";
import { connect } from "react-redux";
import { useOutsideClick } from "../../../../hooks/useOutsideClick";
import { cleanForm } from "../../../../store";
import { lessonProcessIdAndType } from "../../../../store/lessonProcess/actions";
import "./addDropdown.css";
import { useTranslation } from "react-i18next";

const AddDropdown = ({
  id = null,
  lessonProcessIdAndType,
  cleanForm,
  studentType = true,
  teacherType = true,
}) => {
  const { t } = useTranslation();
  const [show, setShow] = useState(false);
  const ref = useRef();

  const changeType = (type) => {
    lessonProcessIdAndType(id, type);
    setShow(false);
    cleanForm();
  };

  const handleSelect = () => {
    setShow(false);
  };

  useOutsideClick(ref, handleSelect);

  return (
    <div ref={ref}>
      <img
        alt="plus"
        onClick={() => {
          changeType("student");
          window.scrollTo(0, 0);
        }}
        style={{ cursor: "pointer" }}
        src={require("../../../../img/plusIcon.svg").default}
      />{" "}
      {show ? (
        <div className="list-action">
          <div className="ul">
            <div
              className={
                studentType
                  ? "process-select "
                  : "process-select disable-process-select"
              }
              onClick={() => changeType("student")}
            >
              <p className={studentType ? "" : "disable-process-select"}>
                {t("Student Activity")}
              </p>
            </div>
            <div
              onClick={() => changeType("teacher")}
              className={
                teacherType
                  ? "process-select "
                  : "process-select disable-process-select"
              }
            >
              <p className={teacherType ? "" : "disable-process-select"}>
                {t("Teacher Activity")}
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};
const mapStateToProps = (state) => {
  return {};
};
const mapDispatchToProps = (dispatch) => {
  return {
    cleanForm: () => dispatch(cleanForm()),
    lessonProcessIdAndType: (procId, procType) =>
      dispatch(lessonProcessIdAndType(procId, procType)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddDropdown);
