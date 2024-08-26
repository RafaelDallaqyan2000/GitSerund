import * as React from "react";
import "./OpenLayout.css";
import { useState, useEffect } from "react";
import Classes from "./Classes/Classes";
import SuggestedNotes from "./SuggestedNotes/SuggestedNotes";
import Select from "../../../components/Form/Select/Select";
import request from "../../../store/request";
import { useTranslation } from "react-i18next";

const OpenLayout = ({ onClose }) => {
  const [subject, setSubject] = useState([]);
  const { t, i18n } = useTranslation();
  useEffect(() => {
    request(`/api/subjects?language=${i18n.language}`).then((data) => {
      if (data.success) {
        setSubject(data.result);
      }
    });
  }, []);

  return (
    <div className="open_layout">
      <div className="open-layout-subject-container">
        <Select
          id="subjectName"
          items={subject}
          label={t("Subject")}
          placeholder={t("Subject name")}
          className="class-width"
        />
      </div>

      <Classes />
      <SuggestedNotes onClose={onClose} />
    </div>
  );
};

export default OpenLayout;
