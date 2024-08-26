import React, { useEffect } from "react";
import { useQuery } from "../../../hooks/useQuery";
import { ReactComponent as FilterIcon } from "../../../img/filterWithoutBorder.svg";
import { useTranslation } from "react-i18next";

function SearchBar({
  setOpen,
  open,
  children,
  onChangeValue = () => {},
  value,
  callbackSearchBar = () => {},
}) {
  const query = useQuery();
  const { t } = useTranslation();

  const handleSearch = (e) => {
    e.preventDefault();

    callbackSearchBar(value);
    setOpen(false);
  };

  useEffect(() => {
    if (!query.has("subjectName")) {
      const queryValue = query.get("search");
      onChangeValue(queryValue ? queryValue : "");
    }
  }, []);

  return (
    <div className="top_bar">
      <form onSubmit={handleSearch} className="search-input-container">
        <input
          onChange={(e) => onChangeValue(e.target.value)}
          value={value}
          className="search_input"
          placeholder={t("Search")}
        />
        <span onClick={handleSearch} className="search-icon"></span>
      </form>

      <div style={{ display: "flex", alignItems: "center" }}>
        <figure
          className="open-layout-section"
          onClick={() => setOpen((prev) => !prev)}
        >
          <FilterIcon className="open-layout-section-icon" />
        </figure>
        {open ? (
          <img
            className="open-layout-arrow"
            src={require("../../../img/openLayout.svg").default}
          />
        ) : null}
        {children}
      </div>
    </div>
  );
}

export default SearchBar;
