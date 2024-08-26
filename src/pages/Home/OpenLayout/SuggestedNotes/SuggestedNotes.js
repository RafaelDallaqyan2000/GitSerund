import * as React from "react";
import "./SuggestedNotes.css";
import "../Selects/Selects.css";
import { useQuery } from "../../../../hooks/useQuery";
import { useNavigate } from "react-router-dom";
import store, { handleFormChange } from "../../../../store";
import { connect } from "react-redux";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";

const SuggestedNotes = ({ onClose, handleFormChange }) => {
  const navigate = useNavigate();
  const query = useQuery();
  const { t } = useTranslation();

  const [value = "", setValue] = React.useState("");
  const handleSearch = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("search", value);
    urlParams.set("page", 1);
    const { subjectName = "", selectedClass = "" } =
      store.getState().formReducer;
    urlParams.set("subjectName", subjectName);
    urlParams.set("selectedClass", selectedClass);
    navigate("?" + urlParams);
    onClose();
  };

  React.useEffect(() => {
    if (query.has("subjectName")) {
      const queryValue = query.get("search");
      setValue(queryValue ? queryValue : "");
    }
  }, []);

  const handleCancel = useCallback((e) => {
    handleFormChange("selectedClass", null);
    handleFormChange("subjectName", undefined);
    setValue("");
    onClose();

    handleSearch(e);
  }, []);

  return (
    <form onSubmit={handleSearch} style={{ position: "relative" }}>
      <div className="open-layout-suggested-notes-container">
        <p className="open-layout-suggested-notes-title">{t("Keywords")}</p>
        {/* <div style={{ display: "flex", marginTop: "12px" }}> */}
        <input
          className="notes"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={t("E.g. Function")}
          maxLength="10000"
          id="filterSearch"
        />
        {/* </div> */}
      </div>
      <div style={{ position: "absolute", right: "0", bottom: "0" }}>
        <button onClick={handleCancel} className="cancel_btn">
          {t("Reset")}
        </button>
        <button type="submit" className="save_notes">
          {t("Confirm")}
        </button>
      </div>
    </form>
  );
};

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleFormChange: (key, value) => dispatch(handleFormChange(key, value)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SuggestedNotes);
