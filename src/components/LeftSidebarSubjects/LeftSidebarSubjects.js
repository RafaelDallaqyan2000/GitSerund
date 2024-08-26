import "./LeftSidebarSubjects.css";
import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import request from "../../store/request";
import { LeftSidebarSubjectItem } from "./components/LeftSidebarSubjectItem";
import { parseURLSearch } from "../../helpers";
import { handleFormChange } from "../../store";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";

function LeftSidebarSubjectsComponent({
  handleFormChange,
  subjectsWithClasses,
}) {
  const [subjects, setSubjects] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const { i18n } = useTranslation();

  useEffect(() => {
    request(`/api/getSubjectsWithClasses?language=${i18n.language}`).then(
      (data) => {
        if (data.success) {
          setSubjects(data.subjects.filter((e) => !e.isOther));
        }
      }
    );
  }, [i18n.language]);

  const subjectId = useMemo(() => {
    const parsedURL = parseURLSearch(location.search);

    return +parsedURL.subjectName;
  }, [location, navigate]);

  const handleSelect = (id) => {
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("search", "");
    urlParams.set("page", 1);
    urlParams.set("subjectName", id);
    navigate("/home?" + urlParams);
  };

  return (
    <div className="left_sidebar_subject_container">
      {!!subjects &&
        !!subjects.length &&
        subjects.map((subject) => (
          <LeftSidebarSubjectItem
            key={subject.name}
            subject={subject}
            onClick={handleSelect}
            isActive={subjectId === subject.id}
          />
        ))}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    subjectsWithClasses: state.formReducer.subjectsWithClasses ?? [],
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleFormChange: (key, value) => dispatch(handleFormChange(key, value)),
  };
};

export const LeftSidebarSubjects = connect(
  mapStateToProps,
  mapDispatchToProps
)(LeftSidebarSubjectsComponent);
